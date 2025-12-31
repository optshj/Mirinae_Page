import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface KeyProps {
    children: React.ReactNode
    width?: string
    isActive?: boolean
    align?: 'center' | 'left'
}
export const Key = ({ children, width = 'w-24', isActive = false, align = 'center' }: KeyProps) => {
    return (
        <motion.div
            animate={{
                y: isActive ? 4 : 0,
                scale: isActive ? 0.96 : 1
            }}
            transition={{ type: 'spring', stiffness: 600, damping: 30 }}
            className={` ${width} relative flex h-24 flex-col rounded-xl border transition-all duration-200 ${
                align === 'center' ? 'items-center justify-center' : 'items-start justify-end p-4'
            } ${isActive ? 'z-10 border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'border-white/10 bg-zinc-900/80 shadow-xl'} `}
        >
            <div className={`text-2xl font-medium transition-colors duration-200 ${isActive ? 'text-white' : 'text-zinc-500'}`}>{children}</div>
        </motion.div>
    )
}

export const ShortcutVisual = () => {
    const [isPressed, setIsPressed] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setIsPressed(true)
            setTimeout(() => setIsPressed(false), 200)
        }, 1500)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative flex items-center justify-center p-20">
            <div className="flex items-center gap-6">
                <Key isActive={isPressed} width="w-32">
                    Ctrl
                </Key>

                <motion.div
                    animate={{
                        opacity: isPressed ? 1 : 0.2,
                        scale: isPressed ? 1.1 : 1
                    }}
                    className="text-4xl font-light text-white"
                >
                    +
                </motion.div>

                <Key isActive={isPressed} width="w-48">
                    Enter
                </Key>
            </div>
        </div>
    )
}
