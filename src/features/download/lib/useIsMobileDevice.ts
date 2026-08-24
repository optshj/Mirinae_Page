import { useEffect, useState } from 'react'

const MOBILE_BREAKPOINT = '(max-width: 767px)'

export function useIsMobileDevice() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia(MOBILE_BREAKPOINT)
        setIsMobile(mediaQuery.matches)

        const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    return isMobile
}
