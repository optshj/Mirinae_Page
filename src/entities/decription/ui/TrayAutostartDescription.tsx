'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'motion/react'
import Image from 'next/image'
import { Check, ChevronUp, ChevronRight, Wifi, Volume2 } from 'lucide-react'
import { DemoWrapper } from './_shared'

export const TrayAutostartDescription = () => {
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { amount: 0.4 })
    const [step, setStep] = useState(0)

    useEffect(() => {
        if (!isInView) {
            setStep(0)
            return
        }
        setStep(1)
        const timer = setInterval(() => setStep((p) => (p + 1) % 4), 2000)
        return () => clearInterval(timer)
    }, [isInView])

    const menuOpen = step >= 1
    const submenuOpen = step >= 2
    const checked = step === 3

    return (
        <div ref={containerRef} className="w-full">
            <DemoWrapper>
                <div className="relative flex h-[220px] w-full max-w-[420px] flex-col justify-end overflow-hidden rounded-2xl bg-[#1a1a2e] shadow-xl">
                    <AnimatePresence>
                        {menuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute right-4 bottom-12 w-32 rounded-lg bg-zinc-800 p-1.5 text-xs text-zinc-200 shadow-2xl ring-1 ring-white/10"
                            >
                                <div className="flex items-center justify-between rounded px-2 py-1.5 hover:bg-white/10">
                                    <span>열기</span>
                                </div>
                                <div className={`flex items-center justify-between rounded px-2 py-1.5 ${submenuOpen ? 'bg-white/10' : ''}`}>
                                    <span>시작 설정</span>
                                    <ChevronRight size={12} />
                                </div>
                                <div className="flex items-center justify-between rounded px-2 py-1.5 hover:bg-white/10">
                                    <span>위치 초기화</span>
                                </div>
                                <div className="flex items-center justify-between rounded px-2 py-1.5 hover:bg-white/10">
                                    <span>종료</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {submenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute right-40 bottom-12 w-36 rounded-lg bg-zinc-800 p-1.5 text-xs text-zinc-200 shadow-2xl ring-1 ring-white/10"
                            >
                                <div className="flex items-center justify-between rounded bg-white/10 px-2 py-1.5">
                                    <motion.div
                                        className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm"
                                        animate={{ scale: checked ? [1, 1.2, 1] : 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {checked && <Check size={10} strokeWidth={3} className="text-zinc-200" />}
                                    </motion.div>
                                    <span>로그인 시 미리내 실행</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Taskbar */}
                    <div className="flex h-9 w-full items-center justify-end gap-3 border-t border-white/10 bg-zinc-900/80 px-3 text-zinc-300">
                        <ChevronUp size={14} />
                        <Wifi size={14} />
                        <Volume2 size={14} />
                        <motion.div animate={{ scale: step === 1 ? [1, 1.2, 1] : 1 }} className="flex h-5 w-5 items-center justify-center rounded">
                            <Image src="/icon.svg" alt="미리내 트레이 아이콘" width={16} height={16} />
                        </motion.div>
                        <span className="text-[11px]">오후 2:41</span>
                    </div>
                </div>
            </DemoWrapper>
        </div>
    )
}
