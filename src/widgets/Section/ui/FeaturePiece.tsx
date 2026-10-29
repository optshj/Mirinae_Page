'use client'
import { useRef, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { CalendarCheck2, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Minimize2, MousePointer2, Undo2, X } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

// 기능 카드용 앱 조각: 실제 앱 UI 일부를 HTML로 다시 그리고, 화면에 들어올 때 한 번 움직인다 (영상 대신)
export type PieceKey = 'add' | 'drag' | 'done' | 'undo' | 'summary' | 'filter' | 'mini' | 'opacity' | 'dark' | 'calendars'

const EVENT_COLORS = ['#b2c4f7', '#9edfca', '#e0c7f5', '#f7a399', '#f7e096', '#f7c9a1', '#8fd8db', '#cbcbd1', '#8aa7e8', '#8eca89', '#d65a5e']
const EASE = [0.22, 1, 0.36, 1] as const

interface PieceProps {
    play: boolean
    t: (delay?: number, duration?: number) => object
}

const Surface = ({ children, className }: { children: ReactNode; className?: string }) => (
    <div className={cn('rounded-xl bg-[#f9fafb] text-[#111827] shadow-[0_20px_50px_rgba(0,0,0,0.35)]', className)}>{children}</div>
)

const Dot = ({ color, className }: { color: number; className?: string }) => (
    <i className={cn('size-2 shrink-0 rounded-full', className)} style={{ backgroundColor: EVENT_COLORS[color] }} />
)

const MonthHeader = ({ small }: { small?: boolean }) => (
    <div className={cn('flex items-center font-semibold', small ? 'gap-1 text-sm' : 'gap-2 text-base')}>
        <ChevronLeft size={small ? 14 : 16} strokeWidth={1} />
        2026년 01월
        <ChevronRight size={small ? 14 : 16} strokeWidth={1} />
    </div>
)

function AddPiece({ play, t }: PieceProps) {
    return (
        <Surface className="w-[330px] p-5">
            <div className="mb-3 flex items-baseline gap-2">
                <span className="text-lg font-semibold">1월 13일</span>
                <span className="text-xs text-[#a8adb5]">화요일</span>
            </div>
            <div className="flex items-center border-b border-zinc-200 py-2 font-medium">
                <motion.span className="overflow-hidden whitespace-nowrap" initial={false} animate={{ width: play ? 'auto' : 0 }} transition={t(0.2, 1)}>
                    제주도 2박 3일 여행
                </motion.span>
                <span className="ml-0.5 h-5 w-px bg-[#111827]" />
            </div>
            <div className="mt-4 flex">
                {EVENT_COLORS.slice(0, 9).map((color, i) => (
                    <motion.span
                        key={color}
                        className="flex size-7 items-center justify-center rounded-full border-2"
                        initial={false}
                        animate={{ borderColor: play && i === 6 ? '#a1a1aa' : 'rgba(0,0,0,0)' }}
                        transition={t(1.3, 0.2)}
                    >
                        <span className="size-5 rounded-full" style={{ backgroundColor: color }} />
                    </motion.span>
                ))}
            </div>
            <div className="mt-5 flex justify-end gap-2 text-sm font-semibold">
                <span className="rounded-lg border border-zinc-200 px-5 py-1.5 text-zinc-500">취소</span>
                <motion.span
                    className="rounded-lg px-5 py-1.5 text-white"
                    initial={false}
                    animate={{ backgroundColor: play ? EVENT_COLORS[6] : EVENT_COLORS[0] }}
                    transition={t(1.3, 0.3)}
                >
                    추가
                </motion.span>
            </div>
        </Surface>
    )
}

function DragPiece({ play, t }: PieceProps) {
    return (
        <Surface className="relative w-[340px] overflow-hidden">
            <div className="grid grid-cols-3 text-center text-sm font-semibold">
                {[13, 14, 15].map((d, i) => (
                    <div key={d} className={cn('h-36 p-2', i < 2 && 'border-r border-[#ebedf0]')}>
                        <span className={cn('inline-flex size-6 items-center justify-center rounded-md', d === 15 && 'text-blue-400')}>{d}</span>
                    </div>
                ))}
            </div>
            <motion.span
                className="absolute top-11 left-1.5 h-6 w-[101px] rounded border border-dashed border-zinc-300"
                initial={false}
                animate={{ opacity: play ? 1 : 0 }}
                transition={t(0.5, 0.3)}
            />
            <motion.div
                className="absolute top-11 left-1.5 w-[101px]"
                initial={false}
                animate={play ? { x: [0, 0, 226, 226], y: [0, -4, -4, 0], rotate: [0, -3, -3, 0] } : { x: 0, y: 0, rotate: 0 }}
                transition={t(0.3, 1.6)}
            >
                <div className="flex h-6 items-center gap-1 rounded bg-white px-1.5 text-xs shadow-md">
                    <Dot color={5} />
                    <span className="truncate">
                        <span className="font-semibold text-zinc-500 tabular-nums">08:10 </span>회의
                    </span>
                </div>
                <motion.span className="absolute top-3 left-16" initial={false} animate={{ opacity: play ? [0, 1, 1, 0] : 0 }} transition={t(0.3, 1.6)}>
                    <MousePointer2 size={18} className="fill-[#111827] text-white" />
                </motion.span>
            </motion.div>
        </Surface>
    )
}

const DONE_ROWS = [
    { title: '사이드 프로젝트 회의', time: '오전 8:10 ~ 오전 9:10', color: 5 },
    { title: '병원 예약', time: '오후 2:00 ~ 오후 3:00', color: 10 },
    { title: '헬스장', time: '오후 7:00 ~ 오후 8:00', color: 1 }
]
function DonePiece({ play, t }: PieceProps) {
    return (
        <Surface className="w-[340px] space-y-2 p-3">
            {DONE_ROWS.map((row, i) => {
                const target = i === 1
                return (
                    <div key={row.title} className="flex items-center justify-between rounded-xl p-2.5" style={{ backgroundColor: `${EVENT_COLORS[row.color]}33` }}>
                        <motion.div className="flex min-w-0 items-center" initial={false} animate={{ opacity: target && play ? 0.5 : 1 }} transition={t(0.9, 0.3)}>
                            <span className="h-9 w-1.5 shrink-0 rounded-xl" style={{ backgroundColor: EVENT_COLORS[row.color] }} />
                            <div className="min-w-0 pl-3">
                                <span className="relative inline-block max-w-full truncate align-top text-sm font-semibold">
                                    {row.title}
                                    {target && (
                                        <motion.i
                                            className="absolute inset-x-0 top-1/2 h-px origin-left bg-[#111827]"
                                            initial={false}
                                            animate={{ scaleX: play ? 1 : 0 }}
                                            transition={t(0.8, 0.4)}
                                        />
                                    )}
                                </span>
                                <span className="block text-xs">{row.time}</span>
                            </div>
                        </motion.div>
                        <div className="flex shrink-0 items-center">
                            <motion.span
                                className="flex size-7 items-center justify-center rounded-full"
                                initial={false}
                                animate={
                                    target && play ? { scale: [1, 0.8, 1.1, 1], backgroundColor: 'rgba(255,255,255,0.8)' } : { scale: 1, backgroundColor: 'rgba(255,255,255,0)' }
                                }
                                transition={t(0.5, 0.4)}
                            >
                                <Check strokeWidth={target ? 2.5 : 1.5} size={16} />
                            </motion.span>
                            <span className="flex size-7 items-center justify-center">
                                <X strokeWidth={1.5} size={16} />
                            </span>
                        </div>
                    </div>
                )
            })}
        </Surface>
    )
}

function UndoPiece({ play, t }: PieceProps) {
    const ring = 2 * Math.PI * 13
    return (
        <div className="flex flex-col items-center gap-5">
            <motion.div initial={false} animate={{ opacity: play ? 0.35 : 1, scale: play ? 0.97 : 1 }} transition={t(0.2, 0.4)}>
                <Surface className="flex w-[280px] items-center gap-2 px-3 py-2.5 text-sm">
                    <span className="h-5 w-1 rounded-full" style={{ backgroundColor: EVENT_COLORS[3] }} />
                    <span className="font-medium">치과 예약</span>
                    <span className="ml-auto text-xs text-zinc-500 tabular-nums">14:00</span>
                </Surface>
            </motion.div>
            <motion.div
                className="flex items-center gap-3 rounded-full border border-[#ebedf0] bg-[#f9fafb] py-2 pr-2 pl-4 text-[15px] text-[#111827] shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
                initial={false}
                animate={{ opacity: play ? 1 : 0, y: play ? 0 : 12 }}
                transition={t(0.5, 0.4)}
            >
                <Check size={16} className="text-emerald-600" />
                일정을 삭제했어요
                <span className="relative flex size-8 items-center justify-center">
                    <svg className="absolute inset-0 -rotate-90" viewBox="0 0 30 30">
                        <circle cx="15" cy="15" r="13" fill="none" strokeWidth="2" className="stroke-zinc-200" />
                        <motion.circle
                            cx="15"
                            cy="15"
                            r="13"
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray={ring}
                            className="stroke-emerald-500"
                            initial={false}
                            animate={{ strokeDashoffset: play ? ring * 0.6 : 0 }}
                            transition={t(0.8, 3)}
                        />
                    </svg>
                    <Undo2 size={14} strokeWidth={2.2} />
                </span>
            </motion.div>
        </div>
    )
}

const Row = ({ color, title, date, time }: { color: number; title: string; date: string; time: string }) => (
    <div className="grid h-7 grid-cols-[0.5rem_minmax(0,1fr)_2rem_2.25rem] items-center gap-1.5 text-[13px]">
        <Dot color={color} className="justify-self-center" />
        <span className="truncate font-medium">{title}</span>
        <span className="text-xs text-zinc-500 tabular-nums">{date}</span>
        <span className="text-right text-xs text-zinc-500 tabular-nums">{time}</span>
    </div>
)
const TODAY_ROWS = [
    { color: 0, title: '스터디', date: '1/16', time: '08:00' },
    { color: 5, title: '팀 회의', date: '1/16', time: '14:00' }
]
const UPCOMING_ROWS = [
    { color: 10, title: '병원', date: '1/23', time: '08:00' },
    { color: 6, title: '농구 대회', date: '1/27', time: '08:00' },
    { color: 2, title: '영어 학원', date: '1/29', time: '19:00' }
]
function SummaryPiece({ play, t }: PieceProps) {
    const column = (title: string, rows: typeof TODAY_ROWS, offset: number) => (
        <section className="flex min-w-0 flex-col border-l border-[#ebedf0] p-3 first:border-l-0">
            <h4 className="flex h-7 items-center text-sm font-semibold">{title}</h4>
            {rows.map((row, i) => (
                <motion.div key={row.title} initial={false} animate={{ opacity: play ? 1 : 0, y: play ? 0 : 6 }} transition={t(0.2 + (offset + i) * 0.12, 0.4)}>
                    <Row {...row} />
                </motion.div>
            ))}
        </section>
    )
    return (
        <Surface className="grid w-[380px] grid-cols-2 overflow-hidden">
            {column('오늘 일정', TODAY_ROWS, 0)}
            {column('다가오는 일정', UPCOMING_ROWS, 2)}
        </Surface>
    )
}

const FILTER_WEEK = [0, 5, 10, 0, 1, 10, 6]
const FILTER_ON = [0, 10]
function FilterPiece({ play, t }: PieceProps) {
    return (
        <div className="flex w-[372px] flex-col gap-3">
            <Surface className="p-3 text-sm">
                <div className="mb-1.5 flex items-center justify-between">
                    <span>색상 필터</span>
                    <motion.span className="text-xs text-zinc-500" initial={false} animate={{ opacity: play ? 1 : 0 }} transition={t(0.9, 0.2)}>
                        2개
                    </motion.span>
                </div>
                <div className="flex flex-wrap gap-0.5">
                    {EVENT_COLORS.map((color, i) => (
                        <motion.span
                            key={color}
                            className="flex size-7 items-center justify-center rounded-full border-2"
                            initial={false}
                            animate={{ borderColor: play && FILTER_ON.includes(i) ? '#a1a1aa' : 'rgba(0,0,0,0)' }}
                            transition={t(i === 0 ? 0.3 : 0.7, 0.2)}
                        >
                            <span className="size-5 rounded-full" style={{ backgroundColor: color }} />
                        </motion.span>
                    ))}
                </div>
            </Surface>
            <Surface className="grid grid-cols-7 gap-1 p-2">
                {FILTER_WEEK.map((color, i) => (
                    <motion.div
                        key={i}
                        className="flex flex-col items-center gap-1.5 py-1 text-xs font-semibold"
                        initial={false}
                        animate={{ opacity: play && !FILTER_ON.includes(color) ? 0.2 : 1 }}
                        transition={t(1, 0.4)}
                    >
                        <span className={cn(i === 0 && 'text-red-400', i === 6 && 'text-blue-400')}>{18 + i}</span>
                        <span className="h-4 w-full rounded" style={{ backgroundColor: EVENT_COLORS[color] }} />
                    </motion.div>
                ))}
            </Surface>
        </div>
    )
}

const MINI_DOTS: Record<number, number[]> = { 7: [0], 13: [5, 2], 16: [10], 23: [1], 27: [6, 0, 3] }
function MiniPiece({ play, t }: PieceProps) {
    return (
        <motion.div className="origin-top-right" initial={false} animate={{ scale: play ? 1 : 1.25, opacity: play ? 1 : 0 }} transition={t(0.2, 0.7)}>
            <Surface className="w-[250px] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5">
                    <MonthHeader small />
                    <span className="text-[#a4bdfc]">
                        <Minimize2 size={18} strokeWidth={1.25} />
                    </span>
                </div>
                <div className="grid grid-cols-7 border-b border-[#ebedf0] pb-1.5 text-center text-[11px] font-medium">
                    {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
                        <span key={d} className={cn(i === 0 && 'text-red-400', i === 6 && 'text-blue-400')}>
                            {d}
                        </span>
                    ))}
                </div>
                <div className="grid grid-cols-7 px-0.5 pb-1">
                    {Array.from({ length: 35 }, (_, i) => {
                        const day = i - 3
                        const inMonth = day >= 1 && day <= 31
                        const label = day < 1 ? 28 + day + 3 : day > 31 ? day - 31 : day
                        return (
                            <div key={i} className={cn('flex h-9 flex-col items-center justify-center gap-0.5', !inMonth && 'opacity-40')}>
                                <span
                                    className={cn(
                                        'flex size-5 items-center justify-center rounded-md text-[11px] tracking-tighter',
                                        inMonth && day === 16 && 'bg-red-400 text-white'
                                    )}
                                >
                                    {label}
                                </span>
                                <span className="flex h-1.5 gap-0.5">{inMonth && MINI_DOTS[day]?.map((c, j) => <Dot key={j} color={c} className="size-1.5" />)}</span>
                            </div>
                        )
                    })}
                </div>
            </Surface>
        </motion.div>
    )
}

