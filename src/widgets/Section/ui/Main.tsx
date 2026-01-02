'use client'
import { motion } from 'motion/react'
import { DownloadButton } from '@/features/download'
import { ChevronDown } from 'lucide-react'
import { StarsBackground } from '@/entities/background'

const easeOutExpo = [0.22, 1, 0.36, 1] as const

export function Main() {
    return (
        <div className="relative">
            <div className="h-screen">
                <StarsBackground />
            </div>
            <motion.section className="absolute top-0 left-0 flex w-full items-center justify-between" initial="hidden" animate="show">
                <div className="flex h-screen w-full flex-col items-center justify-center">
                    <motion.h1
                        className="text-5xl font-bold tracking-tighter text-white"
                        variants={{
                            hidden: { y: 24, opacity: 0 },
                            show: {
                                y: 0,
                                opacity: 1,
                                transition: { duration: 1.6, ease: easeOutExpo }
                            }
                        }}
                    >
                        당신의 하루를 별처럼 빛나게
                    </motion.h1>

                    <motion.p
                        className="text-text-secondary mt-4 text-lg tracking-tighter"
                        variants={{
                            hidden: { y: 24, opacity: 0 },
                            show: {
                                y: 0,
                                opacity: 1,
                                transition: { duration: 1.6, delay: 0.8, ease: easeOutExpo }
                            }
                        }}
                    >
                        심플하고 아름다운 데스크톱 캘린더 위젯, 하루의 일정을 한눈에 관리하세요.
                    </motion.p>

                    <motion.div
                        className="mt-4"
                        variants={{
                            hidden: { y: 24, opacity: 0 },
                            show: {
                                y: 0,
                                opacity: 1,
                                transition: { duration: 1.6, delay: 1.6, ease: easeOutExpo }
                            }
                        }}
                    >
                        <DownloadButton />
                    </motion.div>

                    <ChevronDown className="text-text-secondary absolute bottom-0 animate-bounce" size={48} />
                </div>
            </motion.section>
        </div>
    )
}
