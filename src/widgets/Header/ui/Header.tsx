'use client'
import { useState, useEffect } from 'react'
import { Logo } from '@/entities/logo'
import { DownloadButtonHeader } from '@/features/download'
import Link from 'next/link'
import { Mixpanel } from '@/shared/lib/mixpanel'
import { MessageSquare, Compass } from 'lucide-react'

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 200)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className="fixed top-5 left-0 z-50 w-full">
            <div
                className={`mx-auto flex items-center justify-between rounded-full px-6 py-3 transition-all duration-1000 ${isScrolled ? 'bg-glass max-w-2xl shadow-md' : 'max-w-5xl'} `}
            >
                <Link href="/" className="flex items-center gap-2">
                    <Logo />
                </Link>

                <div className="flex items-center gap-2 sm:gap-4">
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
            </div>
        </header>
    )
}