const OPACITY_EVENTS = [
    { color: 0, label: '08:00 자격증 공부' },
    { color: 6, label: '08:00 농구 대회' },
    { color: 10, label: '14:00 병원 진료' }
]
function OpacityPiece({ play, t }: PieceProps) {
    return (
        <div className="relative h-[250px] w-[350px] overflow-hidden rounded-xl bg-[linear-gradient(135deg,#3b3f6b,#8e7c8a_55%,#e8b7a0)] shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
            <span className="absolute top-8 right-10 size-16 rounded-full bg-[#f7e096]/70 blur-[2px]" />
            <motion.div
                className="absolute inset-x-5 top-5 rounded-xl p-4 text-[#111827]"
                initial={false}
                animate={{ backgroundColor: play ? 'rgba(249,250,251,0.55)' : 'rgba(249,250,251,1)' }}
                transition={t(0.3, 1.2)}
            >
                <MonthHeader small />
                <div className="mt-2.5 space-y-1">
                    {OPACITY_EVENTS.map((ev) => (
                        <div key={ev.label} className="flex h-5 items-center gap-1.5 text-xs">
                            <Dot color={ev.color} />
                            {ev.label}
                        </div>
                    ))}
                </div>
            </motion.div>
            <div className="absolute inset-x-5 bottom-4 flex items-center justify-between rounded-xl bg-[#f9fafb] px-4 py-2 text-sm text-[#111827] shadow-lg">
                투명도
                <span className="flex items-center gap-1">
                    <motion.span
                        className="flex size-5 items-center justify-center rounded-md border border-[#ebedf0]"
                        initial={false}
                        animate={{ backgroundColor: play ? ['#f9fafb', '#e4e4e7', '#f9fafb'] : '#f9fafb' }}
                        transition={t(0.3, 0.6)}
                    >
                        <ChevronDown size={12} />
                    </motion.span>
                    <span className="w-9 text-center text-xs font-semibold tabular-nums">{play ? '55%' : '100%'}</span>
                    <span className="flex size-5 items-center justify-center rounded-md border border-[#ebedf0]">
                        <ChevronUp size={12} />
                    </span>
                </span>
            </div>
        </div>
    )
}

