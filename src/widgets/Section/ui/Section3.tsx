'use client'
import { Customize } from '@/entities/decription'
import { motion } from 'motion/react'

export function Section3() {
    return (
        <motion.section className={`relative h-[1200px] py-20 sm:py-32`}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pt-4 lg:pr-8">
                        <div className="lg:max-w-lg">
                            <motion.h1
                                className="text-brand text-base leading-7 font-semibold"
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                {'자유로운 커스터마이징'}  
                            </motion.h1>
                            <motion.p
                                className="mt-2 text-3xl font-bold tracking-tight whitespace-pre-line text-white sm:text-4xl"
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                {'원하는대로 자유롭게 설정하세요'}  
                            </motion.p>
                            <motion.p
                                className="text-text-secondary mt-6 text-lg leading-8 whitespace-pre-line"
                                initial={{ y: 24, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                viewport={{ once: true }}
                            >
                                위젯의 위치와 크기, 투명도부터 테마 색상까지.
                                <br />
                                당신의 데스크톱 환경에 가장 완벽하게 어울리는 모습으로 직접 디자인하고 배치할 수 있습니다.
                            </motion.p>
                        </div>
                    </div>
                    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }} viewport={{ once: true }}>
                        <Customize />
                    </motion.div>
                </div>
            </div>
        </motion.section>
    )
}
