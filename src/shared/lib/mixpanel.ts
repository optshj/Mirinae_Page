import mixpanel from 'mixpanel-browser'

const isProd = process.env.NODE_ENV === 'production'
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN

if (typeof window !== 'undefined') {
    if (MIXPANEL_TOKEN) {
        mixpanel.init(MIXPANEL_TOKEN, {
            debug: !isProd,
            track_pageview: false,
            persistence: 'localStorage',
            record_sessions_percent: 100,
            record_mask_text_selector: ''
        })
    } else if (!isProd) {
        console.warn('Mixpanel token is missing. Please check your .env file and ensure NEXT_PUBLIC_MIXPANEL_TOKEN is set.')
    }
}

export const Mixpanel = {
    identify: (id: string) => {
        if (MIXPANEL_TOKEN) {
            mixpanel.identify(id)
        }
    },
    alias: (id: string) => {
        if (MIXPANEL_TOKEN) {
            mixpanel.alias(id)
        }
    },
    track: (name: string, props?: Record<string, unknown>) => {
        if (MIXPANEL_TOKEN) {
            mixpanel.track(name, props)
        } else if (!isProd) {
            console.warn(`Mixpanel.track("${name}") called but token is missing.`)
        }
    },
    people: {
        set: (props: Record<string, unknown>) => {
            if (MIXPANEL_TOKEN) {
                mixpanel.people.set(props)
            }
        }
    }
}
