'use client'

import { easeIn, easeOut, motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { DownloadButton } from '@/features/download'

// 북극성 일주: 앱 아이콘이 북극성 자리에 있고, 스크롤(=노출 시간)만큼 하늘이 그 둘레로 돌며 궤적이 길어진다.
// 화면 아래 두 겹 능선 뒤로 궤적이 지고, 끝에서는 능선 너머로 새벽빛이 차오르며 별이 옅어진다
const SWEEP = Math.PI * 0.62 // 끝까지 내렸을 때 하늘이 도는 각도(약 112도)
const STAR_AREA = 7000 // 별 하나가 차지하는 화면 면적(px²). 클수록 궤적 수가 줄어든다
const DAWN_START = 0.4 // 새벽빛이 오기 시작하는 진행도. 작을수록 일찍, 길게 밝아진다

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

type Star = { r: number; a0: number; w: number; al: number; c: string }
type Ridge = { pts: [number, number][]; fill: string; rise: number }

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
    const opacity = useTransform(progress, [start, start + 0.1], [0, 1], { ease: easeOut })
    const y = useTransform(opacity, [0, 1], [14, 0])
    return { opacity, y }
}

export function Section4() {
    const sectionRef = useRef<HTMLElement>(null)
    const stageRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const tileRef = useRef<HTMLDivElement>(null)
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
    const scrimOpacity = useTransform(progress, [0.12, 0.4], [0, 1])
    // 새벽은 장노출처럼 일찍부터 아주 천천히 밝아지다가 끝에서 빨라지고, 빛이 지평선에서 위로 번진다
    const dawn = useTransform(progress, [DAWN_START, 1], [0, 1], { ease: easeIn })
    const dawnY = useTransform(dawn, [0, 1], ['35%', '0%'])
    const line1 = useReveal(progress, 0.06)
    const line2 = useReveal(progress, 0.16)
    const highlight = useTransform(progress, [0.22, 0.32], ['0%', '100%'], { ease: easeOut })
    const sub = useReveal(progress, 0.26)
    const cta = useReveal(progress, 0.36)

    useEffect(() => {
        const stage = stageRef.current!
        const canvas = canvasRef.current!
        const tile = tileRef.current!
        const ctx = canvas.getContext('2d')!
        let W = 0
        let H = 0
        let cx = 0
        let cy = 0
        let stars: Star[] = []
        let ridges: Ridge[] = []

        const layout = () => {
            const dpr = Math.min(2, devicePixelRatio || 1)
            W = stage.clientWidth
            H = stage.clientHeight
            canvas.width = W * dpr
            canvas.height = H * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            // 회전축 = 아이콘 중심. scale은 중심 기준이라 등장 중에도 위치가 같다
            const sr = stage.getBoundingClientRect()
            const tr = tile.getBoundingClientRect()
            cx = tr.left - sr.left + tr.width / 2
            cy = tr.top - sr.top + tr.height / 2
            const R = Math.hypot(Math.max(cx, W - cx), Math.max(cy, H - cy))
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
                { pts: ridge(W, H, 11, m ? 0.86 : 0.82, H * (m ? 0.045 : 0.06), 6), fill: '#3b3858', rise: 28 },
                { pts: ridge(W, H, 29, m ? 0.92 : 0.9, H * (m ? 0.035 : 0.05), 4), fill: '#16182f', rise: 64 }
            ]
        }

        const draw = () => {
            const p = progress.get()
            const sweep = SWEEP * easeOut(clamp01((p - 0.04) / 0.86))
            const up = 1 - easeOut(clamp01((p - 0.1) / 0.26)) // 아이콘이 자리 잡은 뒤 능선이 아래에서 올라온다
            const dawn = easeIn(clamp01((p - DAWN_START) / (1 - DAWN_START)))
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
                const dy = r.rise * up
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
    }, [progress])

    return (
        <section ref={sectionRef} className={`relative ${reduceMotion ? '' : 'h-[320vh]'}`}>
            <div ref={stageRef} className={`${reduceMotion ? 'relative min-h-dvh' : 'sticky top-0 h-dvh'} grid place-items-center overflow-hidden pb-[10vh] sm:pb-[16vh]`}>
                <motion.div
                    aria-hidden
                    style={{ opacity: dawn, y: dawnY }}
                    className="absolute inset-0 bg-[linear-gradient(to_top,rgb(240_170_150/.55),rgb(247_224_150/.16)_32%,transparent_62%)]"
                />
                <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
                <div className="relative isolate flex max-w-3xl flex-col items-center px-6 text-center">
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
                        복잡한 설정 없이 설치만으로 완성되는 캘린더
                    </motion.p>

                    <motion.div style={cta} className="mt-12">
                        <DownloadButton />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
