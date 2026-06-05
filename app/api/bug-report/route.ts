import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Client } from '@notionhq/client'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const notion = new Client({ auth: process.env.NOTION_API_KEY })

async function analyzeWithGemini(
    description: string,
    images: { data: string; mimeType: string }[]
): Promise<{ title: string; summary: string; analysis: string; solution: string }> {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const imageParts = images
        .filter((img) => ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(img.mimeType))
        .map((img) => ({ inlineData: { mimeType: img.mimeType, data: img.data } }))

    const prompt = `다음은 사용자가 제출한 버그 리포트입니다.${imageParts.length > 0 ? ' 첨부된 스크린샷도 함께 참고해주세요.' : ''} 아래 JSON 형식으로만 응답해주세요.

버그 리포트:
${description}

응답 형식 (JSON만, 다른 텍스트 없이):
{
  "title": "버그를 간결하게 요약한 제목 (20자 이내)",
  "summary": "버그 내용을 한 문장으로 요약",
  "analysis": "버그의 원인과 영향 분석 (2-3문장)",
  "solution": "해결 방법 및 권장 조치 (2-3문장)"
}`

    const result = await model.generateContent([...imageParts, prompt])
    const text = result.response.text()

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON found in Gemini response')

    return JSON.parse(jsonMatch[0])
}

async function saveToNotion(params: { title: string; summary: string; originalContent: string; analysis: string; solution: string; submittedAt: string }) {
    const databaseId = process.env.NOTION_DATABASE_ID
    if (!databaseId) throw new Error('NOTION_DATABASE_ID is not configured')

    await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
            제목: { title: [{ text: { content: params.title } }] },
            제보시간: { date: { start: params.submittedAt } },
            요약: { rich_text: [{ text: { content: params.summary } }] }
        },
        children: [
            {
                object: 'block',
                type: 'heading_2',
                heading_2: { rich_text: [{ text: { content: '📋 원본 내용' } }] }
            },
            {
                object: 'block',
                type: 'paragraph',
                paragraph: { rich_text: [{ text: { content: params.originalContent } }] }
            },
            { object: 'block', type: 'divider', divider: {} },
            {
                object: 'block',
                type: 'heading_2',
                heading_2: { rich_text: [{ text: { content: '🔍 AI 분석' } }] }
            },
            {
                object: 'block',
                type: 'paragraph',
                paragraph: { rich_text: [{ text: { content: params.analysis } }] }
            },
            { object: 'block', type: 'divider', divider: {} },
            {
                object: 'block',
                type: 'heading_2',
                heading_2: { rich_text: [{ text: { content: '💡 AI 솔루션' } }] }
            },
            {
                object: 'block',
                type: 'paragraph',
                paragraph: { rich_text: [{ text: { content: params.solution } }] }
            }
        ]
    })
}

export async function POST(request: Request) {
    const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL
    if (!WEBHOOK_URL) {
        console.error('Discord Webhook URL is not configured on the server.')
        return NextResponse.json({ error: '서버 설정 오류: 웹훅 URL이 없습니다.' }, { status: 500 })
    }

    try {
        const formData = await request.formData()

        // Discord 전송 (기존 동작 유지)
        const discordResponse = await fetch(WEBHOOK_URL, {
            method: 'POST',
            body: formData
        })

        if (!discordResponse.ok) {
            const errorText = await discordResponse.text()
            console.error('Discord API Error:', discordResponse.status, errorText)
            return NextResponse.json({ error: 'Discord 전송 실패' }, { status: discordResponse.status })
        }

        // 버그 내용 추출
        const payloadJson = formData.get('payload_json')
        if (!payloadJson || typeof payloadJson !== 'string') {
            return NextResponse.json({ success: true })
        }

        const payload = JSON.parse(payloadJson)
        const rawContent: string = payload.content ?? ''
        const descriptionMatch = rawContent.match(/\*\*내용:\*\*\n([\s\S]*)$/)
        const description = descriptionMatch ? descriptionMatch[1].trim() : rawContent

        // 이미지 파일 추출 → base64 변환
        const imageEntries = Array.from(formData.entries()).filter(([key]) => key.startsWith('file'))
        const images = await Promise.all(
            imageEntries.map(async ([, file]) => {
                if (!(file instanceof File)) return null
                const buffer = await file.arrayBuffer()
                return { data: Buffer.from(buffer).toString('base64'), mimeType: file.type }
            })
        ).then((results) => results.filter((img): img is { data: string; mimeType: string } => img !== null))

        // AI 분석 + Notion 저장 (백그라운드,   용자 응답을 블로킹하지 않음)
        analyzeWithGemini(description, images)
            .then((result) =>
                saveToNotion({
                    title: result.title,
                    summary: result.summary,
                    originalContent: description,
                    analysis: result.analysis,
                    solution: result.solution,
                    submittedAt: new Date().toISOString()
                })
            )
            .catch((err) => console.error('AI 분석 또는 Notion 저장 실패:', err))

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('API Route Error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