const DARK_DAYS = [11, 12, 13, 14, 15, 16, 17]
function CalendarSlice({ dark }: { dark?: boolean }) {
    return (
        <div className={cn('absolute inset-0 p-4', dark ? 'bg-[#303033] text-[#f3f4f6]' : 'bg-[#f9fafb] text-[#111827]')}>
            <MonthHeader small />
            <div className={cn('mt-3 grid grid-cols-7 border-t pt-2 text-center text-xs font-semibold', dark ? 'border-[#52525c]' : 'border-[#ebedf0]')}>
                {DARK_DAYS.map((d, i) => (
                    <span
                        key={d}
                        className={cn(
                            'mx-auto flex size-6 items-center justify-center rounded-md',
                            i === 0 && 'text-red-400',
                            i === 6 && 'text-blue-400',
                            d === 16 && 'bg-red-400 text-white'
                        )}
                    >
                        {d}
                    </span>
                ))}
            </div>
            <div className={cn('mt-2 space-y-1 text-xs', dark && '[&_i]:saturate-70')}>
                <div className="flex h-5 items-center gap-1.5">
                    <Dot color={5} />
                    08:10 사이드 프로젝트 회의
                </div>
                <div className="flex h-5 items-center gap-1.5">
                    <Dot color={1} />
                    19:00 헬스장
                </div>
            </div>
        </div>
    )
}
function DarkPiece({ play, t }: PieceProps) {
    return (
        <div className="relative h-[180px] w-[340px] overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
            <CalendarSlice />
            <motion.div className="absolute inset-0" initial={false} animate={{ clipPath: play ? 'inset(0 0 0 50%)' : 'inset(0 0 0 100%)' }} transition={t(0.3, 1.1)}>
                <CalendarSlice dark />
            </motion.div>
        </div>
    )
}

