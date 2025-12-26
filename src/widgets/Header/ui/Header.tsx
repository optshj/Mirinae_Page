'use client'
import { useState, useEffect } from 'react'
import { Logo } from '@/entities/logo'
import { DownloadButtonHeader } from '@/features/download'

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
                <div className="flex-shrink-0">
                    <Logo />
                </div>

                <DownloadButtonHeader />
            </div>
        </header>
    )
}
