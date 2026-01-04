'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Moon, Sun, Sliders, Move, ChevronLeft, ChevronRight } from 'lucide-react'

export const CustomizationDescription = () => {
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { amount: 0.3 })

    const [theme, setTheme] = useState<'dark' | 'light'>('dark')
    const [opacity, setOpacity] = useState(1.0)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isExpanded, setIsExpanded] = useState(true)

    useEffect(() => {
        // 1. 화면에 보이지 않으면 상태를 초기화하고 인터벌 중단
        if (!isInView) {
            setTheme('dark')
            setOpacity(1.0)
            setPosition({ x: 0, y: 0 })
            setIsExpanded(true)
            return
        }

        // 2. 화면에 보이는 순간 즉시 로직 실행
        const interval = setInterval(() => {
            setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
            setOpacity(Math.random() * 0.3 + 0.7)
            setPosition({
                x: (Math.random() - 0.5) * 30,
                y: (Math.random() - 0.5) * 30
            })
            setIsExpanded((prev) => (Math.random() > 0.5 ? !prev : prev))
        }, 2500)

        return () => clearInterval(interval)
    }, [isInView]) // isInView가 바뀔 때마다 실행/해제

    const days = Array.from({ length: 35 }, (_, i) => i - 3)

    return (
        <div ref={containerRef} className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden p-8">
            {/* 상단 설정 바 */}
            <div className="absolute top-20 flex w-full max-w-lg items-center justify-between px-6">
                <div className="flex items-center gap-3">
                    <Sliders size={18} className="text-white" />
                    <div className="h-1 w-20 overflow-hidden rounded-full bg-zinc-500">
                        <motion.div animate={{ width: `${opacity * 100}%` }} className="bg-brand h-full transition-all" />
                    </div>
                </div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors ${
                        isExpanded ? 'border-brand/30 bg-brand/10 text-brand' : 'border-zinc-700 bg-zinc-800/50 text-zinc-500'
                    }`}
                >
                    <div className="relative flex h-2 w-2">
                        {isExpanded && <span className="bg-brand absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>}
                        <span className={`inline-flex h-2 w-2 rounded-full ${isExpanded ? 'bg-brand' : 'bg-zinc-600'}`}></span>
                    </div>
                    <span className="text-xs font-bold tracking-wider uppercase">{isExpanded ? 'Full View' : 'Minimal'}</span>
                </motion.div>

                <div className="flex w-[110px] items-center gap-2 text-white">
                    <Move size={18} />
                    <span className="text-xs">
                        X : {Math.round(position.x)} Y : {Math.round(position.y)}
                    </span>
                </div>
            </div>

            <motion.div
                animate={{
                    x: position.x,
                    y: position.y,
                    opacity: opacity
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                className="z-10 flex flex-col items-center gap-1"
            >
                <div className={`w-72 overflow-hidden rounded-2xl p-4 shadow-lg transition-colors duration-500 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}>
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <ChevronLeft size={14} className={` ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`} />
                            <div className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>2026년 1월</div>
                            <ChevronRight size={14} className={` ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`} />
                        </div>

                        <motion.div animate={{ rotate: theme === 'dark' ? 0 : 180 }} className={`${theme === 'dark' ? 'text-gray-500' : 'text-yellow-400'}`}>
                            {theme === 'dark' ? <Moon size={14} fill="currentColor" /> : <Sun size={14} fill="currentColor" />}
                        </motion.div>
                    </div>

                    <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs font-medium text-zinc-500">
                        <div className="text-red-400">일</div>
                        {['월', '화', '수', '목', '금'].map((day, i) => (
                            <div key={i}>{day}</div>
                        ))}
                        <div className="text-blue-400">토</div>
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                        {days.map((day, i) => {
                            const isToday = day === 14
                            const hasEvent = day === 10 || day === 21

                            return (
                                <div key={i} className="relative flex h-8 items-center justify-center">
                                    <span
                                        className={`relative z-10 text-xs font-medium ${
                                            day <= 0 ? 'text-zinc-600' : isToday ? 'text-white' : theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
                                        }`}
                                    >
                                        {day <= 0 ? '' : day}
                                    </span>

                                    {isToday && <div className="bg-brand absolute h-6 w-6 rounded-full" />}

                                    {hasEvent && day > 0 && (
                                        <div className="absolute bottom-0.5 flex gap-0.5">
                                            <div className="h-1 w-1 rounded-full bg-blue-400" />
                                            <div className="h-1 w-1 rounded-full bg-purple-400" />
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* 하단 확장 섹션 */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ height: 'auto', opacity: 1, y: 0, scale: 1 }}
                            exit={{ height: 0, opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ type: 'spring', duration: 0.6, bounce: 0.4 }}
                        >
                            <div className="grid w-72 grid-cols-3 gap-1">
                                {[0, 1, 2].map((i) => (
                                    <div
                                        key={i}
                                        className={`flex flex-col gap-2 rounded-[10px] p-3 shadow-lg transition-colors hover:shadow-2xl ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}
                                    >
                                        <div className={`h-1 w-full rounded-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-300'}`} />
                                        <div className={`h-1 w-2/3 rounded-full ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'}`} />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}
