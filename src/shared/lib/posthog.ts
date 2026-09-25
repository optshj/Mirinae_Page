import posthog from 'posthog-js'

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY

if (typeof window !== 'undefined' && POSTHOG_KEY) {
    // 모바일에서 복사한 링크(?hid=)로 PC 접속 시 같은 사람으로 이어 퍼널이 기기를 넘어가게 함
    const handoffId = new URLSearchParams(window.location.search).get('hid')
    posthog.init(POSTHOG_KEY, {
        api_host: 'https://us.i.posthog.com',
        defaults: '2025-11-30',
        ...(handoffId && { bootstrap: { distinctID: handoffId } })
    })
    // Electron 앱과 프로젝트를 공유하므로 surface로 구분
    posthog.register({ surface: 'landing' })
}

export { posthog }
