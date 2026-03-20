'use client'
import { motion } from 'motion/react'
import { DownloadButton } from '@/features/download'
import { ChevronDown } from 'lucide-react'
import { StarsBackground } from '@/entities/background'

const easeOutExpo = [0.22, 1, 0.36, 1] as const

export function Main() {
    return (
        <section className="relative overflow-hidden">
            {/* 배경 */}
            <div className="absolute inset-0 h-screen">
                <StarsBackground />
            </div>

            <motion.section className="relative flex w-full items-center justify-center" initial="hidden" animate="show">
                <div className="flex h-screen w-full flex-col items-center justify-center px-4 text-center">
                    <div className="flex flex-col items-center gap-4 md:gap-6">
                        <motion.h2
                            className="text-4xl font-semibold tracking-tighter text-white md:text-5xl"
                            variants={{
                                hidden: { y: 30, opacity: 0, filter: 'blur(10px)' },
                                show: {
                                    y: 0,
                                    opacity: 1,
                                    filter: 'blur(0px)',
                                    transition: { duration: 1.2, delay: 0.2, ease: easeOutExpo }
                                }
                            }}
                        >
                            당신의 하루를{' '}
                            <span className="bg-gradient-to-b from-white via-[#a4bdfc] to-[#7a96e8] bg-clip-text px-1 text-transparent drop-shadow-[0_0_12px_rgba(164,189,252,0.5)]">
                                별
                            </span>
                            처럼 빛나게
                        </motion.h2>
                    </div>

                    <motion.p
                        className="mt-6 max-w-[500px] text-lg tracking-tight text-white/60 md:text-xl"
                        variants={{
                            hidden: { y: 20, opacity: 0 },
                            show: {
                                y: 0,
                                opacity: 1,
                                transition: { duration: 1.2, delay: 0.6, ease: easeOutExpo }
                            }
                        }}
                    >
                        심플하고 아름다운 데스크톱 캘린더 위젯
                        <br />
                        하루의 일정을 바탕화면에서 관리하세요
                    </motion.p>

                    <motion.div
                        className="mt-6"
                        variants={{
                            hidden: { y: 20, opacity: 0 },
                            show: {
                                y: 0,
                                opacity: 1,
                                transition: { duration: 1.2, delay: 1.2, ease: easeOutExpo }
                            }
                        }}
                    >
                        <DownloadButton />
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="absolute bottom-12 left-1/2 -translate-x-1/2">
                        <ChevronDown className="animate-bounce text-white/30" size={60} />
                    </motion.div>
                </div>
            </motion.section>
        </section>
    )
}
