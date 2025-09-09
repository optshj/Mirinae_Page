'use client'
import { motion } from 'motion/react'
import Image from 'next/image'

export function Section2() {
    return (
        <motion.section className={`relative h-[1200px] py-20 sm:py-32`}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="lg:pt-4 lg:pr-8">
                    <div className="lg:max-w-lg">
                        <motion.h1
                            className="text-brand text-base leading-7 font-semibold"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            {'간편한 일정추가'}
                        </motion.h1>
                        <motion.p
                            className="mt-2 text-3xl font-bold tracking-tight whitespace-pre-line text-white sm:text-4xl"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            {'반짝였을 때 추가하세요'}
                        </motion.p>
                        <motion.p
                            className="text-text-secondary mt-6 text-lg leading-8 whitespace-pre-line"
                            initial={{ y: 24, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            viewport={{ once: true }}
                        >
                            영감이 스쳐 지나가는 순간, 중요한 약속이 떠오른 바로 그 때.
                            <br /> 쉽고 간편하게 일정을 추가하고 관리할 수 있습니다.
                        </motion.p>
                    </div>
                </div>
            </div>
            <motion.div className="abs" initial={{ opacity: 0, y: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }} viewport={{ once: true }}>
                <Image src="/explain2.png" width={600} height={1200} alt="image" quality={100} className="absolute top-60 left-220" />
            </motion.div>
        </motion.section>
    )
}
