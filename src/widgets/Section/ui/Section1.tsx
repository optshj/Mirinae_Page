'use client'
import React, { useEffect, useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'motion/react'
import {
    MousePointer2,
    ChevronLeft,
    ChevronRight,
    Settings,
    RotateCw,
    ChevronDown,
    FoldVertical,
    Minimize2,
    CalendarCheck2,
    CircleHelp,
    Check,
    Plus,
    Minus,
    X,
    Calendar,
    AlarmClock,
    AlarmClockOff,
    ArrowRight,
    LayoutGrid,
    Search,
    Folder,
    Globe,
    Mail,
    CalendarDays,
    Wifi,
    Volume2,
    BatteryFull,
    ChevronUp,
    Trash2,
    HardDrive,
    FileText,
    Image as ImageIcon,
    Music,
    Gamepad2
} from 'lucide-react'
import { HighlightText } from '@/shared/ui/HighlightText'
import { cn } from '@/shared/lib/utils'

const FULL_TITLE = '제주도 2박 3일 여행하기'

// 실제 앱(mirinae) 기본 팔레트(pastel)의 event-color-1~11
const EVENT_COLORS = ['#b2c4f7', '#9edfca', '#e0c7f5', '#f7a399', '#f7e096', '#f7c9a1', '#8fd8db', '#cbcbd1', '#8aa7e8', '#8eca89', '#d65a5e']

// 2026년 1월: 12/28(일)부터 6주
const WEEKS = Array.from({ length: 6 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
        const offset = w * 7 + d - 4
        return {
            date: offset < 0 ? 32 + offset : offset >= 31 ? offset - 30 : offset + 1,
            isCurrentMonth: offset >= 0 && offset < 31,
            isSunday: d === 0
        }
    })
)
const TODAY = 16
const HOLIDAYS: Record<number, string> = { 1: '신정' }

interface CalendarEvent {
    title: string
    time: string
    color: number
}
const EVENTS: Record<number, CalendarEvent[]> = {
    7: [{ title: '자격증 공부하기', time: '08:00', color: 0 }],
    13: [{ title: '사이드 프로젝트 회의', time: '08:10', color: 5 }],
    23: [{ title: '병원가서 진료받기', time: '08:00', color: 10 }],
    27: [{ title: '농구 대회 결승!', time: '08:00', color: 6 }]
}

// --- Custom Hook for Demo Logic ---
const useCalendarDemo = (isInView: boolean) => {
    const [step, setStep] = useState(0)
    const [title, setTitle] = useState('')
    const [showList, setShowList] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [activeColor, setActiveColor] = useState(EVENT_COLORS[0])

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
            setActiveColor(EVENT_COLORS[0])
            setShowList(false)
            setShowForm(false)
            setShowToast(false)
            return
        }

        let typingInterval: NodeJS.Timeout
        let subTimeout: NodeJS.Timeout

        if (step === 0) {
            setShowToast(false)
            setTitle('')
            setActiveColor(EVENT_COLORS[0])
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
            subTimeout = setTimeout(() => setActiveColor(EVENT_COLORS[6]), 800)
        } else if (step === 6) {
            // 추가 버튼이 눌린 뒤 팝업을 닫는다
            subTimeout = setTimeout(() => {
                setShowList(false)
                setShowForm(false)
                setShowToast(true)
            }, 1000)
        }

        return () => {
            if (typingInterval) clearInterval(typingInterval)
            if (subTimeout) clearTimeout(subTimeout)
        }
    }, [step, isInView])

    const pointerPos = useMemo(() => {
        const positions: Record<number, { x: number; y: number }> = {
            0: { x: 0, y: 0 },
            1: { x: -110, y: -83 },
            2: { x: -6, y: 50 },
            3: { x: -130, y: -170 },
            4: { x: 96, y: -65 },
            5: { x: 38, y: 110 },
            6: { x: 138, y: 203 }
        }
        return positions[step] || { x: 350, y: 250 }
    }, [step])

    return { step, title, showList, showForm, showToast, activeColor, pointerPos }
}

