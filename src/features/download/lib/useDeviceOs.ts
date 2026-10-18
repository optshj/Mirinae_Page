import { useEffect, useState } from 'react'

export type DeviceOs = 'windows' | 'mobile' | 'mac' | 'linux' | 'other'

// 화면 너비가 아니라 기기로 판별한다 — 창을 좁히거나 확대한 PC 사용자도 다운로드할 수 있어야 한다
const MOBILE_UA = /Android|iPhone|iPad|iPod|Mobile/i

function detectOs(): DeviceOs {
    const ua = navigator.userAgent
    // iPadOS Safari는 기본으로 Mac UA를 보내므로 터치 포인트로 구분
    const isIPadOS = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1
    if (MOBILE_UA.test(ua) || isIPadOS) return 'mobile'
    if (/Windows/.test(ua)) return 'windows'
    if (/Macintosh/.test(ua)) return 'mac'
    if (/Linux|X11|CrOS/.test(ua)) return 'linux'
    return 'other'
}

// SSR/하이드레이션 전에는 방문자 대부분인 Windows로 가정해 다운로드 링크를 바로 렌더한다
export function useDeviceOs() {
    const [os, setOs] = useState<DeviceOs>('windows')

    useEffect(() => {
        setOs(detectOs())
    }, [])

    return os
}
