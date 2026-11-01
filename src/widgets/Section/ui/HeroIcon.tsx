'use client'

import { useEffect, useRef, type RefObject } from 'react'
import { useReducedMotion } from 'motion/react'
import { getSkyStars } from '@/entities/background'

// 히어로 아이콘: 배경 별 9개가 아이콘 자리로 모여(초점) 숨 쉬듯 한 번 모였다 펴지며 아이콘이 된다(숨)
// 아래 시각은 연출 시간 기준이고, 실제로는 SPEED배 빠르게 흐른다
// 0.4~2.8초: 별 9개가 직선으로 칸 자리까지 이동, 그동안 배경이 살짝 어두워졌다 돌아온다
// 2.7~3.8초: 빛점이 칸으로 굳고 타일이 차오르며, 아이콘 전체가 0.93배로 들이쉬었다 1배로 내쉰다
const SPEED = 1.35 // 클수록 빨리 모인다. 1.35 = 아이콘 완성까지 약 2.8초

// 아이콘 구조(public/icon.svg): 칸 중심이 타일 중심에서 ±0.1875, 칸 크기 0.094
const OFF = 0.1875
const CELL = 0.094
const LAV = [236, 230, 255]
const CELL_COL = [
    [255, 255, 255, 0.75],
    [255, 255, 255, 0.85],
    [...LAV, 0.7],
    [255, 255, 255, 0.95],
    [255, 221, 68, 1],
    [255, 255, 255, 0.9],
    [...LAV, 0.7],
    [255, 255, 255, 0.85],
    [255, 255, 255, 0.9]
]
const RING = [0, 1, 2, 5, 8, 7, 6, 3] // 가운데(4)를 뺀 칸
const MORPH = 2.7 // 변신 시작(초)
// 히어로 글자가 올라오기 시작하는 시각(초). 아이콘 완성을 기다리지 않고 별이 모이는 동안 함께 올라온다(메시지를 먼저 읽게)
export const HERO_TEXT_AT = 0.6

type Box = { cx: number; cy: number; s: number }

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const sm = (a: number, b: number, t: number) => {
    const x = clamp((t - a) / (b - a))
    return x * x * (3 - 2 * x)
}
const eOut = (t: number) => 1 - Math.pow(1 - t, 3)
const eInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const cellOff = (i: number) => [((i % 3) - 1) * OFF, (Math.floor(i / 3) - 1) * OFF]
const cellPos = (R: Box, i: number) => {
    const [ox, oy] = cellOff(i)
    return [R.cx + ox * R.s, R.cy + oy * R.s]
}

// 아이콘 둘레 8방향에서 하나씩, 가운데 칸은 위쪽에서 하나. 별자리용(locked) 별은 건드리지 않는다
// (cx, cy): 아이콘 중심의 화면 좌표
function pickStars(cx: number, cy: number) {
    const sky = getSkyStars()
    const chosen: number[] = new Array(9)
    const take = (ang: number, cell: number) => {
        let best = -1
        let bestScore = Infinity
        // ponytail: 80개 선형 탐색 × 9번. 별이 수천 개가 되면 각도별 버킷으로
        sky.forEach((s, i) => {
            if (s.locked || s.taken) return
            const dx = s.fx * innerWidth - cx
            const dy = s.fy * innerHeight - cy
            const d = Math.hypot(dx, dy)
            let da = Math.abs(Math.atan2(dy, dx) - ang)
            da = Math.min(da, Math.PI * 2 - da)
            const score = da * 200 + Math.abs(d - 250) * 0.4 + (d < 120 ? 400 : 0)
            if (score < bestScore) {
                bestScore = score
                best = i
            }
        })
        if (best < 0) return
        sky[best].taken = true
        chosen[cell] = best
    }
    for (const i of RING) {
        const [ox, oy] = cellOff(i)
        take(Math.atan2(oy, ox), i)
    }
    take(-Math.PI / 2, 4)
    return chosen
}

