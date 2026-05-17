import mixpanel from 'mixpanel-browser'

const isProd = process.env.NODE_ENV === 'production'
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN

if (typeof window !== 'undefined' && MIXPANEL_TOKEN) {
    mixpanel.init(MIXPANEL_TOKEN, {
        debug: !isProd,
        track_pageview: true,
        persistence: 'localStorage',
        record_sessions_percent: 100,
        record_mask_text_selector: ''
    })
}

export const Mixpanel = {
    identify: (id: string) => {
        if (MIXPANEL_TOKEN) mixpanel.identify(id)
    },
    alias: (id: string) => {
        if (MIXPANEL_TOKEN) mixpanel.alias(id)
    },
    track: (name: string, props?: Record<string, unknown>) => {
        if (MIXPANEL_TOKEN) mixpanel.track(name, props)
    },
    people: {
        set: (props: Record<string, unknown>) => {
            if (MIXPANEL_TOKEN) mixpanel.people.set(props)
        }
    }
}
