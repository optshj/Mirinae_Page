'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

interface Feature {
    id: number
    subTitle: string
    title: string
    description: string
    visual: React.ReactNode
}
const features: Feature[] = [
    {
        id: 1,
        subTitle: '바쁜 하루도 흐트러지지 않게',
        title: '간편한 일정 등록',
        description: '복잡한 과정 없이, 직관적인 폼으로 빠르게 일정을 등록하세요.\n중요한 순간을 놓치지 않도록 도와줍니다.',
        visual: <span className="text-gray-400">일정 폼 GIF (Placeholder)</span>
    },
    {
        id: 2,
        subTitle: '빠르게, 편하게',
        title: '단축키 지원',
        description: '마우스에 손을 뻗을 필요 없이,\n단축키로 빠르게 새 일정을 만들어보세요.',
        visual: <span className="text-gray-400">단축키 GIF (Placeholder)</span>
    },
    {
        id: 3,
        subTitle: '원하는대로 자유롭게 설정',
        title: '다크모드 & 커스터마이징',
        description: '눈이 편안한 다크모드부터,\n투명도와 위치 조절까지 내 스타일대로 설정하세요.',
        visual: <span className="text-gray-400">다크모드 & 커스터마이징 GIF (Placeholder)</span>
    }
]

export function Section2() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    })

    return (
        <section ref={containerRef} className="relative h-[300vh]">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <div className="mx-auto grid h-3/4 w-full max-w-7xl grid-cols-1 gap-8 px-6 lg:grid-cols-2">
                    <div className="relative">
                        {features.map((feature, index) => (
                            <FeatureText key={feature.id} feature={feature} scrollYProgress={scrollYProgress} index={index} total={features.length} />
                        ))}
                    </div>
                    <div className="relative flex items-center justify-center">
                        {features.map((feature, index) => (
                            <FeatureVisual key={feature.id} feature={feature} scrollYProgress={scrollYProgress} index={index} total={features.length} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
function FeatureText({ feature, scrollYProgress, index, total }: { feature: Feature; scrollYProgress: MotionValue<number>; index: number; total: number }) {
    const start = index / total
    const end = (index + 1) / total

    const isFirst = index === 0
    const isLast = index === total - 1

    const scrollOpacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0])
    const scrollY = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [isFirst ? 0 : 50, 0, 0, isLast ? 0 : -100])

    const initialOpacity = isFirst ? { opacity: 0, y: 30 } : false
    const whileInView = isFirst ? { opacity: 1, y: 0 } : {}
    const transition = isFirst ? { duration: 0.8 } : {}
    const viewport = isFirst ? { once: true } : {}

    return (
        <motion.div className="absolute inset-0 flex flex-col justify-center p-8" style={{ opacity: scrollOpacity, y: scrollY }}>
            <div className="lg:max-w-lg">
                <motion.span
                    className="pointer-events-none absolute top-1/4 left-4 -translate-y-1/2 text-[12rem] font-black text-white/[0.03] select-none"
                    initial={initialOpacity}
                    whileInView={whileInView}
                    transition={transition}
                    viewport={viewport}
                >
                    {feature.id}
                </motion.span>
                <motion.h1 className="text-brand text-base leading-7 font-semibold" initial={initialOpacity} whileInView={whileInView} transition={transition} viewport={viewport}>
                    {feature.subTitle}
                </motion.h1>
                <motion.p
                    className="mt-2 text-3xl font-bold tracking-tight whitespace-pre-line text-white sm:text-5xl"
                    initial={initialOpacity}
                    whileInView={whileInView}
                    transition={{ ...transition, delay: 0.2 }}
                    viewport={viewport}
                >
                    {feature.title}
                </motion.p>
                <motion.p
                    className="mt-6 text-lg leading-8 whitespace-pre-line text-gray-400"
                    initial={initialOpacity}
                    whileInView={whileInView}
                    transition={{ ...transition, delay: 0.4 }}
                    viewport={viewport}
                >
                    {feature.description}
                </motion.p>
            </div>
        </motion.div>
    )
}
function FeatureVisual({ feature, scrollYProgress, index, total }: { feature: Feature; scrollYProgress: MotionValue<number>; index: number; total: number }) {
    const start = index / total
    const end = (index + 1) / total

    const isFirst = index === 0
    const isLast = index === total - 1

    const backgroundOpacity = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0])
    const contentOpacity = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0])
    const contentY = useTransform(scrollYProgress, [start, start + 0.1, end - 0.1, end], [isFirst ? 0 : 40, 0, 0, isLast ? 0 : -100])

    return (
        <div className="absolute flex aspect-square h-full w-full max-w-md items-center justify-center p-6">
            <motion.div
                className="relative flex h-full w-full items-center justify-center rounded-2xl bg-zinc-700"
                style={{ opacity: backgroundOpacity }}
                initial={isFirst ? { opacity: 0, y: 30 } : false}
                whileInView={isFirst ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <motion.div
                    className="z-50"
                    style={{
                        opacity: contentOpacity,
                        y: contentY
                    }}
                >
                    {feature.visual}
                </motion.div>
            </motion.div>
        </div>
    )
}
