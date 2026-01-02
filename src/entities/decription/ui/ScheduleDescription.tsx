'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MousePointer2, Check } from 'lucide-react'

export const ScheduleDescription = () => {
    const [step, setStep] = useState(0)
    const [title, setTitle] = useState('')
    const [activeColor, setActiveColor] = useState('#AEC6FF')

    const fullTitle = '제주도 2박 3일 여행하기'
    const colors = ['#AEC6FF', '#74EBD5', '#D6A4FF', '#FF8A7A', '#FFD966', '#FFB385', '#57D9D9', '#E0E0E0', '#5E81F4', '#47B347', '#D11A1A']

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % 5)
        }, 3000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        if (step === 1) {
            let i = 0
            const typingTimer = setTimeout(() => {
                const typing = setInterval(() => {
                    setTitle(fullTitle.slice(0, i))
                    i++
                    if (i > fullTitle.length) clearInterval(typing)
                }, 100)
                return () => clearInterval(typing)
            }, 1200)
            return () => clearTimeout(typingTimer)
        } else if (step === 3) {
            const colorTimer = setTimeout(() => setActiveColor('#D6A4FF'), 1200)
            return () => clearTimeout(colorTimer)
        } else if (step === 0) {
            setTitle('')
            setActiveColor('#AEC6FF')
        }
    }, [step])

    return (
        <div className="relative flex h-full w-full items-center justify-center p-4">
            <motion.div
                className="pointer-events-none absolute z-50 flex items-center justify-center"
                animate={{
                    x: step === 1 ? -80 : step === 2 ? 0 : step === 3 ? -20 : step === 4 ? 95 : 0,
                    y: step === 1 ? -80 : step === 2 ? 20 : step === 3 ? 90 : step === 4 ? 195 : 0,
                    opacity: step === 0 ? 0 : 1,
                    scale: step === 0 ? 1 : [1, 0.8, 1]
                }}
                transition={{
                    x: { duration: 1, ease: 'easeInOut' },
                    y: { duration: 1, ease: 'easeInOut' },
                    opacity: { duration: 0.5 },
                    scale: { duration: 0.2, times: [0, 0.5, 1], delay: 1 }
                }}
            >
                <MousePointer2 size={24} fill={activeColor} className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" style={{ strokeWidth: '2' }} />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[340px] rounded-2xl border border-zinc-100 bg-white p-6 shadow-2xl"
            >
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-md font-bold text-zinc-800">1월 14일 일정</h3>
                    <div className="text-zinc-400">✕</div>
                </div>

                <div className="space-y-2">
                    <motion.label animate={{ color: activeColor }} className="text-xs font-bold">
                        일정 제목
                    </motion.label>
                    <div
                        className={`flex h-12 w-full items-center rounded-xl border-2 px-4 transition-all duration-500 ${step === 1 ? 'bg-zinc-50' : 'bg-white'}`}
                        style={{ borderColor: step === 1 ? activeColor : '#F1F5F9' }}
                    >
                        <span className="text-sm font-medium text-zinc-600">{title}</span>
                        {step === 1 && (
                            <motion.div
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="ml-0.5 h-4 w-0.5"
                                style={{ backgroundColor: activeColor }}
                            />
                        )}
                        {title === '' && <span className="text-sm text-zinc-300">일정을 입력해주세요</span>}
                    </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                    <motion.span animate={{ color: activeColor }} className="text-xs font-medium">
                        하루종일
                    </motion.span>
                    <div className="h-6 w-11 rounded-full bg-zinc-200 p-1">
                        <div className="h-4 w-4 rounded-full bg-white shadow-sm" />
                    </div>
                </div>

                <div className="mt-2">
                    <motion.span animate={{ color: activeColor }} className="text-xs font-medium">
                        시간
                    </motion.span>
                    <div className="relative mt-2 h-6 w-full rounded-full bg-zinc-100">
                        <div className="absolute inset-0 flex items-center justify-between px-2 text-[10px] font-medium text-zinc-400">
                            {['00', '06', '12', '18', '24'].map((time) => (
                                <span key={time}>{time}</span>
                            ))}
                        </div>
                        <motion.div
                            className="absolute top-1/2 flex h-5 -translate-y-1/2 items-center justify-center rounded-full shadow-lg transition-colors duration-500"
                            style={{ backgroundColor: activeColor }}
                            animate={{ left: step >= 2 ? '33%' : '20%', width: step >= 2 ? '25%' : '15%' }}
                            transition={{ delay: step >= 2 ? 1.2 : 0, duration: 0.8, ease: 'anticipate' }}
                        />
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-6 gap-3">
                    {colors.map((color, i) => {
                        const isSelected = activeColor === color
                        return (
                            <motion.div
                                key={i}
                                className={`h-6 w-6 rounded-full`}
                                style={{
                                    backgroundColor: color,
                                    boxShadow: isSelected ? `0 0 10px ${color}80` : 'none'
                                }}
                                animate={{ scale: isSelected ? [1, 1.2, 1] : 1 }}
                                transition={{ scale: { duration: 0.5 } }}
                            >
                                <AnimatePresence>
                                    {isSelected && (
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="flex h-full w-full items-center justify-center text-white"
                                        >
                                            <Check size={12} strokeWidth={3} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )
                    })}
                </div>

                <div className="mt-8 flex gap-3">
                    <button className="flex-1 rounded-xl bg-zinc-100 py-3 text-sm font-bold text-zinc-500">취소</button>
                    <motion.button
                        animate={{
                            scale: step === 4 ? [1, 0.95, 1] : 1,
                            backgroundColor: activeColor
                        }}
                        transition={{
                            scale: { duration: 0.2, delay: step >= 4 ? 1.2 : 0 }
                        }}
                        className="flex-1 rounded-xl py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition-colors"
                    >
                        추가
                    </motion.button>
                </div>
            </motion.div>
        </div>
    )
}
