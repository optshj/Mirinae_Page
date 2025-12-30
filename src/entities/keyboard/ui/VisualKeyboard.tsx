'use client'
import { motion } from 'framer-motion'

interface KeyProps {
    label: string
    subLabel?: string
    isActive?: boolean
    width?: string // 너비를 자유롭게 조절 (기본 1u: w-14)
}

const Key = ({ label, subLabel, isActive, width = 'w-14' }: KeyProps) => {
    return (
        <div
            className={`relative flex h-14 ${width} flex-shrink-0 flex-col items-center justify-center rounded-xl border transition-all duration-300 ${
                isActive
                    ? 'border-blue-400 bg-gradient-to-br from-blue-600/20 to-purple-600/20 shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                    : 'border-white/10 bg-zinc-900/50 text-zinc-400'
            }`}
        >
            {subLabel && <span className="absolute top-1.5 text-[10px] uppercase opacity-50">{subLabel}</span>}
            <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-zinc-300'}`}>{label}</span>
            {isActive && <div className="absolute inset-0 rounded-xl bg-blue-500/10 blur-md" />}
        </div>
    )
}

export function VisualKeyboard() {
    return (
        <div className="relative inline-block rounded-3xl bg-gradient-to-b from-blue-500/20 via-transparent to-purple-500/20 p-1">
            <div className="flex flex-col gap-2 rounded-[22px] bg-zinc-950 p-6 shadow-2xl">
                {/* Row 1: Function Keys (1u keys) */}
                <div className="flex gap-2">
                    <Key label="esc" />
                    <div className="w-4" /> {/* 표준 간격 */}
                    <Key label="F1" subLabel="🔆" />
                    <Key label="F2" subLabel="🔅" />
                    <Key label="F3" subLabel="□□" />
                    <Key label="F4" subLabel="Q" />
                    <Key label="F5" subLabel="🎤" />
                    <Key label="F6" subLabel="🌙" />
                </div>

                {/* Row 2: Numbers/QWERTY (Standard offset) */}
                <div className="flex gap-2">
                    <Key label="±" subLabel="§" />
                    <Key label="1" subLabel="!" />
                    <Key label="@" subLabel="2" />
                    <Key label="#" subLabel="3" />
                    <Key label="$" subLabel="4" />
                    <Key label="%" subLabel="5" />
                    <Key label="^" subLabel="6" />
                    <Key label="&" subLabel="7" />
                </div>

                {/* Row 3: QWERTY (0.5u Offset) */}
                <div className="flex gap-2 pl-6">
                    <Key label="Q" />
                    <Key label="W" />
                    <Key label="E" />
                    <Key label="R" />
                    <Key label="T" />
                    <Key label="Y" />
                    <Key label="U" />
                </div>

                {/* Row 4: Home Row (0.75u Offset + Active Key) */}
                <div className="flex gap-2 pl-9">
                    <Key label="A" />
                    <Key label="S" />
                    <Key label="D" />
                    <Key label="F" />
                    <Key label="G" />
                    <Key label="V" isActive={true} /> {/* 강조 키 */}
                </div>

                {/* Row 5: Bottom Row (Modifiers & Space) */}
                <div className="flex gap-2">
                    <Key label="fn" subLabel="🌐" width="w-12" />
                    <Key label="control" subLabel="^" width="w-16" />
                    <Key label="option" subLabel="⌥" width="w-16" />
                    <Key label="command" subLabel="⌘" width="w-20" isActive={true} />
                    <div className="h-14 w-48 rounded-xl border border-white/5 bg-zinc-900/30" /> {/* Spacebar */}
                </div>

                {/* Bottom Badge (Floating Style) */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 flex items-center justify-center gap-4 self-center rounded-2xl border border-white/10 bg-zinc-900/80 px-8 py-4 shadow-xl"
                >
                    <div className="flex gap-1.5">
                        <kbd className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-zinc-800 font-mono text-sm text-white shadow-inner">⌘</kbd>
                        <kbd className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-zinc-800 font-mono text-sm text-white shadow-inner">V</kbd>
                    </div>
                    <div className="h-4 w-[1px] bg-white/20" /> {/* Divider */}
                    <span className="text-sm font-bold tracking-[0.2em] text-white">FREE TIME FINDER</span>
                </motion.div>
            </div>

            {/* Background Glow */}
            <div className="absolute -inset-4 -z-10 rounded-[40px] bg-blue-500/10 opacity-50 blur-3xl" />
        </div>
    )
}
