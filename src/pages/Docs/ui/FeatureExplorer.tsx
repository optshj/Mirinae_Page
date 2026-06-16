'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export interface Feature {
    subTitle: string
    title: string
    description: string
    visual: React.ReactNode
}

export interface Category {
    title: string
    features: Feature[]
}

export const FeatureExplorer = ({ categories }: { categories: Category[] }) => {
    const flat = categories.flatMap((category) => category.features)
    const [selected, setSelected] = useState(0)
    const current = flat[selected]

    let offset = 0
    const categoryOffsets = categories.map((category) => {
        const start = offset
        offset += category.features.length
        return start
    })

    return (
        <div className="mx-auto max-w-6xl px-6 py-12 lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
            {/* Sidebar (desktop) */}
            <nav className="hidden lg:sticky lg:top-32 lg:block lg:h-fit lg:self-start">
                {categories.map((category, ci) => (
                    <div key={category.title} className="mb-6">
                        <h3 className="mb-2 px-3 text-xs font-semibold tracking-wider text-zinc-300 uppercase">{category.title}</h3>
                        <ul className="space-y-1">
                            {category.features.map((feature, fi) => {
                                const idx = categoryOffsets[ci] + fi
                                const active = idx === selected
                                return (
                                    <li key={feature.title}>
                                        <button
                                            onClick={() => setSelected(idx)}
                                            className={`block w-full cursor-pointer rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                                                active ? 'bg-brand/10 text-brand font-semibold' : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                                            }`}
                                        >
                                            {feature.title}
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                ))}
            </nav>

            {/* Tabs (mobile) - 카테고리별 그룹 */}
            <div className="mb-8 space-y-4 lg:hidden">
                {categories.map((category, ci) => (
                    <div key={category.title}>
                        <p className="mb-2 text-xs font-semibold tracking-wider text-zinc-500 uppercase">{category.title}</p>
                        <div className="flex flex-wrap gap-2">
                            {category.features.map((feature, fi) => {
                                const idx = categoryOffsets[ci] + fi
                                return (
                                    <button
                                        key={feature.title}
                                        onClick={() => setSelected(idx)}
                                        className={`rounded-full px-4 py-2 text-sm whitespace-nowrap transition-all duration-200 ${
                                            idx === selected ? 'bg-brand text-white shadow-lg' : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                                        }`}
                                    >
                                        {feature.title}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Content */}
            <motion.div layout transition={{ duration: 0.3, ease: 'easeInOut' }} className="lg:min-h-[660px]">
                <AnimatePresence mode="wait">
                    <motion.div key={current.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
                        <h3 className="text-brand text-sm font-semibold">{current.subTitle}</h3>
                        <p className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">{current.title}</p>
                        <p className="mt-4 text-base leading-7 whitespace-pre-line text-gray-400">{current.description}</p>
                        <div className="bg-glass mt-8 flex min-h-[480px] w-full items-center justify-center rounded-3xl p-3 shadow-xl">{current.visual}</div>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </div>
    )
}
