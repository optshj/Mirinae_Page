import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL
    if (!WEBHOOK_URL) {
        console.error('Discord Webhook URL is not configured on the server.')
        return NextResponse.json({ error: '서버 설정 오류: 웹훅 URL이 없습니다.' }, { status: 500 })
    }

    try {
        const formData = await request.formData()

        const discordResponse = await fetch(WEBHOOK_URL, {
            method: 'POST',
            body: formData
        })

        if (!discordResponse.ok) {
            const errorText = await discordResponse.text()
            console.error('Discord API Error:', discordResponse.status, errorText)
            return NextResponse.json({ error: 'Discord 전송 실패' }, { status: discordResponse.status })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('API Route Error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
