'use client'

import { useAnimationFrame, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { getSkyStars } from '../model/sky'

// 별자리 잇기 커서: 기본 화살표는 그대로 두고, 가까운 배경 별 최대 3개와 가는 선으로 잇는다.
// 클릭하면 그 순간의 별자리가 잠깐 새겨진다. 선·불빛은 모두 transform으로만 놓는다
const RADIUS = 190
const MAX = 3
const POOL = 8
const HIT = 'a,button,summary,[role="button"],label,select'
const TYPE = 'input,textarea,select,[contenteditable="true"]'
const TEXT = 'p,h1,h2,h3,h4,li,dd,blockquote'

type Kind = 'none' | 'hit' | 'type' | 'text'

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
// 프레임 간격과 무관하게 같은 속도로 따라가게 하는 보간 계수
const kf = (base: number, dt: number) => 1 - Math.pow(1 - base, dt / 16.67)
const place = (el: HTMLElement, x1: number, y1: number, x2: number, y2: number) => {
    const dx = x2 - x1
    const dy = y2 - y1
    el.style.transform = `translate3d(${x1}px,${y1}px,0) rotate(${Math.atan2(dy, dx)}rad) scaleX(${Math.hypot(dx, dy)})`
}
const skyPoints = () =>
    getSkyStars()
        .filter((s) => !s.taken)
        .map((s) => ({ x: s.fx * innerWidth + s.size / 2, y: s.fy * innerHeight + s.size / 2 }))

const LINE = 'absolute top-0 left-0 -mt-[0.5px] h-px w-px origin-[0_50%] bg-[rgb(214_224_255)] opacity-0'

export function ConstellationCursor() {
    const reduceMotion = useReducedMotion()
    const [fine, setFine] = useState(false)

    useEffect(() => {
        const query = matchMedia('(hover: hover) and (pointer: fine)')
        const update = () => setFine(query.matches)
        update()
        query.addEventListener('change', update)
        return () => query.removeEventListener('change', update)
    }, [])

    // 터치 기기와 모션 줄이기에서는 기본 커서만
    if (!fine || reduceMotion) return null
    return <CursorLayer />
}

function CursorLayer() {
    const rootRef = useRef<HTMLDivElement>(null)
    const lines = useRef<(HTMLDivElement | null)[]>([])
    const sparks = useRef<(HTMLDivElement | null)[]>([])
    const anchorRef = useRef<HTMLDivElement>(null)
    const pointer = useRef({ x: 0, y: 0, in: false, kind: 'none' as Kind })
    const state = useRef({ ax: 0, ay: 0, started: false, vis: 0, al: new Float32Array(0) })

    useEffect(() => {
        const p = pointer.current
        const onMove = (e: PointerEvent) => {
            if (e.pointerType !== 'mouse') return
            p.x = e.clientX
            p.y = e.clientY
            p.in = true
        }
        // mouseover는 스크롤로 아래 요소가 바뀔 때도 다시 온다
        const onOver = (e: MouseEvent) => {
            const t = e.target as Element | null
            if (!t?.closest) return
            p.kind = t.closest(TYPE) ? 'type' : t.closest(HIT) ? 'hit' : t.closest(TEXT) ? 'text' : 'none'
        }
        const onLeave = () => {
            p.in = false
        }
        // 그 순간의 별자리를 새긴다: 커서→별, 별→별을 각도 순으로 잇고 1.4초에 걸쳐 지운다
        const onDown = (e: PointerEvent) => {
            const s = state.current
            if (e.pointerType !== 'mouse' || p.kind === 'hit' || !s.started) return
            const sky = skyPoints()
            const angle = (q: { x: number; y: number }) => Math.atan2(q.y - s.ay, q.x - s.ax)
            const on = sky.filter((_, i) => s.al[i] > 0.5).sort((a, b) => angle(a) - angle(b))
            const segs = on.map((q) => [s.ax, s.ay, q.x, q.y] as const)
            for (let i = 1; i < on.length; i++) segs.push([on[i - 1].x, on[i - 1].y, on[i].x, on[i].y])
            for (const [x1, y1, x2, y2] of segs) {
                const el = document.createElement('div')
                el.className = `${LINE} transition-opacity duration-[1400ms] ease-[cubic-bezier(.4,0,.2,1)]`
                place(el, x1, y1, x2, y2)
                el.style.opacity = '0.85'
                rootRef.current?.appendChild(el)
                requestAnimationFrame(() => requestAnimationFrame(() => (el.style.opacity = '0')))
                setTimeout(() => el.remove(), 1500)
            }
        }
        addEventListener('pointermove', onMove, { passive: true })
        addEventListener('mouseover', onOver, { passive: true })
        addEventListener('pointerdown', onDown, { passive: true })
        addEventListener('blur', onLeave)
        document.documentElement.addEventListener('mouseleave', onLeave)
        return () => {
            removeEventListener('pointermove', onMove)
            removeEventListener('mouseover', onOver)
            removeEventListener('pointerdown', onDown)
            removeEventListener('blur', onLeave)
            document.documentElement.removeEventListener('mouseleave', onLeave)
        }
    }, [])

    useAnimationFrame((_, delta) => {
        const p = pointer.current
        const s = state.current
        const dt = Math.min(64, delta)
        if (!s.started) {
            if (!p.in) return
            s.ax = p.x
            s.ay = p.y
            s.started = true
        }
        const sky = skyPoints()
        if (s.al.length !== sky.length) s.al = new Float32Array(sky.length)
        const k = kf(0.3, dt)
        s.ax += (p.x - s.ax) * k
        s.ay += (p.y - s.ay) * k
        // 버튼·입력칸 위에서는 선이 걷히고, 글 위에서는 옅어진다
        const quiet = !p.in || p.kind === 'hit' || p.kind === 'type'
        s.vis += ((quiet ? 0 : p.kind === 'text' ? 0.6 : 1) - s.vis) * kf(quiet ? 0.25 : 0.1, dt)

        // ponytail: 80개 선형 탐색. 별이 수천 개가 되면 격자 분할로
        const near: [number, number][] = []
        sky.forEach((q, i) => {
            const d = Math.hypot(q.x - s.ax, q.y - s.ay)
            if (d < RADIUS) near.push([d, i])
        })
        near.sort((a, b) => a[0] - b[0])
        const pick = new Set(near.slice(0, MAX).map((n) => n[1]))

        let n = 0
        for (let i = 0; i < sky.length; i++) {
            s.al[i] += ((pick.has(i) ? 1 : 0) - s.al[i]) * kf(0.14, dt)
            if (s.al[i] < 0.01 || n >= POOL) continue
            const q = sky[i]
            const f = s.al[i] * Math.pow(clamp01(1 - Math.hypot(q.x - s.ax, q.y - s.ay) / RADIUS), 0.6) * s.vis
            const line = lines.current[n]!
            const spark = sparks.current[n]!
            place(line, s.ax, s.ay, q.x, q.y)
            line.style.opacity = String(0.5 * f)
            spark.style.transform = `translate3d(${q.x}px,${q.y}px,0) scale(${0.5 + 0.7 * f})`
            spark.style.opacity = String(f)
            n++
        }
        for (; n < POOL; n++) {
            lines.current[n]!.style.opacity = '0'
            sparks.current[n]!.style.opacity = '0'
        }
        anchorRef.current!.style.transform = `translate3d(${s.ax}px,${s.ay}px,0)`
        anchorRef.current!.style.opacity = String(0.85 * s.vis)
    })

    return (
        // 배경 별(-z-10)과 같은 층. DOM에서 별 뒤에 오므로 별 위, 모든 콘텐츠 아래에 깔린다
        <div ref={rootRef} aria-hidden className="pointer-events-none fixed inset-0 -z-10">
            {Array.from({ length: POOL }, (_, i) => (
                <div key={`l${i}`} ref={(el) => void (lines.current[i] = el)} className={LINE} />
            ))}
            {Array.from({ length: POOL }, (_, i) => (
                <div
                    key={`s${i}`}
                    ref={(el) => void (sparks.current[i] = el)}
                    className="absolute top-0 left-0 -mt-[9px] -ml-[9px] h-[18px] w-[18px] rounded-full bg-[radial-gradient(closest-side,#fff,rgb(196_212_255/.55)_30%,transparent)] opacity-0"
                />
            ))}
            <div
                ref={anchorRef}
                className="absolute top-0 left-0 -mt-[2.5px] -ml-[2.5px] h-[5px] w-[5px] rounded-full bg-white opacity-0 shadow-[0_0_8px_2px_rgb(196_212_255/.6)]"
            />
        </div>
    )
}
