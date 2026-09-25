import posthog from 'posthog-js'

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY

if (typeof window !== 'undefined' && POSTHOG_KEY) {
    posthog.init(POSTHOG_KEY, {
        api_host: 'https://us.i.posthog.com',
        defaults: '2025-11-30'
    })
    // Electron 앱과 프로젝트를 공유하므로 surface로 구분
    posthog.register({ surface: 'landing' })
}

export { posthog }
