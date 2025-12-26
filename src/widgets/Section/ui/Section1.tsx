'use client'
import { motion } from 'motion/react'
import Image from 'next/image'
export function Section1() {
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
                            {'직관적인 일정관리'}
                        </motion.h1>
                        <motion.p
                            className="mt-2 text-3xl font-bold tracking-tight whitespace-pre-line text-white sm:text-4xl"
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            {'바쁜 하루도 흐트러지지 않게'}
                        </motion.p>
                        <motion.p
                            className="text-text-secondary mt-6 text-lg leading-8 whitespace-pre-line"
                            initial={{ y: 24, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            viewport={{ once: true }}
                        >
                            수많은 할 일 속에서 길을 잃지 마세요.
                            <br />
                            미리내는 당신의 일정을 선별하여,
                            <br />
                            당신의 바탕화면에서 보여줍니다.
                        </motion.p>
                    </div>
                </div>
            </div>
            <motion.div className="abs" initial={{ opacity: 0, y: 0 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.2 }} viewport={{ once: true }}>
                <Image
                    src="/explain1.png"
                    width={1000}
                    height={1000}
                    alt="image"
                    quality={100}
                    className="absolute top-80 left-160 [mask-image:linear-gradient(to_right,black_40%,transparent_90%)]"
                />
            </motion.div>
        </motion.section>
    )
}
