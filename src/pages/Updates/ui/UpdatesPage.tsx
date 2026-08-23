'use client'
import { motion } from 'motion/react'
import { Footer } from '@/widgets/Footer'
import { Header } from '@/widgets/Header'
import { StarsBackground } from '@/entities/background'
import { HighlightText } from '@/shared/ui/HighlightText'
import { highlights } from '../model/highlights'
import { HighlightAccordionItem } from './HighlightAccordionItem'
import { LatestReleaseSpotlight } from './LatestReleaseSpotlight'

const easeOutExpo = [0.22, 1, 0.36, 1] as const

// 페이지 로드 시 위 → 아래로 이어지는 단일 등장 타임라인. 스포트라이트 카드 내부의
// meta → title → bullets 순서는 이 값을 이어받아 LatestReleaseSpotlight 안에서 처리한다.
const REVEAL_DELAY = { title: 0, subtitle: 0.15, card: 0.3 }

export function UpdatesPage() {
    const [latest, ...rest] = highlights

    return (
        <div className="relative flex min-h-screen flex-col overflow-hidden">
            <StarsBackground />
            <Header />

            <main className="flex-grow px-6 pt-40 pb-32">
                <section className="flex flex-col items-center text-center">
                    <motion.h1
                        className="text-4xl font-semibold tracking-tighter text-white md:text-5xl"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: REVEAL_DELAY.title, ease: easeOutExpo }}
                    >
                        <HighlightText>업데이트</HighlightText> 내역
                    </motion.h1>
                    <motion.p
                        className="mt-6 max-w-xl text-lg text-white/60 md:text-xl"
                        initial={{ y: 16, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: REVEAL_DELAY.subtitle, ease: easeOutExpo }}
                    >
                        미리내가 어떻게 나아지고 있는지 확인해보세요
                    </motion.p>
                </section>

                {!latest ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: easeOutExpo }}
                        className="bg-glass mx-auto mt-20 flex max-w-2xl flex-col items-center gap-3 rounded-3xl border border-white/10 px-8 py-16 text-center"
                    >
                        <p className="text-white/60">아직 등록된 업데이트 내역이 없어요</p>
                        <p className="text-sm text-white/30">새로운 소식이 생기면 이곳에 가장 먼저 올려드릴게요</p>
                    </motion.div>
                ) : (
                    <div className="mx-auto max-w-2xl">
                        <LatestReleaseSpotlight entry={latest} revealDelay={REVEAL_DELAY.card} />

                        {rest.length > 0 && (
                            <div className="relative mt-16 flex flex-col">
                                <span className="absolute top-0 bottom-0 left-[5px] w-px -translate-x-1/2 bg-white/10" />

                                {rest.map((entry, index) => (
                                    <motion.div
                                        key={entry.version}
                                        initial={{ opacity: 0, y: 18 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-80px' }}
                                        transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3), ease: easeOutExpo }}
                                    >
                                        <HighlightAccordionItem entry={entry} defaultOpen={false} />
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        <p className="mt-10 border-t border-white/10 pt-10 text-center text-sm text-white/30">
                            이 외에도 다양한 버그 수정과 안정화 업데이트가 꾸준히 이루어지고 있어요
                        </p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    )
}
