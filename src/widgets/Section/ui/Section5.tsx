'use client'

import { motion } from 'framer-motion'
import { DownloadButton } from '@/features/download'
import { VisualKeyboard } from '@/entities/keyboard'

export function Section5() {
    return (
        <section className="relative overflow-hidden py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="relative isolate px-6 py-12 text-center sm:px-16">
                    {/* <div className="group relative">
                        <div
                            className="relative z-10 mx-auto"
                            style={{
                                maskImage: 'radial-gradient(circle at center, black 20%, rgba(0, 0, 0, 0.5) 45%, transparent 70%)',
                                WebkitMaskImage: 'radial-gradient(circle at center, black 20%, rgba(0, 0, 0, 0.5) 45%, transparent 70%)'
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 30, rotateX: 12 }}
                                whileInView={{ opacity: 1, y: 0, rotateX: 8 }}
                                transition={{ duration: 1.2, ease: 'easeOut' }}
                                viewport={{ once: true }}
                                className="perspective-distant"
                            >
                                <VisualKeyboard />
                            </motion.div>
                        </div>
                    </div> */}

                    {/* 텍스트 섹션 */}
                    <div className="relative z-20 mt-[-20px]">
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
                            className="mx-auto mt-6 max-w-xl text-lg leading-8 tracking-tight text-gray-400"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            지금 바로 미리내를 설치하고 당신의 하루를 별처럼 빛내보세요.
                        </motion.p>

                        <motion.div
                            className="mt-10 flex items-center justify-center gap-x-6"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <DownloadButton />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}
