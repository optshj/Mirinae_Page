import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL
    if (!WEBHOOK_URL) {
        console.error('Discord Webhook URL is not configured on the server.')
        return NextResponse.json({ error: '서버 설정 오류: 웹훅 URL이 없습니다.' }, { status: 500 })
    }

    try {
        const formData = await request.formData()

        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            body: formData
        })

        if (response.ok) {
            return NextResponse.json({ success: true })
        } else {
            const errorText = await response.text()
            console.error('Discord API Error:', response.status, errorText)
            return NextResponse.json({ error: 'Discord 전송 실패' }, { status: response.status })
        }
    } catch (error) {
        console.error('API Route Error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
