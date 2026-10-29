'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { FeaturePiece, type PieceKey } from './FeaturePiece'

interface Feature {
    title: string
    description: string
    k: PieceKey
}
const features: Feature[] = [
    { title: '일정 추가', description: '날짜를 클릭하고 제목, 시간, 색상만 정하면 끝', k: 'add' },
    { title: '드래그로 옮기기', description: '일정을 끌어서 원하는 날짜로 바로 옮겨요', k: 'drag' },
    { title: '일정 완료', description: '끝낸 일정은 체크 한 번으로 완료 표시', k: 'done' },
    { title: '실행 취소', description: '완료, 삭제, 이동한 직후엔 바로 되돌릴 수 있어요', k: 'undo' },
    { title: '요약 패널', description: '오늘 일정과 다가오는 일정을 모아서 보여줘요', k: 'summary' },
    { title: '색상 필터', description: '업무, 개인, 약속 등 원하는 색만 골라 봐요', k: 'filter' },
    { title: '미니뷰', description: '캘린더를 작게 줄여 바탕화면 한쪽에 둘 수 있어요', k: 'mini' },
    { title: '투명도 조절', description: '배경화면이 비치는 정도를 직접 조절해요', k: 'opacity' },
    { title: '다크모드', description: '어두운 환경에서도 눈의 피로를 줄여줘요', k: 'dark' },
    { title: '표시할 캘린더', description: '공휴일처럼 구독 중인 캘린더도 함께 볼 수 있어요', k: 'calendars' }
]

function FeatureCard({ feature }: { feature: Feature }) {
    return (
        <article className="flex w-[80vw] shrink-0 snap-center flex-col gap-4 rounded-3xl bg-white/10 p-4 shadow-xl sm:w-[420px] lg:w-[min(480px,55vh)]">
            <FeaturePiece k={feature.k} />
            <div className="px-2 pb-2">
                <h3 className="text-2xl font-bold tracking-tight text-white">{feature.title}</h3>
                <p className="mt-2 text-base break-keep text-gray-300">{feature.description}</p>
            </div>
        </article>
    )
}

function AllFeaturesCard() {
    return (
        <Link
            href="/docs"
            className="group hover:border-brand/60 focus-visible:border-brand/60 flex w-[80vw] shrink-0 snap-center flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-white/20 p-8 text-center transition-colors duration-300 outline-none hover:border-solid hover:bg-white/5 focus-visible:border-solid focus-visible:bg-white/5 sm:w-[320px]"
        >
            <span className="text-2xl font-bold text-white">모든 기능 보기</span>
            <span className="text-sm text-gray-400 transition-colors duration-300 group-hover:text-gray-300">알림, 팔레트, 자동 실행까지</span>
            <span className="text-brand group-hover:bg-brand group-focus-visible:bg-brand mt-2 flex size-12 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 group-hover:text-[#111827] group-focus-visible:text-[#111827]">
                <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
        </Link>
    )
}

const heading = (
    <div className="px-6 lg:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
        <span className="text-brand text-base font-semibold">기능 둘러보기</span>
        <h2 className="mt-2 text-3xl font-bold tracking-tight break-keep text-white sm:text-5xl">바탕화면에서 바로, 이렇게 써요</h2>
    </div>
)

export function Section2() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
    const x = useTransform(scrollYProgress, (v) => `calc(${-v * 100}% + ${v * 100}vw)`)

    return (
        <>
            <section className="py-24 lg:hidden">
                {heading}
                <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none]">
                    {features.map((feature) => (
                        <FeatureCard key={feature.title} feature={feature} />
                    ))}
                    <AllFeaturesCard />
                </div>
            </section>

            <section ref={containerRef} className="relative hidden h-[500vh] lg:block">
                <div className="sticky top-0 flex h-screen flex-col justify-center gap-12 overflow-hidden">
                    {heading}
                    <motion.div style={{ x }} className="flex w-max gap-8 px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] will-change-transform">
                        {features.map((feature) => (
                            <FeatureCard key={feature.title} feature={feature} />
                        ))}
                        <AllFeaturesCard />
                    </motion.div>
                    <div className="mx-auto h-1 w-48 overflow-hidden rounded-full bg-white/10">
                        <motion.div style={{ scaleX: scrollYProgress }} className="bg-brand h-full origin-left" />
                    </div>
                </div>
            </section>
        </>
    )
}
