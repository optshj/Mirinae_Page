'use client'

import { easeInOut, easeOut, motion, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { DownloadButton } from '@/features/download'

// 북극성 일주: 앱 아이콘이 북극성 자리에 있고, 스크롤(=노출 시간)만큼 하늘이 그 둘레로 돌며 궤적이 길어진다.
// 화면 아래 두 겹 능선 뒤로 궤적이 지고, 끝에서는 능선 너머로 새벽빛이 차오르며 별이 옅어진다
const SWEEP = Math.PI * 0.62 // 끝까지 내렸을 때 하늘이 도는 각도(약 112도)
const STAR_AREA = 7000 // 별 하나가 차지하는 화면 면적(px²). 클수록 궤적 수가 줄어든다
const DAWN_START = 0.4 // 새벽빛이 오기 시작하는 진행도. 작을수록 일찍, 길게 밝아진다
const END = 1 // 회전·새벽·가까운 능선이 함께 끝나는 진행도. 1 = 고정이 풀려 섹션이 위로 넘어가는 순간
const SETTLE = [0, 0.15] // 이 구간에서 화면 가운데 있던 아이콘이 글자와 함께 제자리로 올라간다

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
// 아이콘이 아직 제자리로 덜 올라간 비율(1 → 0)
// 하늘 회전과 가까운 능선이 함께 쓰는 진행 곡선(0 → 1). 같은 곡선이라 둘의 속도가 매 순간 비례한다
const turn = (p: number) => easeInOut(clamp01(p / END))
const unsettled = (p: number) => 1 - easeInOut(clamp01((p - SETTLE[0]) / (SETTLE[1] - SETTLE[0])))

type Star = { r: number; a0: number; w: number; al: number; c: string }
// up(p): 아직 덜 올라온 비율(1 → 0)
type Ridge = { pts: [number, number][]; fill: string; rise: number; up: (p: number) => number }

// 능선: 사인 몇 개를 겹친 시드 고정 곡선. base = 화면 높이 대비 기준선, amp = 높낮이
function ridge(W: number, H: number, seed: number, base: number, amp: number, step: number) {
    let s = seed
    const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647
    const waves = [
        [1.3, amp],
        [3.1, amp * 0.45],
        [7.7, amp * 0.18],
        [17, amp * 0.07]
    ].map(([f, a]) => [f, a, rnd() * Math.PI * 2])
    const pts: [number, number][] = []
    for (let x = -step; x <= W + step; x += step) {
        pts.push([x, H * base - waves.reduce((y, [f, a, ph]) => y + a * Math.sin((x / W) * f * Math.PI + ph), 0)])
    }
    return pts
}

function useReveal(progress: MotionValue<number>, start: number) {
    const opacity = useTransform(progress, [start, start + 0.07], [0, 1], { ease: easeOut })
    const y = useTransform(opacity, [0, 1], [14, 0])
    return { opacity, y }
}

export function Section4() {
    const sectionRef = useRef<HTMLElement>(null)
    const stageRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const tileRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const reduceMotion = useReducedMotion()

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
    // 모션 줄이기면 고정 없이 완성된 상태로 보여준다
    const progress = useTransform(() => (reduceMotion ? 1 : scrollYProgress.get()))
    // 섹션이 화면 아래에서 들어오는 동안 0→1. 고정 전부터 아이콘이 보여야 빈 하늘이 길게 느껴지지 않는다
    const { scrollYProgress: enterProgress } = useScroll({ target: sectionRef, offset: ['start end', 'start start'] })
    const enter = useTransform(() => (reduceMotion ? 1 : enterProgress.get()))

    const tileOpacity = useTransform(enter, [0.35, 0.9], [0, 1], { ease: easeOut })
    const tileScale = useTransform(tileOpacity, [0, 1], [0.55, 1])
    // 글 뒤 어두운 판은 글이 나오기 시작한 뒤에 천천히 깔린다
    const scrimOpacity = useTransform(progress, [0, 0.18], [0, 1])
    // 새벽은 장노출처럼 일찍부터 아주 천천히 밝아지다가 끝에서 빨라지고, 빛이 지평선에서 위로 번진다
    const dawn = useTransform(progress, [DAWN_START, END], [0, 1], { ease: easeInOut })
    // 글자가 아직 안 보일 땐 아이콘이 위로 쏠려 보이지 않게, 아이콘을 내용 묶음의 가운데로 내려 둔다
    const shift = useMotionValue(0)
    const contentY = useTransform(() => shift.get() * unsettled(progress.get()))
    const dawnY = useTransform(dawn, [0, 1], ['35%', '0%'])
    const line1 = useReveal(progress, 0)
    const line2 = useReveal(progress, 0.035)
    const highlight = useTransform(progress, [0.07, 0.13], ['0%', '100%'], { ease: easeOut })
    const sub = useReveal(progress, 0.07)
    const cta = useReveal(progress, 0.1)

    useEffect(() => {
        const stage = stageRef.current!
        const canvas = canvasRef.current!
        const tile = tileRef.current!
        const content = contentRef.current!
        const ctx = canvas.getContext('2d')!
        let W = 0
        let H = 0
        let cx = 0
        let baseCy = 0
        let stars: Star[] = []
        let ridges: Ridge[] = []

        const layout = () => {
            const dpr = Math.min(2, devicePixelRatio || 1)
            W = stage.clientWidth
            H = stage.clientHeight
            canvas.width = W * dpr
            canvas.height = H * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            shift.set(content.offsetHeight / 2 - (tile.offsetTop + tile.offsetHeight / 2))
            // 회전축 = 아이콘 중심. offset은 transform(scale, 내림)을 무시하므로 제자리 기준이고, 그릴 때 내림만큼 더한다
            cx = content.offsetLeft + tile.offsetLeft + tile.offsetWidth / 2
            baseCy = content.offsetTop + tile.offsetTop + tile.offsetHeight / 2
            const R = Math.hypot(Math.max(cx, W - cx), Math.max(baseCy, H - baseCy))
            let s = 5
            const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647
            stars = Array.from({ length: Math.round((W * H) / STAR_AREA) }, () => {
                const hue = rnd() // 별마다 색온도가 다르다: 노란 별, 푸른 별, 흰 별
                return {
                    r: 34 + Math.sqrt(rnd()) * R,
                    a0: rnd() * Math.PI * 2,
                    w: 0.5 + rnd() * rnd() * 1.8,
                    al: 0.25 + rnd() * 0.75,
                    c: hue < 0.2 ? '255,226,190' : hue < 0.55 ? '206,220,255' : '255,255,255'
                }
            })
            const m = W < 640
            ridges = [
                // 먼 능선: 대기 때문에 밝고 덜 움직인다
                { pts: ridge(W, H, 11, m ? 0.86 : 0.82, H * (m ? 0.045 : 0.06), 6), fill: '#3b3858', rise: 28, up: (p) => 1 - easeOut(clamp01((p - 0.1) / 0.26)) },
                { pts: ridge(W, H, 29, m ? 0.92 : 0.9, H * (m ? 0.035 : 0.05), 4), fill: '#16182f', rise: 64, up: (p) => 1 - turn(p) }
            ]
        }

        const draw = () => {
            const p = progress.get()
            // 고정되는 순간 속도 0에서 출발해 END에서 천천히 멈춘다
            const sweep = SWEEP * turn(p)
            const cy = baseCy + shift.get() * unsettled(p)
            // 아이콘이 자리 잡은 뒤 능선이 아래에서 올라온다. 먼 능선은 금방, 가까운 능선은 회전과 함께 END에서 멈춘다
            const up = ridges[0].up(p)
            const dawn = easeInOut(clamp01((p - DAWN_START) / (END - DAWN_START)))
            ctx.clearRect(0, 0, W, H)
            ctx.lineCap = 'round'
            for (const st of stars) {
                const a1 = st.a0 - sweep
                const hy = cy + Math.sin(a1) * st.r
                // 새벽빛에 별이 옅어지고, 아래쪽 별부터 먼저 사라진다
                const fade = (1 - 0.55 * dawn) * (1 - 0.6 * dawn * clamp01((hy / H - 0.4) / 0.6))
                if (sweep > 0.002) {
                    ctx.strokeStyle = `rgba(${st.c},${st.al * 0.5 * fade})`
                    ctx.lineWidth = st.w
                    ctx.beginPath()
                    ctx.arc(cx, cy, st.r, a1, st.a0)
                    ctx.stroke()
                }
                ctx.fillStyle = `rgba(${st.c},${Math.min(1, st.al + 0.2) * fade})`
                ctx.beginPath()
                ctx.arc(cx + Math.cos(a1) * st.r, hy, st.w * 0.9, 0, Math.PI * 2)
                ctx.fill()
            }
            // 지평선 빛: 먼 능선 바로 위에서 위로 옅어진다. 아래까지 채워 능선 골짜기에 띠 경계가 안 보이게
            const hz = ridges[0].pts[0][1] - H * 0.06
            const glow = ctx.createLinearGradient(0, hz - H * 0.22, 0, hz + H * 0.06)
            glow.addColorStop(0, 'rgba(247,214,190,0)')
            glow.addColorStop(1, `rgba(247,214,190,${0.16 * (1 - up)})`)
            ctx.fillStyle = glow
            ctx.fillRect(0, hz - H * 0.22, W, H)
            for (const r of ridges) {
                const dy = r.rise * r.up(p)
                ctx.fillStyle = r.fill
                ctx.beginPath()
                ctx.moveTo(r.pts[0][0], H)
                for (const [x, y] of r.pts) ctx.lineTo(x, y + dy)
                ctx.lineTo(W + 10, H)
                ctx.closePath()
                ctx.fill()
            }
        }

        const ro = new ResizeObserver(() => {
            layout()
            draw()
        })
        ro.observe(stage)
        const unsubscribe = progress.on('change', draw)
        return () => {
            ro.disconnect()
            unsubscribe()
        }
    }, [progress, shift])

    return (
        <section ref={sectionRef} className={`relative ${reduceMotion ? '' : 'h-[260vh]'}`}>
            <div ref={stageRef} className={`${reduceMotion ? 'relative min-h-dvh' : 'sticky top-0 h-dvh'} grid place-items-center overflow-hidden pb-[10vh] sm:pb-[16vh]`}>
                <motion.div
                    aria-hidden
                    style={{ opacity: dawn, y: dawnY }}
                    className="absolute inset-0 bg-[linear-gradient(to_top,rgb(240_170_150/.55),rgb(247_224_150/.16)_32%,transparent_62%)]"
                />
                <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
                <motion.div ref={contentRef} style={{ y: contentY }} className="relative isolate flex max-w-3xl flex-col items-center px-6 text-center">
                    <motion.div
                        aria-hidden
                        style={{ opacity: scrimOpacity }}
                        className="absolute top-[62%] left-1/2 -z-10 h-[120%] w-[min(860px,130vw)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgb(22_24_50/.72),rgb(22_24_50/.4)_55%,transparent)]"
                    />
                    <motion.div ref={tileRef} style={{ opacity: tileOpacity, scale: tileScale }}>
                        <Image src="/icon.svg" alt="App Icon" width={60} height={60} className="mb-8 shadow-2xl drop-shadow-lg" />
                    </motion.div>

                    <h3 className="mt-4 text-3xl font-bold tracking-tight break-keep text-white sm:text-5xl">
                        <motion.span style={line1} className="inline-block">
                            바탕화면 속 일정 관리
                        </motion.span>
                        <br />
                        <motion.span style={line2} className="relative isolate inline-block">
                            지금 바로 시작하세요
                            <motion.span style={{ width: highlight }} className="bg-brand/70 absolute bottom-1 left-0 -z-10 h-6" />
                        </motion.span>
                    </h3>

                    <motion.p style={sub} className="mt-6 max-w-2xl text-lg leading-8 break-keep text-zinc-400">
                        브라우저도, 앱도 열 필요 없이 바로 확인하세요
                    </motion.p>

                    <motion.div style={cta} className="mt-12">
                        <DownloadButton />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
