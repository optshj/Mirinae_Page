'use client'

import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import { useReducedMotion } from 'motion/react'

// 휠 스크롤에 관성을 준다. lerp가 작을수록 더 묵직하게 따라온다. 모션 줄이기면 기본 스크롤
export function SmoothScroll() {
    const reduceMotion = useReducedMotion()
    if (reduceMotion) return null
    // allowNestedScroll: 다운로드 안내 다이얼로그, 제보 textarea 같은 안쪽 스크롤 영역은 그대로 스크롤된다
    return <ReactLenis root options={{ lerp: 0.08, allowNestedScroll: true }} />
}
