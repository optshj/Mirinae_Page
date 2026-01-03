'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { DownloadButton } from '@/features/download'

export function Section4() {
    return (
        <section className="relative isolate mx-auto max-w-7xl overflow-hidden px-6 py-32 sm:py-56 lg:px-8">
            <div className="flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl"
                >
                    <Image src="/icon.svg" alt="App Icon" width={48} height={48} className="drop-shadow-lg" />
                </motion.div>

                <motion.h3
                    className="mt-4 text-5xl font-bold tracking-tight text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    바탕화면 속 새로운 경험
                    <br />
                    <span className="from-brand to-brand bg-gradient-to-r via-purple-300 bg-clip-text text-transparent">지금 시작하세요</span>
                </motion.h3>

                <motion.p
                    className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    복잡한 설정 없이 설치만으로 완성되는 나만의 생산성 도구.
                </motion.p>

                <motion.div
                    className="mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <DownloadButton />
                </motion.div>
            </div>
        </section>
    )
}
