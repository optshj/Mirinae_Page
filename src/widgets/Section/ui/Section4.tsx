'use client'

import { easeOut, motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { DownloadButton } from '@/features/download'

// 북극성 일주: 앱 아이콘이 북극성 자리에 있고, 스크롤(=노출 시간)만큼 하늘이 그 둘레로 돌며 궤적이 길어진다
const SWEEP = Math.PI * 0.62 // 끝까지 내렸을 때 하늘이 도는 각도(약 112도)
const STAR_AREA = 7000 // 별 하나가 차지하는 화면 면적(px²). 클수록 궤적 수가 줄어든다

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

type Star = { r: number; a0: number; w: number; al: number; c: string }

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

    const tileOpacity = useTransform(progress, [0.06, 0.2], [0, 1], { ease: easeOut })
    const tileScale = useTransform(tileOpacity, [0, 1], [0.55, 1])
    // 글 뒤 어두운 판은 글이 나오기 시작한 뒤에 천천히 깔린다
    const scrimOpacity = useTransform(progress, [0.3, 0.6], [0, 1])
    const line1 = useReveal(progress, 0.28)
    const line2 = useReveal(progress, 0.42)
    const highlight = useTransform(progress, [0.48, 0.58], ['0%', '100%'], { ease: easeOut })
    const sub = useReveal(progress, 0.56)
    const cta = useReveal(progress, 0.7)

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
                    c: hue < 0.2 ? '255,226,190' : hue < 0.55 ? '206,220,255' : '255,255,255',
                }
            })
        }

        const draw = () => {
            const p = progress.get()
            const sweep = SWEEP * easeOut(clamp01((p - 0.04) / 0.86))
            ctx.clearRect(0, 0, W, H)
            ctx.lineCap = 'round'
            for (const st of stars) {
                const a1 = st.a0 - sweep
                if (sweep > 0.002) {
                    ctx.strokeStyle = `rgba(${st.c},${st.al * 0.5})`
                    ctx.lineWidth = st.w
                    ctx.beginPath()
                    ctx.arc(cx, cy, st.r, a1, st.a0)
                    ctx.stroke()
                }
                ctx.fillStyle = `rgba(${st.c},${Math.min(1, st.al + 0.2)})`
                ctx.beginPath()
                ctx.arc(cx + Math.cos(a1) * st.r, cy + Math.sin(a1) * st.r, st.w * 0.9, 0, Math.PI * 2)
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
            <div
                ref={stageRef}
                className={`${reduceMotion ? 'relative min-h-dvh' : 'sticky top-0 h-dvh'} grid place-items-center overflow-hidden`}
            >
                <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
                <div className="relative isolate flex max-w-3xl flex-col items-center px-6 text-center">
                    <motion.div
                        aria-hidden
                        style={{ opacity: scrimOpacity }}
                        className="absolute top-[62%] left-1/2 -z-10 h-[120%] w-[min(860px,130vw)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgb(22_24_50/.72),rgb(22_24_50/.4)_55%,transparent)]"
                    />
                    <motion.div
                        ref={tileRef}
                        style={{ opacity: tileOpacity, scale: tileScale }}
                        className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl"
                    >
                        <Image src="/icon.svg" alt="App Icon" width={48} height={48} className="drop-shadow-lg" />
                    </motion.div>

                    <h3 className="mt-4 text-3xl font-bold tracking-tight break-keep text-white sm:text-5xl">
                        <motion.span style={line1} className="inline-block">
                            바탕화면 속 일정 관리
                        </motion.span>
                        <br />
                        <motion.span style={line2} className="relative isolate inline-block">
                            지금 바로 시작하세요
                            <motion.span
                                style={{ width: highlight }}
                                className="bg-brand/70 absolute bottom-1 left-0 -z-10 h-6"
                            />
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
