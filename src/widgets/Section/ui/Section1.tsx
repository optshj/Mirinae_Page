'use client'
import React, { useEffect, useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { MousePointer2, ChevronLeft, ChevronRight, Settings, RotateCcw, ChevronDown, ChevronUp, FoldVertical, Check, Plus, X } from 'lucide-react'
import { DesktopIcons } from '@/entities/icon'
import { PALETTE } from '@/shared/const/Palette'

const FULL_TITLE = '제주도 2박 3일 여행하기'

const DAYS = [28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7]

interface CalendarEvent {
    title: string
    time?: string
    colorClass: number
    isFullDay?: boolean
}
const EVENTS: Record<string, CalendarEvent[]> = {
    '31-prev': [{ title: '섣달 그믐날', colorClass: 9, isFullDay: true }],
    '1': [{ title: '새해첫날', colorClass: 9, isFullDay: true }],
    '7': [{ title: '자격증 공부하기', time: '8 AM', colorClass: 0 }],
    '13': [{ title: '사이드 프로젝트...', time: '8:10 PM', colorClass: 5 }],
    '27': [{ title: '농구 대회 결승!', time: '8 AM', colorClass: 6 }],
    '23': [{ title: '병원가서 진료...', time: '8 AM', colorClass: 10 }]
}

// --- Custom Hook for Demo Logic ---
const useCalendarDemo = (isInView: boolean) => {
    const [step, setStep] = useState(0)
    const [title, setTitle] = useState('')
    const [showList, setShowList] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [activeColor, setActiveColor] = useState(PALETTE[0])

    useEffect(() => {
        if (!isInView) {
            setStep(0)
            return
        }

        setStep(1)

        const mainTimer = setInterval(() => {
            setStep((prev) => (prev + 1) % 7)
        }, 3000)

        return () => clearInterval(mainTimer)
    }, [isInView])

    useEffect(() => {
        if (!isInView) {
            setTitle('')
            setActiveColor(PALETTE[0])
            setShowList(false)
            setShowForm(false)
            return
        }

        let typingInterval: NodeJS.Timeout
        let subTimeout: NodeJS.Timeout

        if (step === 0) {
            setTitle('')
            setActiveColor(PALETTE[0])
            setShowList(false)
            setShowForm(false)
        } else if (step === 1) {
            subTimeout = setTimeout(() => setShowList(true), 1000)
        } else if (step === 2) {
            subTimeout = setTimeout(() => setShowForm(true), 1000)
        } else if (step === 3) {
            subTimeout = setTimeout(() => {
                let i = 0
                typingInterval = setInterval(() => {
                    setTitle(FULL_TITLE.slice(0, i))
                    i++
                    if (i > FULL_TITLE.length) clearInterval(typingInterval)
                }, 80)
            }, 800)
        } else if (step === 5) {
            subTimeout = setTimeout(() => setActiveColor(PALETTE[2]), 800)
        }

        return () => {
            if (typingInterval) clearInterval(typingInterval)
            if (subTimeout) clearTimeout(subTimeout)
        }
    }, [step, isInView])

    const pointerPos = useMemo(() => {
        const positions: Record<number, { x: number; y: number }> = {
            0: { x: 0, y: 0 },
            1: { x: -100, y: 50 },
            2: { x: -30, y: 60 },
            3: { x: -50, y: 30 },
            4: { x: 0, y: 140 },
            5: { x: -30, y: 200 },
            6: { x: 100, y: 300 }
        }
        return positions[step] || { x: 350, y: 250 }
    }, [step])

    return { step, title, showList, showForm, activeColor, pointerPos }
}

const SummaryCard = ({ title, children, emptyMessage }: { title: string; children?: React.ReactNode; emptyMessage?: string }) => (
    <div className="flex flex-1 flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
            <span className="text-sm font-bold text-slate-900">{title}</span>
            <div className="flex gap-3 text-slate-400">
                <ChevronUp size={16} />
                <ChevronDown size={16} />
            </div>
        </div>
        <div className="flex flex-1 flex-col">
            {emptyMessage ? <div className="flex flex-1 items-center justify-center text-xs text-slate-400">{emptyMessage}</div> : <div className="space-y-5">{children}</div>}
        </div>
    </div>
)

const EventItem = ({ color, title, date }: { color: string; title: string; date: string }) => (
    <div className="flex items-start gap-3">
        <div className={`mt-1 h-2 w-2 rounded-full ${color}`} />
        <div>
            <div className="mb-1 text-sm leading-none font-bold text-slate-800">{title}</div>
            <div className="text-xs tracking-tight text-slate-400">{date}</div>
        </div>
    </div>
)
export const Section1 = () => {
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { amount: 0.3 })
    const { step, title, showList, showForm, activeColor, pointerPos } = useCalendarDemo(isInView)

    return (
        <section ref={containerRef} className="relative flex w-full flex-col items-center justify-center py-64">
            {/* Header Text */}
            <header className="relative z-20 mb-16 flex flex-col items-center text-center">
                <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-8 text-3xl font-light tracking-tight text-zinc-100 md:text-5xl"
                >
                    브라우저 대신 <br />
                    <span className="relative inline-block font-bold text-white">
                        바탕화면에서 바로
                        <motion.span
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-brand/70 absolute bottom-1 left-0 -z-10 h-6 w-full"
                        />
                    </span>
                </motion.h2>

                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="text-zinc-400">
                    찾아 들어가는 번거로움은 지우고 편리함만 남겼습니다. <br />
                    PC를 켜는 순간, 당신의 일정이 그 자리에서 시작됩니다.
                </motion.p>
            </header>

            {/* Desktop UI Simulation */}
            <DesktopIcons />

            {/* Main Calendar Widget */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative z-10 flex w-[900px] flex-col gap-2"
            >
                <div className="flex w-full flex-col gap-2 overflow-hidden rounded-2xl shadow-xl">
                    <CalendarHeader />
                    <CalendarGrid />
                </div>

                <div className="grid h-40 grid-cols-3 gap-2">
                    <SummaryCard title="오늘의 일정" emptyMessage="오늘의 일정이 없습니다" />
                    <SummaryCard title="다가오는 일정">
                        <EventItem color="bg-red-500" title="병원가서 진료받기" date="1월 23일 (금) 오전 8:00" />
                        <EventItem color="bg-cyan-500" title="농구 대회 결승!" date="1월 27일 (화) 오전 8:00" />
                    </SummaryCard>
                    <SummaryCard title="중요한 일정">
                        <EventItem color="bg-red-500" title="병원가서 진료받기" date="1월 23일 (금) 오전 8:00" />
                    </SummaryCard>
                </div>
            </motion.div>

            <AnimatePresence>
                {isInView && (
                    <motion.div
                        key="cursor-wrapper"
                        animate={{
                            opacity: step === 0 ? 0 : 1,
                            x: pointerPos.x,
                            y: pointerPos.y
                        }}
                        className="pointer-events-none absolute top-1/2 left-1/2 z-[100]"
                        transition={{
                            x: { type: 'spring', stiffness: 150, damping: 25 },
                            y: { type: 'spring', stiffness: 150, damping: 25 },
                            opacity: { duration: 0.3 }
                        }}
                    >
                        <motion.div
                            key={step}
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 0.75, 1] }}
                            transition={{
                                duration: 0.4,
                                times: [0, 0.5, 1],
                                delay: 0.5
                            }}
                        >
                            <MousePointer2 size={32} fill="#3B82F6" className="text-white drop-shadow-lg" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Popups */}
            <AnimatePresence mode="wait">
                {isInView && (showList || showForm) && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute z-40 w-80 rounded-2xl bg-white p-4 shadow-2xl"
                        style={{ top: '45%' }}
                    >
                        <div className="mb-4 flex items-center justify-between font-bold text-slate-800">
                            <span>1월 13일 일정</span>
                            <X size={16} className="text-slate-400" />
                        </div>
                        {showForm ? <AddEventForm step={step} title={title} activeColor={activeColor} /> : <EventListPopup />}
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
// --- Internal UI Parts (Split for clarity) ---

const CalendarHeader = () => (
    <div className="flex items-center justify-between rounded-xl bg-white px-6 py-4">
        <div className="flex items-center gap-6">
            <ChevronLeft className="text-slate-400" size={20} />
            <h2 className="text-lg font-bold">2026년 01월</h2>
            <ChevronRight className="text-slate-400" size={20} />
        </div>
        <div className="flex items-center gap-4 text-slate-800">
            <FoldVertical size={18} />
            <RotateCcw size={18} />
            <Settings size={18} />
        </div>
    </div>
)

const CalendarGrid = () => (
    <div className="flex-1 rounded-xl bg-white">
        <div className="mb-2 grid grid-cols-7 border-b border-slate-100 py-2 text-center text-sm font-bold">
            <div className="text-red-400">일</div>
            {['월', '화', '수', '목', '금'].map((d) => (
                <div key={d} className="text-slate-800">
                    {d}
                </div>
            ))}
            <div className="text-blue-400">토</div>
        </div>
        <div className="grid grid-cols-7">
            {DAYS.map((day, i) => {
                const isCurrent = i >= 4 && i <= 34
                const dayKey = i < 4 || i > 34 ? `${day}-prev` : `${day}`
                const dayEvents = EVENTS[dayKey] || []

                const isToday = isCurrent && day === 16
                return (
                    <div key={i} className={`min-h-20 border-r border-b border-slate-100 bg-white p-1`}>
                        <span className={`ml-1 text-xs font-bold ${isCurrent ? 'text-slate-900' : 'text-slate-400'} ${isToday ? 'bg-brand rounded-full p-1 text-white' : ''}`}>
                            {day}
                        </span>
                        {dayEvents.map((ev, idx) => {
                            const styles = PALETTE[ev.colorClass]
                            return (
                                <div
                                    key={idx}
                                    className={`relative flex items-center truncate rounded-sm px-2 py-1 text-xs font-semibold`}
                                    style={{ backgroundColor: `${styles}20`, color: styles }}
                                >
                                    <div className={`absolute top-0 bottom-0 left-0 w-1 rounded-l-sm`} style={{ backgroundColor: styles }} />
                                    <span className="flex items-center gap-1 truncate">
                                        {!ev.isFullDay && ev.time && ev.time + ' '}
                                        {ev.title}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    </div>
)

const EventListPopup = () => (
    <>
        <div className="space-y-2">
            <div className="flex items-center justify-between rounded-xl bg-orange-50 p-3">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-1 rounded-full" style={{ backgroundColor: PALETTE[5] }} />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium" style={{ color: PALETTE[5] }}>
                            사이드 프로젝트 회의
                        </span>
                        <span className="text-xs text-zinc-700">오전 8:10 ~ 오전 9:10</span>
                    </div>
                </div>
                <div className="flex gap-1 text-slate-400">
                    <Check size={14} />
                    <X size={14} />
                </div>
            </div>
            <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-3 text-sm text-slate-500 transition-colors">
                <Plus size={16} /> 일정 추가
            </button>
        </div>
    </>
)

const AddEventForm = ({ step, title, activeColor }: { step: number; title: string; activeColor: string }) => (
    <>
        <div className="space-y-2">
            <motion.label animate={{ color: activeColor }} className="text-xs font-bold">
                일정 제목
            </motion.label>
            <div
                className={`flex h-12 w-full items-center rounded-xl border-2 px-4 transition-all duration-500 ${step === 3 ? 'bg-zinc-50' : 'bg-white'}`}
                style={{ borderColor: step === 3 ? activeColor : '#F1F5F9' }}
            >
                <span className="text-sm font-medium text-zinc-600">{title}</span>
                {step === 3 && (
                    <motion.div
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: step >= 3 ? 0.4 : 0 }}
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

        {/* Time Slider Simulation */}
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
                    animate={{ left: step >= 4 ? '33%' : '20%', width: step >= 4 ? '25%' : '15%' }}
                    transition={{ delay: step >= 4 ? 0.8 : 0, duration: 0.8, ease: 'anticipate' }}
                />
            </div>
        </div>

        <div className="mt-8 grid grid-cols-6 gap-3">
            {PALETTE.map((color, i) => {
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
                    scale: step === 6 ? [1, 0.95, 1] : 1,
                    backgroundColor: activeColor
                }}
                transition={{
                    scale: { duration: 0.2, delay: step >= 4 ? 0.6 : 0 }
                }}
                className="flex-1 rounded-xl py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition-colors"
            >
                추가
            </motion.button>
        </div>
    </>
)
