import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
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
                transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                className={` ${width} relative flex h-24 flex-col items-start justify-end rounded-xl border p-4 transition-colors duration-500 ${isActive ? 'border-white/20 bg-zinc-800' : 'border-white/10 bg-zinc-900'}`}
            >
                <motion.div
                    animate={{
                        opacity: isActive ? 1 : 0.4
                    }}
                    transition={{ duration: 0.4 }}
                    className={`text-2xl font-bold text-white`}
                >
                    {children}
                </motion.div>
            </motion.div>
        </div>
    )
}

export const ShortcutDescription = () => {
    const [isPressed, setIsPressed] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setIsPressed(true)
            setTimeout(() => setIsPressed(false), 800)
        }, 1500)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex items-center justify-center">
            <div className="flex items-center gap-8">
                <Key isActive={isPressed} width="w-32">
                    Ctrl
                </Key>

                <motion.div
                    animate={{
                        opacity: isPressed ? 1 : 0.2
                    }}
                    transition={{ duration: 0.5 }}
                    className="mt-2 text-white"
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
