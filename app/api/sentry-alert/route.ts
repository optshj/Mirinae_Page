import { NextResponse } from 'next/server'

const LEVEL_COLOR: Record<string, number> = { fatal: 0x7f1d1d, error: 0xef4444, warning: 0xf59e0b, info: 0x3b82f6 }

// Sentry 레거시 WebHooks 플러그인 → Discord 웹훅 중계.
// ponytail: 인증 없음 — 누구나 호출 가능. 스팸 오면 ?token= 검증 추가.
export async function POST(request: Request) {
    const WEBHOOK_URL = process.env.SENTRY_DISCORD_WEBHOOK_URL
    if (!WEBHOOK_URL) return NextResponse.json({ error: 'not configured' }, { status: 500 })

    const p = await request.json()
    const level: string = p.level ?? 'error'
    const release: string | undefined = p.event?.release

    const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            embeds: [
                {
                    title: String(p.message || p.event?.title || 'Sentry Alert').slice(0, 256),
                    url: p.url,
                    description: p.culprit ? `\`${String(p.culprit).slice(0, 1000)}\`` : undefined,
                    color: LEVEL_COLOR[level] ?? LEVEL_COLOR.error,
                    fields: [
                        { name: 'Level', value: level, inline: true },
                        { name: 'Project', value: p.project_name ?? p.project ?? '-', inline: true },
                        ...(release ? [{ name: 'Release', value: release, inline: true }] : [])
                    ],
                    footer: p.triggering_rules?.length ? { text: p.triggering_rules.join(', ') } : undefined
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
