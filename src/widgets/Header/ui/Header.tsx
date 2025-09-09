'use client'
import { Logo } from '@/entities/logo'
import { DownloadButtonHeader } from '@/features/download'
import { useState, useEffect } from 'react'

export function Header() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-background-primary shadow-md' : ''}`}>
            <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
                <Logo />
                <DownloadButtonHeader />
            </div>
        </header>
    )
}
