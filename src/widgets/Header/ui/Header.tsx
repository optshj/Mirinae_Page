'use client'
import { useState, useEffect } from 'react'
import { Logo } from '@/entities/logo'
import { DownloadButtonHeader } from '@/features/download'
import Link from 'next/link'
import { Mixpanel } from '@/shared/lib/mixpanel'
import { MessageSquare, Compass, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 200)
            if (mobileMenuOpen) setMobileMenuOpen(false)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [mobileMenuOpen])

    return (
        <header className="fixed top-5 left-0 z-50 w-full px-4">
            <div
                className={`mx-auto flex items-center justify-between rounded-full px-6 py-3 transition-all duration-1000 ${isScrolled ? 'bg-glass max-w-2xl shadow-md' : 'max-w-5xl'} `}
            >
                <Link href="/" className="flex items-center gap-2">
                    <Logo />
                </Link>

                {/* 데스크톱 네비게이션 */}
                <div className="hidden items-center md:flex">
                    <Link
                        href="/docs"
                        onClick={() => Mixpanel.track('Docs Link Click', { location: 'header' })}
                        className="group flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-white/10 active:scale-95"
                    >
                        <Compass className="h-4 w-4 transition-transform group-hover:-rotate-12" />
                        <span className="text-sm font-medium">기능 소개</span>
                    </Link>
                    <Link
                        href="/bug-report"
                        onClick={() => Mixpanel.track('Bug Report Link Click', { location: 'header' })}
                        className="group flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-white/10 active:scale-95"
                    >
                        <MessageSquare className="h-4 w-4 transition-transform group-hover:-rotate-12" />
                        <span className="text-sm font-medium">제보하기</span>
                    </Link>
                    <DownloadButtonHeader />
                </div>

                {/* 모바일 햄버거 버튼 */}
                <button
                    className="flex items-center justify-center rounded-xl p-2 text-white transition-colors hover:bg-white/10 md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="메뉴"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {mobileMenuOpen ? (
                            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                <X className="h-5 w-5" />
                            </motion.span>
                        ) : (
                            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                <Menu className="h-5 w-5" />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* 모바일 메뉴 드롭다운 */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.2 }}
                        className="bg-glass mx-auto mt-2 max-w-5xl overflow-hidden rounded-2xl border border-white/10 shadow-xl md:hidden"
                    >
                        <div className="flex flex-col p-2">
                            <Link
                                href="/docs"
                                onClick={() => {
                                    Mixpanel.track('Docs Link Click', { location: 'header' })
                                    setMobileMenuOpen(false)
                                }}
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-white transition-colors hover:bg-white/10"
                            >
                                <Compass className="h-4 w-4" />
                                <span className="text-sm font-medium">기능 소개</span>
                            </Link>
                            <Link
                                href="/bug-report"
                                onClick={() => {
                                    Mixpanel.track('Bug Report Link Click', { location: 'header' })
                                    setMobileMenuOpen(false)
                                }}
                                className="flex items-center gap-3 rounded-xl px-4 py-3 text-white transition-colors hover:bg-white/10"
                            >
                                <MessageSquare className="h-4 w-4" />
                                <span className="text-sm font-medium">제보하기</span>
                            </Link>
                            <div className="px-2 py-1">
                                <DownloadButtonHeader />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