export function HeroIcon({ iconRef }: { iconRef: RefObject<HTMLDivElement | null> }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const dimRef = useRef<HTMLDivElement>(null)
    const reduce = useReducedMotion()

    useEffect(() => {
        const canvas = canvasRef.current!
        const dim = dimRef.current!
        const ctx = canvas.getContext('2d')!
        const t0 = performance.now()
        let chosen: number[] | null = null
        let hidden = false
        let raf = 0
        let lastT = 0
        let W = 0
        let H = 0

        const rr = (x: number, y: number, w: number, h: number, r: number) => {
            ctx.beginPath()
            ctx.roundRect(x, y, w, h, r)
        }
        const drawTile = (R: Box, a: number) => {
            if (a <= 0.001) return
            const s = R.s
            ctx.save()
            ctx.translate(R.cx, R.cy)
            ctx.globalAlpha = a
            const g = ctx.createLinearGradient(-s / 2, 0, s / 2, 0)
            g.addColorStop(0, '#8AA6F8')
            g.addColorStop(1, '#A77AD8')
            ctx.shadowColor = 'rgba(30,30,80,.35)'
            ctx.shadowBlur = s * 0.2
            ctx.shadowOffsetY = s * 0.06
            ctx.fillStyle = g
            rr(-s / 2, -s / 2, s, s, s * 0.22)
            ctx.fill()
            ctx.restore()
        }
        // m: 0 = 빛점, 1 = 둥근 칸. g: 0 = 배경 별과 똑같은 흰 점, 1 = 빛 번짐·가운데 별의 노란 기운까지 오른 상태
        const drawStar = (i: number, x: number, y: number, m: number, g: number, r: number, R: Box) => {
            const c = CELL_COL[i]
            const from = i === 4 ? [255, lerp(255, 236, g), lerp(255, 170, g)] : [255, 255, 255]
            const col = [0, 1, 2].map((k) => Math.round(lerp(from[k], c[k], m))).join(',')
            const cs = Math.max(CELL * R.s, 2)
            const rc = r * lerp(1, 1.3, g)
            ctx.save()
            ctx.translate(x, y)
            if (m < 1 && g > 0) {
                const gr = rc * 5
                const halo = ctx.createRadialGradient(0, 0, 0, 0, 0, gr)
                halo.addColorStop(0, `rgba(${col},${0.5 * g * (1 - m)})`)
                halo.addColorStop(1, `rgba(${col},0)`)
                ctx.fillStyle = halo
                ctx.fillRect(-gr, -gr, gr * 2, gr * 2)
            }
            const w = lerp(rc * 2, cs, m)
            ctx.fillStyle = `rgba(${col},${lerp(1, c[3], m)})`
            rr(-w / 2, -w / 2, w, w, lerp(w / 2, w * 0.2, m))
            ctx.fill()
            ctx.restore()
        }

        const frame = (now: number) => {
            const icon = iconRef.current
            if (!icon || !getSkyStars().length) {
                raf = requestAnimationFrame(frame)
                return
            }
            const t = reduce ? 99 : ((now - t0) / 1000) * SPEED
            lastT = t
            const cr = canvas.getBoundingClientRect()
            if (W !== cr.width || H !== cr.height) {
                W = cr.width
                H = cr.height
                const dpr = Math.min(2, devicePixelRatio || 1)
                canvas.width = W * dpr
                canvas.height = H * dpr
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            }
            const ir = icon.getBoundingClientRect()
            // 캔버스 좌표. 캔버스는 히어로와 함께 스크롤되고, 배경 별은 화면에 고정돼 있다
            const R: Box = { cx: ir.left - cr.left + ir.width / 2, cy: ir.top - cr.top + ir.height / 2, s: ir.width }
            if (!chosen) chosen = pickStars(ir.left + ir.width / 2, ir.top + ir.height / 2)
            // 출발 전까지는 배경의 진짜 별을 그대로 둬서 다른 별과 구별되지 않게 한다. 출발하는 순간 캔버스가 넘겨받는다
            const k = eInOut(clamp((t - 0.4) / 2.4))
            if (!hidden && k > 0) {
                const els = chosen.map((i) => document.querySelector<HTMLElement>(`[data-sky="${i}"]`))
                if (els.every(Boolean)) {
                    els.forEach((el) => (el!.style.visibility = 'hidden'))
                    hidden = true
                }
            }

            // 초점: 별이 모이는 동안 배경이 살짝 어두워졌다가 아이콘이 완성되며 돌아온다
            dim.style.opacity = String(0.18 * sm(0.4, 2.2, t) * (1 - sm(3.4, 5, t)))

            // 숨: 들숨 0~0.35초에 0.93배까지 모였다가, 날숨 0.35~1.1초에 1배로 펴진다(튕김 없음)
            const u = t - MORPH
            const f = u < 0 ? 1 : u < 0.35 ? lerp(1, 0.93, sm(0, 0.35, u)) : lerp(0.93, 1, eOut(clamp((u - 0.35) / 0.75)))
            const R2: Box = { ...R, s: R.s * f }
            const m = sm(0.1, 0.55, u)
            // 빛 번짐은 움직이기 시작하면서 서서히 오른다
            const g = sm(0, 0.35, k)

            ctx.clearRect(0, 0, W, H)
            drawTile(R2, sm(0.3, 0.8, u))
            const sky = getSkyStars()
            chosen.forEach((si, i) => {
                if (si === undefined || !hidden) return
                const s = sky[si]
                const ox = s.fx * innerWidth + s.size / 2 - cr.left
                const oy = s.fy * innerHeight + s.size / 2 - cr.top
                const [tx, ty] = cellPos(u > 0 ? R2 : R, i)
                drawStar(i, lerp(ox, tx, k), lerp(oy, ty, k), m, g, s.size / 2, R2)
            })

            if (t < 5) raf = requestAnimationFrame(frame)
        }
        raf = requestAnimationFrame(frame)
        // 다 그린 뒤엔 루프를 멈추고, 크기가 바뀔 때만 다시 그린다
        const onResize = () => {
            if (lastT >= 5) raf = requestAnimationFrame(frame)
        }
        addEventListener('resize', onResize)

        return () => {
            cancelAnimationFrame(raf)
            removeEventListener('resize', onResize)
            const sky = getSkyStars()
            chosen?.forEach((i) => {
                if (sky[i]) sky[i].taken = false
                const el = document.querySelector<HTMLElement>(`[data-sky="${i}"]`)
                if (el) el.style.visibility = ''
            })
        }
    }, [iconRef, reduce])

    return (
        <>
            {/* 배경 별(-z-10) 바로 위에 깔리는 어두운 막 */}
            <div ref={dimRef} aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-[rgb(10_12_30)] opacity-0" />
            <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 h-screen w-full" />
        </>
    )
}
