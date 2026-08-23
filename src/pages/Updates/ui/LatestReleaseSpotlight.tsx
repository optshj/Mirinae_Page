'use client'
import { motion } from 'motion/react'
import type { UpdateHighlight } from '../model/highlights'
import { BulletTypeTag } from './BulletTypeTag'

const easeOutExpo = [0.22, 1, 0.36, 1] as const

// meta → title → bullets가 카드 프레임(revealDelay) 등장 직후부터 순서대로 이어지도록 잡은
// 고정 간격. UpdatesPage의 히어로 타임라인과 이어지는 값이므로 revealDelay만 부모가 넘겨준다.
const STAGGER = { meta: 0.12, title: 0.22, bullets: 0.32 }

interface LatestReleaseSpotlightProps {
    entry: UpdateHighlight
    revealDelay?: number
}

export function LatestReleaseSpotlight({ entry, revealDelay = 0 }: LatestReleaseSpotlightProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: revealDelay, ease: easeOutExpo }}
            className="bg-glass relative mx-auto mt-16 max-w-2xl rounded-3xl border border-white/10 p-8 md:p-10"
        >
            <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: revealDelay + STAGGER.meta, ease: easeOutExpo }}
                className="relative flex flex-wrap items-center gap-2.5"
            >
                <span className="font-mono text-[13px] text-white/40">{entry.date}</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-xs text-white/40">
                    v{entry.version}
                </span>
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: revealDelay + STAGGER.title, ease: easeOutExpo }}
                className="relative mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl"
            >
                {entry.title}
            </motion.h2>

            <motion.ul
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: revealDelay + STAGGER.bullets, ease: easeOutExpo }}
                className="relative mt-5 flex flex-col gap-2.5"
            >
                {entry.bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-[15px] text-white/70">
                        <BulletTypeTag type={bullet.type} />
                        <span>{bullet.text}</span>
                    </li>
                ))}
            </motion.ul>
        </motion.div>
    )
}