const FooterColumn = ({ title, children, emptyMessage }: { title: React.ReactNode; children?: React.ReactNode; emptyMessage?: string }) => (
    <section className="flex min-w-0 flex-col border-l border-[#ebedf0] p-4 first:border-l-0">
        <div className="flex h-9 shrink-0 items-center">
            <h3 className="min-w-0 text-sm font-semibold whitespace-nowrap">{title}</h3>
        </div>
        {emptyMessage ? <span className="m-auto text-[13px] font-medium whitespace-nowrap text-[#9ca3af]">{emptyMessage}</span> : <div className="flex flex-col">{children}</div>}
    </section>
)

const FooterEventRow = ({ color, title, date, time }: { color: number; title: string; date: string; time: string }) => (
    <div className="grid h-7 grid-cols-[0.5rem_minmax(0,1fr)_2.5rem_2.25rem] items-center gap-2.5 text-[13px]">
        <i className="h-2 w-2 justify-self-center rounded-full" style={{ backgroundColor: EVENT_COLORS[color] }} />
        <span className="truncate font-medium">{title}</span>
        <span className="text-xs whitespace-nowrap text-zinc-500 tabular-nums">{date}</span>
        <span className="text-right text-xs whitespace-nowrap text-zinc-500 tabular-nums">{time}</span>
    </div>
)

// 바탕화면 배경: 랜딩 밤하늘과 같은 색에 별 몇 개
const WALLPAPER: React.CSSProperties = {
    backgroundImage: [
        'radial-gradient(2px 2px at 12% 18%, #fff 50%, transparent)',
        'radial-gradient(1.5px 1.5px at 28% 42%, #fff 50%, transparent)',
        'radial-gradient(2px 2px at 46% 12%, #fff 50%, transparent)',
        'radial-gradient(1.5px 1.5px at 33% 64%, #fff 50%, transparent)',
        'radial-gradient(1.5px 1.5px at 8% 78%, #fff 50%, transparent)',
        'radial-gradient(1.5px 1.5px at 22% 88%, #fff 50%, transparent)',
        'radial-gradient(ellipse 60% 40% at 25% 100%, rgba(255,214,190,0.25), transparent)',
        'linear-gradient(to bottom, #1A1F3D, #5A5475 60%, #8E7C8A)'
    ].join(',')
}

const SHORTCUTS = [
    { icon: Trash2, label: '휴지통' },
    { icon: HardDrive, label: '내 PC' },
    { icon: Folder, label: '문서' },
    { icon: Globe, label: '인터넷' },
    { icon: Settings, label: '설정' },
    { icon: FileText, label: 'Project.txt' },
    { icon: ImageIcon, label: 'photo.png' },
    { icon: Music, label: 'song.mp3' },
    { icon: Mail, label: 'Mail' },
    { icon: Gamepad2, label: 'Game' }
]

const DesktopShortcuts = () => (
    <div className="absolute top-6 left-5 hidden grid-flow-col grid-rows-5 gap-x-4 gap-y-6 sm:grid">
        {SHORTCUTS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex w-20 flex-col items-center gap-1.5 text-white/85">
                <Icon size={32} strokeWidth={1.5} className="drop-shadow-lg" />
                <span className="text-center text-xs leading-tight font-medium drop-shadow">{label}</span>
            </div>
        ))}
    </div>
)

