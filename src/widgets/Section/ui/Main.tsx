'use client'
import { motion } from 'motion/react'
import { DownloadButton } from '@/features/download'
import { ChevronDown } from 'lucide-react'
import { sectionVariants, titleVariants, paragraphVariants, buttonVariants } from './Main.animate'
import { StarsBackground } from '@/entities/background'

export function Main() {
    return (
        <div className="relative">
            <div className="h-screen">
                <StarsBackground />
            </div>
            <motion.section className="absolute top-0 left-0 flex w-full items-center justify-between" variants={sectionVariants} initial="hidden" animate="show">
                <div className="flex h-screen w-full flex-col items-center justify-center">
                    <motion.h1 className="text-5xl font-bold tracking-tighter text-white" variants={titleVariants}>
                        당신의 하루를 별처럼 빛나게
                    </motion.h1>

                    <motion.div className="mt-4" variants={paragraphVariants}>
                        <p className="text-text-secondary text-lg tracking-tighter">심플하고 아름다운 데스크톱 캘린더 위젯, 하루의 일정을 한눈에 관리하세요.</p>
                    </motion.div>

                    <motion.div className="mt-4" variants={buttonVariants}>
                        <DownloadButton />
                    </motion.div>

                    <ChevronDown className="text-text-secondary absolute bottom-0 animate-bounce" size={48} />
                </div>
            </motion.section>
        </div>
    )
}
