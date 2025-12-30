'use client'

import { motion } from 'motion/react'
import { DownloadButton } from '@/features/download'

export function Section5() {
    return (
        <section className="relative py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="bg-glass relative isolate overflow-hidden rounded-3xl px-6 py-24 text-center shadow-2xl sm:px-16">
                    <motion.h2
                        className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        더 이상 일정을 놓치지 마세요.
                    </motion.h2>
                    <motion.p
                        className="text-text-secondary mx-auto mt-6 max-w-xl text-lg leading-8 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        지금 바로 미리내를 설치하고 당신의 하루를 별처럼 빛내보세요.
                    </motion.p>
                    <motion.div
                        className="mt-10 flex items-center justify-center gap-x-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <DownloadButton />
                    </motion.div>

                    {/* 배경 장식 효과 */}
                    <svg
                        viewBox="0 0 1024 1024"
                        className="absolute top-1/2 left-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                        aria-hidden="true"
                    >
                        <circle cx="512" cy="512" r="512" fill="url(#brand-gradient)" fillOpacity="0.15" />
                        <defs>
                            <radialGradient id="brand-gradient">
                                <stop stopColor="#6366f1" />
                                <stop offset={1} stopColor="#a855f7" />
                            </radialGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </section>
    )
}
