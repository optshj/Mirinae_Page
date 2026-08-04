'use client'
import { motion } from 'motion/react'

interface HighlightTextProps {
    children: React.ReactNode
    delay?: number
    className?: string
}

export function HighlightText({ children, delay = 0.5, className }: HighlightTextProps) {
    return (
        <span className={`relative inline-block font-bold text-white ${className ?? ''}`}>
            {children}
            <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ delay, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-brand/70 absolute bottom-1 left-0 -z-10 h-6 w-full"
            />
        </span>
    )
}
