import posthog from 'posthog-js'

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY

if (typeof window !== 'undefined' && POSTHOG_KEY) {
    const url = new URL(window.location.href)
    const hid = url.searchParams.get('hid')
    const handoffId = hid && hid !== 'undefined' ? hid : null
    if (hid) {
        url.searchParams.delete('hid')
        window.history.replaceState(window.history.state, '', url)
    }
    posthog.init(POSTHOG_KEY, {
        api_host: 'https://us.i.posthog.com',
        defaults: '2025-11-30',
        ...(handoffId && { bootstrap: { distinctID: handoffId } })
    })
    // Electron 앱과 프로젝트를 공유하므로 surface로 구분
    posthog.register({ surface: 'landing' })
}

export { posthog }
