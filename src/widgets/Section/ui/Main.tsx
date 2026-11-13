'use client'
import { motion, MotionConfig, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import { DownloadButton } from '@/features/download'
import { ChevronDown } from 'lucide-react'
import { ConstellationCursor, StarsBackground } from '@/entities/background'
import { HighlightText } from '@/shared/ui/HighlightText'
import { HERO_TEXT_AT, HeroIcon } from './HeroIcon'

const easeOutExpo = [0.22, 1, 0.36, 1] as const

export function Main() {
    const iconRef = useRef<HTMLDivElement>(null)
    const at = useReducedMotion() ? 0 : HERO_TEXT_AT
    return (
        <section className="relative overflow-hidden">
            <div className="absolute inset-0 h-screen">
                <StarsBackground />
            </div>
            <ConstellationCursor />
            <HeroIcon iconRef={iconRef} />

            <MotionConfig reducedMotion="user">
                <motion.section className="relative flex w-full items-center justify-center" initial="hidden" animate="show">
                    <div className="flex h-screen w-full flex-col items-center justify-center px-4 text-center">
                        {/* 별 9개가 모여 아이콘이 되는 자리. 그림은 HeroIcon이 캔버스에 그린다 */}
                        <div ref={iconRef} aria-hidden className="mb-8 size-[72px] sm:size-24" />
                        <div className="flex flex-col items-center gap-4 md:gap-6">
                            <motion.h1
                                className="text-3xl font-semibold tracking-tighter whitespace-nowrap text-white sm:text-5xl"
                                variants={{
                                    hidden: { y: 30, opacity: 0, filter: 'blur(10px)' },
                                    show: {
                                        y: 0,
                                        opacity: 1,
                                        filter: 'blur(0px)',
                                        transition: { duration: 1.2, delay: at, ease: easeOutExpo }
                                    }
                                }}
                            >
                                바탕화면 캘린더 위젯, <br className="sm:hidden" />
                                <HighlightText delay={at + 0.6}>미리내</HighlightText>
                            </motion.h1>
                        </div>

                        <motion.h2
                            className="mt-6 max-w-[500px] text-lg tracking-tight text-white/60 md:text-xl"
                            variants={{
                                hidden: { y: 20, opacity: 0 },
                                show: {
                                    y: 0,
                                    opacity: 1,
                                    transition: { duration: 1.2, delay: at + 0.3, ease: easeOutExpo }
                                }
                            }}
                        >
                            심플한 윈도우 바탕화면 캘린더 위젯
                            <br />
                            하루의 일정을 바탕화면에서 관리하세요
                        </motion.h2>

                        <motion.div
                            className="mt-6"
                            variants={{
                                hidden: { y: 20, opacity: 0 },
                                show: { y: 0, opacity: 1, transition: { duration: 1.2, delay: at + 0.5, ease: easeOutExpo } }
                            }}
                        >
                            <DownloadButton />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: at + 1, duration: 1 }}
                            className="absolute bottom-12 left-1/2 -translate-x-1/2"
                        >
                            <ChevronDown className="animate-bounce text-white/30" size={60} />
                        </motion.div>
                    </div>
                </motion.section>
            </MotionConfig>
        </section>
    )
}
