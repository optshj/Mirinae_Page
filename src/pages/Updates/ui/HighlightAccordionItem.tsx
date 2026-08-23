'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import type { UpdateHighlight } from '../model/highlights'
import { BulletTypeTag } from './BulletTypeTag'

interface HighlightAccordionItemProps {
    entry: UpdateHighlight
    defaultOpen: boolean
}

const easeOutExpo = [0.22, 1, 0.36, 1] as const

export function HighlightAccordionItem({ entry, defaultOpen }: HighlightAccordionItemProps) {
    const [open, setOpen] = useState(defaultOpen)
    const active = open

    return (
        <div className="group grid grid-cols-[10px_1fr] gap-x-3 py-1">
            {/*
                The dot lives inside this 10px-wide grid cell and centers itself with
                left-1/2 / -translate-x-1/2 against it — the same offset the timeline's
                outer track line uses (left-[5px]), so they line up on the same pixel.
            */}
            <div className="relative col-start-1 row-start-1">
                <span
                    className={cn(
                        'absolute top-1/2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-colors',
                        active
                            ? 'border-brand bg-brand'
                            : 'border-white/30 bg-white/10 backdrop-blur-sm group-hover:border-white/50 group-hover:bg-white/20'
                    )}
                />
            </div>

            <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpen((prev) => !prev)}
                className="col-start-2 row-start-1 flex w-full cursor-pointer items-center gap-2.5 py-3.5 text-left"
            >
                <span className="shrink-0 font-mono text-[13px] text-white/40 transition-colors group-hover:text-white/60">
                    {entry.date}
                </span>
                <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-xs text-white/40 transition-colors group-hover:text-white/60">
                    v{entry.version}
                </span>
                <span
                    className={cn(
                        'flex-1 truncate text-base font-semibold transition-colors',
                        open ? 'text-brand' : 'text-white group-hover:text-brand'
                    )}
                >
                    {entry.title}
                </span>
                <motion.span
                    animate={{ rotate: open ? 90 : 0 }}
                    transition={{ duration: 0.25, ease: easeOutExpo }}
                    className="shrink-0"
                >
                    <ChevronRight
                        className={cn('h-3.5 w-3.5 transition-colors', open ? 'text-brand' : 'text-white/40 group-hover:text-brand')}
                    />
                </motion.span>
            </button>

            <div className="col-start-2 row-start-2">
                <AnimatePresence initial={false}>
                    {open && (
                        <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: easeOutExpo }}
                            className="overflow-hidden"
                        >
                            <ul className="flex flex-col gap-1.5 pb-3 pl-0.5">
                                {entry.bullets.map((bullet, index) => (
                                    <li key={index} className="flex items-start gap-2.5 text-[15px] text-white/70">
                                        <BulletTypeTag type={bullet.type} />
                                        <span>{bullet.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
