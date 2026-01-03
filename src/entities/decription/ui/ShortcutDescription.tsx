'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Plus } from 'lucide-react'

interface KeyProps {
    children: React.ReactNode
    width?: string
    isActive?: boolean
}

export const Key = ({ children, width = 'w-24', isActive = false }: KeyProps) => {
    return (
        <div className="relative">
            <motion.div
                animate={{
                    y: isActive ? 8 : 0,
                    boxShadow: isActive ? 'inset 0px 4px 8px rgba(0,0,0,0.6), 0px 0px 0px rgba(0,0,0,0)' : '0px 10px 0px rgb(39, 39, 42), 0px 15px 20px rgba(0,0,0,0.5)'
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className={` ${width} relative flex h-24 flex-col items-start justify-end rounded-xl border p-4 transition-colors duration-500 ${
                    isActive ? 'border-white/20 bg-zinc-800' : 'border-white/10 bg-zinc-900'
                }`}
            >
                <motion.div animate={{ opacity: isActive ? 1 : 0.4 }} transition={{ duration: 0.2 }} className="text-2xl font-bold text-white">
                    {children}
                </motion.div>
            </motion.div>
        </div>
    )
}

export const ShortcutDescription = () => {
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { amount: 0.3 })
    const [isPressed, setIsPressed] = useState(false)

    useEffect(() => {
        if (!isInView) {
            setIsPressed(false)
            return
        }

        let pressTimer: NodeJS.Timeout

        const interval = setInterval(() => {
            setIsPressed(true)

            pressTimer = setTimeout(() => {
                setIsPressed(false)
            }, 500)
        }, 1500)

        return () => {
            clearInterval(interval)
            clearTimeout(pressTimer)
        }
    }, [isInView])

    return (
        <div ref={containerRef} className="flex items-center justify-center py-12">
            <div className="flex items-center gap-8">
                <Key isActive={isPressed} width="w-32">
                    Ctrl
                </Key>

                <motion.div
                    animate={{
                        opacity: isPressed ? 1 : 0.3
                    }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 text-slate-400"
                >
                    <Plus size="32" />
                </motion.div>

                <Key isActive={isPressed} width="w-48">
                    Enter
                </Key>
            </div>
        </div>
    )
}
