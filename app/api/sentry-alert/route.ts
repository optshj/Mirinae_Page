import { NextResponse } from 'next/server'

const LEVEL_COLOR: Record<string, number> = { fatal: 0x7f1d1d, error: 0xef4444, warning: 0xf59e0b, info: 0x3b82f6 }

export async function POST(request: Request) {
    const WEBHOOK_URL = process.env.SENTRY_DISCORD_WEBHOOK_URL
    if (!WEBHOOK_URL) return NextResponse.json({ error: 'not configured' }, { status: 500 })

    const p = await request.json()
    const e = p.data?.event ?? {}
    const level: string = e.level ?? 'error'
    const tags: Record<string, string> = Object.fromEntries(e.tags ?? [])
    const field = (name: string, value?: string) => (value ? [{ name, value, inline: true }] : [])

    const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            embeds: [
                {
                    title: String(e.title || 'Sentry Alert').slice(0, 256),
                    url: e.web_url,
                    description: e.culprit ? `\`${String(e.culprit).slice(0, 1000)}\`` : undefined,
                    color: LEVEL_COLOR[level] ?? LEVEL_COLOR.error,
                    fields: [
                        ...field('프로세스', tags['event.process']),
                        ...field('OS', tags.os),
                        ...field('환경', e.environment),
                        ...field('Shell', e.release?.split('@').pop()),
                        ...field('Renderer', tags.renderer_version)
                    ],
                    footer: p.data?.triggered_rule ? { text: p.data.triggered_rule } : undefined,
                    timestamp: e.datetime
                }
            ]
        })
    })

    if (!res.ok) {
        console.error('Discord API Error:', res.status, await res.text())
        return NextResponse.json({ error: 'Discord 전송 실패' }, { status: 502 })
    }
    return NextResponse.json({ success: true })
}