const Taskbar = () => (
    <div className="absolute inset-x-0 bottom-0 z-30 flex h-14 items-center justify-between border-t border-white/10 bg-[#202030]/80 px-4 text-white backdrop-blur-xl">
        <div className="w-48" />
        <div className="flex items-center gap-1.5">
            {[LayoutGrid, Search, Folder, Globe, Mail].map((Icon, i) => (
                <div key={i} className="flex h-11 w-11 items-center justify-center text-white/80">
                    <Icon size={22} strokeWidth={1.5} />
                </div>
            ))}
            <div className="relative flex h-11 w-11 items-center justify-center rounded-md bg-white/10">
                <CalendarDays size={22} strokeWidth={1.5} className="text-[#a4bdfc]" />
                <span className="absolute bottom-0.5 h-0.5 w-4 rounded-full bg-[#a4bdfc]" />
            </div>
        </div>
        <div className="flex w-48 items-center justify-end gap-4 text-white/85">
            <ChevronUp size={16} />
            <div className="flex items-center gap-2.5">
                <Wifi size={16} />
                <Volume2 size={16} />
                <BatteryFull size={16} />
            </div>
            <div className="flex flex-col items-end text-xs leading-tight tabular-nums">
                <span>오후 3:42</span>
                <span>2026-01-16</span>
            </div>
        </div>
    </div>
)

export const Section1 = () => {
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { amount: 0.3 })
    const { step, title, showList, showForm, showToast, activeColor, pointerPos } = useCalendarDemo(isInView)

    return (
        <section ref={containerRef} className="relative flex w-full flex-col items-center justify-center sm:py-64">
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
                    <HighlightText>바탕화면에서 바로</HighlightText>
                </motion.h2>

                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="text-zinc-400">
                    찾아 들어가는 번거로움은 지우고 편리함만 남겼습니다 <br />
                    PC를 켜는 순간, 당신의 일정이 그 자리에서 시작됩니다
                </motion.p>
            </header>

            {/* 바탕화면 한 장: 1500x844(16:9) 기준으로 그리고 화면 폭에 맞춰 zoom. 모바일은 아이콘 영역을 빼고 위젯 쪽만 */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative z-10 [zoom:0.43] min-[640px]:[zoom:0.4] min-[768px]:[zoom:0.48] min-[1024px]:[zoom:0.6] min-[1280px]:[zoom:0.66] min-[1400px]:[zoom:0.7]"
            >
                <div
                    className="relative h-[844px] w-[820px] overflow-hidden rounded-3xl shadow-[0_40px_120px_rgba(0,0,0,0.5)] ring-1 ring-white/15 sm:w-[1500px]"
                    style={WALLPAPER}
                >
                    <DesktopShortcuts />
                    <div className="absolute top-6 right-6 flex items-center justify-center [zoom:0.85]">
                        <div className="w-[900px]">
                            <div className="relative flex w-full flex-col rounded-xl bg-[#f9fafb] text-[#111827] shadow-xl">
                                <CalendarHeader />
                                <CalendarGrid />

                                {/* 실제 앱의 sonner 토스트(top-center, 창 위에서 84px) */}
                                <AnimatePresence>
                                    {showToast && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -16 }}
                                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                            className="absolute inset-x-0 top-21 z-50 mx-auto flex w-fit items-center gap-2 rounded-full border border-[#ebedf0] bg-[#f9fafb] px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
                                        >
                                            <Check className="h-4 w-4 text-emerald-600" />
                                            <span className="text-[15px] tracking-wider">일정을 추가했어요</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <footer className="grid h-48 grid-cols-3 overflow-hidden rounded-b-xl border-t border-[#ebedf0]">
                                    <FooterColumn title="오늘 일정" emptyMessage="오늘의 일정이 없습니다" />
                                    <FooterColumn title="다가오는 일정">
                                        <FooterEventRow color={10} title="병원가서 진료받기" date="1/23" time="08:00" />
                                        <FooterEventRow color={6} title="농구 대회 결승!" date="1/27" time="08:00" />
                                    </FooterColumn>
                                    <FooterColumn
                                        title={
                                            <span className="-ml-2 inline-flex h-7 items-center gap-1.5 px-2">
                                                <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: EVENT_COLORS[10] }} />
                                                색상별 일정
                                                <ChevronDown size={16} className="text-[#a8adb5]" />
                                            </span>
                                        }
                                    >
                                        <FooterEventRow color={10} title="병원가서 진료받기" date="1/23" time="08:00" />
                                    </FooterColumn>
                                </footer>

                                <div className="absolute inset-x-0 bottom-48 flex translate-y-1/2 justify-center">
                                    <div className="flex h-5 items-center gap-0.5 rounded-full border border-[#ebedf0] bg-[#f9fafb] px-2.5 text-[11px] font-semibold">
                                        <ChevronDown size={12} />
                                        접기
                                    </div>
                                </div>
                            </div>
                        </div>

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
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute z-40 grid w-100 gap-2 rounded-lg bg-[#f9fafb] p-5 text-[#111827] shadow-lg"
                                >
                                    <X className="absolute top-4 right-4 size-5 text-neutral-400" />
                                    <div className="mb-1 flex items-baseline gap-2 pr-8">
                                        <span className="text-lg font-semibold">1월 13일</span>
                                        <span className="text-xs text-[#a8adb5]">D+3</span>
                                    </div>
                                    {showForm ? <AddEventForm step={step} title={title} activeColor={activeColor} /> : <EventListPopup />}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <Taskbar />
                </div>
            </motion.div>
        </section>
    )
}
// --- Internal UI Parts (Split for clarity) ---

