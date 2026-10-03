import posthog from 'posthog-js'

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY

if (typeof window !== 'undefined' && POSTHOG_KEY) {
    // 모바일에서 복사한 링크(?hid=)로 PC 접속 시 같은 사람으로 이어 퍼널이 기기를 넘어가게 함
    const url = new URL(window.location.href)
    const hid = url.searchParams.get('hid')
    // 이미 퍼진 ?hid=undefined 링크로 들어온 사람들이 'undefined'라는 한 사람으로 합쳐지지 않게 거름
    const handoffId = hid && hid !== 'undefined' ? hid : null
    // 북마크·공유된 링크로 다른 사람이 같은 id에 합쳐지지 않도록 URL에서 제거 (init 전에 지워 첫 pageview에도 안 남게)
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
