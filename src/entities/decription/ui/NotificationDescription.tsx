'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'motion/react'
import Image from 'next/image'
import { ChevronUp, Wifi, Volume2 } from 'lucide-react'
import { DemoWrapper } from './_shared'

export const NotificationDescription = () => {
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { amount: 0.4 })
    const [step, setStep] = useState(0)

    useEffect(() => {
        if (!isInView) {
            setStep(0)
            return
        }
        setStep(1)
        const timer = setInterval(() => setStep((p) => (p + 1) % 4), 1600)
        return () => clearInterval(timer)
    }, [isInView])

    // 대부분 떠있고 잠깐만 사라졌다 다시 오도록 (알림이 "나타나는" 순간에 무게를 둠)
    const toastShown = step !== 0

    return (
        <div ref={containerRef} className="w-full">
            <DemoWrapper>
                <div className="relative flex h-[220px] w-full max-w-[420px] flex-col justify-end overflow-hidden rounded-2xl bg-[#1a1a2e] shadow-xl">
                    {/* 실제로는 OS가 띄우는 네이티브 토스트라 영상으로는 못 담아서, 여기서 흉내 냅니다 */}
                    <AnimatePresence>
                        {toastShown && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 6 }}
                                transition={{ duration: 0.25, ease: 'easeOut' }}
                                className="absolute right-3 bottom-12 w-52 rounded-lg border border-white/10 bg-[#2c2c2c] p-3 shadow-2xl"
                            >
                                <div className="flex items-center gap-1.5">
                                    <Image src="/icon.svg" alt="미리내" width={14} height={14} className="shrink-0 rounded-[3px]" />
                                    <span className="text-[10px] font-medium text-zinc-400">미리내</span>
                                    <span className="ml-auto text-[10px] text-zinc-500">지금</span>
                                </div>
                                <p className="mt-1.5 truncate text-[13px] font-semibold text-zinc-100">사이드 프로젝트 회의</p>
                                <p className="text-[12px] text-zinc-400">10분 후 시작</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Taskbar */}
                    <div className="flex h-9 w-full items-center justify-end gap-3 border-t border-white/10 bg-zinc-900/80 px-3 text-zinc-300">
                        <ChevronUp size={14} />
                        <Wifi size={14} />
                        <Volume2 size={14} />
                        <span className="text-[11px]">오후 2:41</span>
                    </div>
                </div>
            </DemoWrapper>
        </div>
    )
}