const CalendarHeader = () => (
    <div className="flex items-center justify-between rounded-t-xl px-6 py-3">
        <div className="flex items-center p-2">
            <ChevronLeft strokeWidth={1} />
            <div className="min-w-40 text-center text-xl font-semibold">2026년 01월</div>
            <ChevronRight strokeWidth={1} />
        </div>
        <div className="flex items-center gap-5 [&_svg]:size-6">
            <div className="flex items-center gap-2">
                <CalendarCheck2 strokeWidth={1} />
                <RotateCw strokeWidth={1} />
            </div>
            <div className="flex items-center gap-2">
                <FoldVertical strokeWidth={1} />
                <Minimize2 strokeWidth={1} />
            </div>
            <div className="flex items-center gap-2">
                <CircleHelp strokeWidth={1} />
                <Settings strokeWidth={1} />
            </div>
        </div>
    </div>
)

const CalendarGrid = () => (
    <div className="flex flex-col">
        <div className="grid grid-cols-7 py-2 text-center">
            <div className="text-red-400">일</div>
            {['월', '화', '수', '목', '금'].map((d) => (
                <div key={d}>{d}</div>
            ))}
            <div className="text-blue-400">토</div>
        </div>
        <div className="grid h-[480px] grid-rows-6">
            {WEEKS.map((week, w) => (
                <div key={w} className="grid grid-cols-7 border-t border-[#ebedf0] first:border-t-0">
                    {week.map(({ date, isCurrentMonth, isSunday }) => {
                        const holiday = isCurrentMonth ? HOLIDAYS[date] : undefined
                        const isRestDay = isSunday || Boolean(holiday)
                        const isToday = isCurrentMonth && date === TODAY
                        const dayEvents = (isCurrentMonth && EVENTS[date]) || []
                        return (
                            <div key={date} className="flex min-w-0 flex-col">
                                <div className={cn('grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-1 p-1 font-semibold', !isCurrentMonth && 'text-[#a8adb5]')}>
                                    <div />
                                    <div
                                        className={cn(
                                            'flex h-6 w-6 items-center justify-center rounded-md tracking-tighter',
                                            isRestDay && (isCurrentMonth ? 'text-red-400' : 'text-red-400/50'),
                                            isToday && 'bg-red-400 text-white'
                                        )}
                                    >
                                        {date}
                                    </div>
                                    <span className="truncate text-[10px] font-semibold text-red-400">{holiday}</span>
                                </div>
                                {dayEvents.map((ev) => (
                                    <div key={ev.title} className="mx-1.5 flex h-5 items-center gap-1 pl-1 text-xs">
                                        <i className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: EVENT_COLORS[ev.color] }} />
                                        <span className="truncate">
                                            <span className="font-semibold text-zinc-500 tabular-nums">{ev.time} </span>
                                            {ev.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )
                    })}
                </div>
            ))}
        </div>
    </div>
)

const EventListPopup = () => (
    <>
        <div className="flex items-center justify-between rounded-xl p-3" style={{ backgroundColor: `${EVENT_COLORS[5]}33` }}>
            <div className="flex min-w-0 flex-1 items-center">
                <div className="h-10 w-2 shrink-0 rounded-xl" style={{ backgroundColor: EVENT_COLORS[5] }} />
                <div className="min-w-0 flex-1 pl-3">
                    <span className="block truncate font-semibold">사이드 프로젝트 회의</span>
                    <div className="text-xs">오전 8:10 ~ 오전 9:10</div>
                </div>
            </div>
            <div className="flex shrink-0 items-center">
                <div className="flex h-8 w-8 items-center justify-center">
                    <Check strokeWidth={1.5} size={18} />
                </div>
                <div className="flex h-8 w-8 items-center justify-center">
                    <X strokeWidth={1.5} size={18} />
                </div>
            </div>
        </div>
        <div className="w-full rounded-xl border-2 border-dashed border-zinc-200 py-3 text-center text-[#a8adb5]">일정 추가</div>
    </>
)

const RECURRENCE = ['안 함', '매일', '매주', '매월', '매년']

const TimeStepper = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-1 flex-col items-center gap-1">
        <span className="text-xs font-semibold text-zinc-400">{label}</span>
        <div className="flex items-center gap-1.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500">
                <Minus size={12} />
            </div>
            <div className="min-w-20 rounded-xl border border-zinc-100 bg-white py-1.5 text-center shadow-sm">
                <span className="font-semibold text-zinc-500 tabular-nums">{value}</span>
            </div>
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500">
                <Plus size={12} />
            </div>
        </div>
    </div>
)

const AddEventForm = ({ step, title, activeColor }: { step: number; title: string; activeColor: string }) => {
    // step 4에서 종료 시간 손잡이를 12:00 → 18:00으로 끌어당긴다
    const endHour = step >= 4 ? 18 : 12
    const endTransition = { delay: step >= 4 ? 0.8 : 0, duration: 0.8, ease: 'easeInOut' } as const
    return (
        <div className="flex flex-col gap-5">
            <div className="flex w-full items-center border-b border-zinc-200 py-2 text-base font-medium">
                {title ? <span>{title}</span> : <span className="text-[#a8adb5]">제목을 입력하세요</span>}
                {step === 3 && <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="ml-0.5 h-5 w-px bg-[#111827]" />}
            </div>

            <div className="flex items-center">
                <span className="w-10 shrink-0 text-sm font-medium text-[#a8adb5]">날짜</span>
                <div className="flex h-9 items-center gap-1.5 rounded-lg border border-zinc-200 px-3 text-sm">
                    <Calendar className="h-4 w-4 shrink-0 text-zinc-400" />
                    <span className="tabular-nums">1월 13일 (화) ~ 1월 13일 (화)</span>
                </div>
                <div className="ml-auto flex shrink-0 items-center gap-1.5">
                    <span className="text-sm font-medium text-[#a8adb5]">종일</span>
                    <div className="relative flex h-6 w-12 items-center justify-center rounded-full bg-[#CCD0E4]">
                        <div className="absolute h-5 w-5 -translate-x-3 rounded-full bg-white" />
                    </div>
                </div>
            </div>

            <div>
                <div className="mb-2 flex">
                    <span className="flex h-4 w-10 shrink-0 items-center text-sm font-medium text-[#a8adb5]">시간</span>
                    <div className="relative h-9.5 flex-1">
                        <div className="absolute h-4 w-full rounded-full bg-zinc-200" />
                        <motion.div
                            className="absolute z-10 h-4"
                            style={{ left: `${(8 / 24) * 100}%`, backgroundColor: activeColor }}
                            animate={{ width: `${((endHour - 8) / 24) * 100}%` }}
                            transition={endTransition}
                        />
                        {Array.from({ length: 23 }, (_, i) => i + 1).map((h) => (
                            <div
                                key={h}
                                className={cn(
                                    'absolute bottom-5.5 z-15 -translate-x-1/2 transition-colors duration-300',
                                    h % 6 === 0 ? 'h-2 w-[1.5px]' : h % 3 === 0 ? 'h-2 w-px' : 'h-1 w-px',
                                    h >= 8 && h <= endHour ? 'bg-white/85' : 'bg-zinc-400'
                                )}
                                style={{ left: `${(h / 24) * 100}%` }}
                            />
                        ))}
                        {Array.from({ length: 9 }, (_, i) => i * 3).map((h) => (
                            <span
                                key={h}
                                className={cn('absolute top-5.5 -ml-1.5 tabular-nums', h % 6 === 0 ? 'text-xs font-medium text-zinc-500' : 'text-[10px] text-zinc-400')}
                                style={{ left: `${(h / 24) * 100}%` }}
                            >
                                {h.toString().padStart(2, '0')}
                            </span>
                        ))}
                        <div
                            className="absolute top-2 z-20 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full p-1.5"
                            style={{ left: `${(8 / 24) * 100}%`, backgroundColor: activeColor }}
                        >
                            <AlarmClock className="text-white" size={16} />
                        </div>
                        <motion.div
                            className="absolute top-2 z-25 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full p-1.5"
                            style={{ backgroundColor: activeColor }}
                            animate={{ left: `${(endHour / 24) * 100}%` }}
                            transition={endTransition}
                        >
                            <AlarmClockOff className="text-white" size={16} />
                        </motion.div>
                    </div>
                </div>
                <div className="flex w-full items-center justify-between gap-2">
                    <TimeStepper label="시작시간" value="08:00" />
                    <ArrowRight className="mt-5 h-4 w-4 text-zinc-800" />
                    <TimeStepper label="종료시간" value={`${endHour}:00`} />
                </div>
            </div>

            <div className="flex items-start">
                <span className="w-10 shrink-0 pt-1 text-sm font-medium text-[#a8adb5]">반복</span>
                <div className="flex flex-wrap items-center gap-1.5">
                    {RECURRENCE.map((label, i) => (
                        <span key={label} className={cn('rounded-full px-3 py-1 text-xs font-medium', i === 0 ? 'bg-zinc-700 text-white' : 'bg-zinc-100 text-zinc-500')}>
                            {label}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex items-start">
                <span className="w-10 shrink-0 pt-1 text-sm font-medium text-[#a8adb5]">색상</span>
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex flex-wrap">
                        {EVENT_COLORS.map((color) => (
                            <div
                                key={color}
                                className={cn(
                                    'flex h-7 w-7 items-center justify-center rounded-full border-2 transition-colors',
                                    activeColor === color ? 'border-zinc-400' : 'border-transparent'
                                )}
                            >
                                <span className="h-5 w-5 rounded-full" style={{ backgroundColor: color }} />
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-zinc-200 px-2 py-1">
                        <span className="h-3 w-3 shrink-0 rounded-full transition-colors" style={{ backgroundColor: activeColor }} />
                        <span className="py-0.5 text-xs text-[#a8adb5]">무슨 일정에 쓸 색인가요?</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-2">
                <span className="rounded-lg border border-zinc-200 px-6 py-1.5 font-semibold text-zinc-500">취소</span>
                <motion.span
                    animate={{ scale: step === 6 ? [1, 0.95, 1] : 1, backgroundColor: activeColor }}
                    transition={{ scale: { duration: 0.2, delay: 0.6 } }}
                    className="rounded-lg px-6 py-1.5 font-semibold text-white"
                >
                    추가
                </motion.span>
            </div>
        </div>
    )
}