const CALENDAR_LIST = [
    { name: '대한민국 공휴일', color: 10, on: true, animated: true },
    { name: '회사 공유 일정', color: 5, on: true },
    { name: '가족', color: 1, on: false }
]
function CalendarsPiece({ play, t }: PieceProps) {
    return (
        <div className="flex w-[300px] flex-col items-end gap-2">
            <Surface className="flex items-center gap-2 px-3 py-2">
                <CalendarCheck2 size={20} strokeWidth={1} className="text-[#a4bdfc]" />
            </Surface>
            <Surface className="w-56 p-1.5 text-sm">
                <div className="px-2 py-1.5 text-xs font-semibold">표시할 캘린더</div>
                {CALENDAR_LIST.map((cal) => {
                    const checked = cal.animated ? play : cal.on
                    return (
                        <div key={cal.name} className="flex items-center gap-2 rounded-sm px-2 py-1.5">
                            <motion.span
                                className="flex size-4 shrink-0 items-center justify-center rounded border-[1.5px]"
                                style={{ borderColor: EVENT_COLORS[cal.color] }}
                                initial={false}
                                animate={{ backgroundColor: checked ? EVENT_COLORS[cal.color] : 'rgba(0,0,0,0)' }}
                                transition={t(0.5, 0.2)}
                            >
                                <motion.span initial={false} animate={{ scale: checked ? 1 : 0 }} transition={t(0.55, 0.2)}>
                                    <Check color="white" strokeWidth={3.5} className="size-3" />
                                </motion.span>
                            </motion.span>
                            <span className="truncate">{cal.name}</span>
                        </div>
                    )
                })}
            </Surface>
            <motion.div initial={false} animate={{ opacity: play ? 1 : 0, y: play ? 0 : -4 }} transition={t(0.8, 0.3)}>
                <Surface className="flex items-center gap-2 px-3 py-2 text-sm">
                    <span className="font-semibold text-red-400 tabular-nums">1월 1일</span>
                    <span className="text-xs font-semibold text-red-400">신정</span>
                    <span className="text-xs text-[#a8adb5]">달력에 표시돼요</span>
                </Surface>
            </motion.div>
        </div>
    )
}

const PIECES: Record<PieceKey, (props: PieceProps) => ReactNode> = {
    add: AddPiece,
    drag: DragPiece,
    done: DonePiece,
    undo: UndoPiece,
    summary: SummaryPiece,
    filter: FilterPiece,
    mini: MiniPiece,
    opacity: OpacityPiece,
    dark: DarkPiece,
    calendars: CalendarsPiece
}

export function FeaturePiece({ k }: { k: PieceKey }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, amount: 0.6 })
    const reduce = useReducedMotion()
    const Piece = PIECES[k]
    // 모션을 줄이는 설정이면 처음부터 끝난 상태로 보여준다
    const t = (delay = 0, duration = 0.5) => (reduce ? { duration: 0 } : { delay, duration, ease: EASE })

    return (
        <div
            ref={ref}
            className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl bg-white/5 bg-[radial-gradient(ellipse_at_50%_40%,rgba(164,189,252,0.22),transparent_70%)]"
        >
            <div className="[zoom:0.72] min-[640px]:[zoom:1]">
                <Piece play={inView || Boolean(reduce)} t={t} />
            </div>
        </div>
    )
}
