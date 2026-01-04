import React from 'react'
import { motion } from 'framer-motion'
import { FaWindows } from 'react-icons/fa'

interface KeyProps {
    children?: React.ReactNode
    width?: string
    isActive?: boolean
    align?: 'center' | 'left'
}

export function Key({ children, width = 'w-24', isActive = false, align = 'center' }: KeyProps) {
    return (
        <div
            className={` ${width} relative flex h-24 flex-col rounded-xl border transition-all duration-300 ${
                align === 'center' ? 'items-center justify-center' : 'items-start justify-end p-4'
            } ${isActive ? 'z-10 border-purple-500/60 bg-zinc-800 shadow-[0_0_50px_rgba(168,85,247,0.4)]' : 'border-white/10 bg-zinc-900/80 shadow-xl'} `}
        >
            <div className={`text-2xl ${isActive ? 'font-bold text-purple-400' : 'text-zinc-300'} font-medium`}>{children}</div>
        </div>
    )
}

export function VisualKeyboard() {
    return (
        <div className="flex items-center justify-center p-8 font-sans text-white">
            <div className="flex flex-col gap-4 rounded-[3rem] p-12">
                <div className="flex gap-3">
                    {['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='].map((k, i) => (
                        <Key key={i}>{k}</Key>
                    ))}
                    <Key width="w-52" align="left">
                        ←
                    </Key>
                </div>

                <div className="flex gap-3">
                    <Key width="w-40" align="left">
                        Tab
                    </Key>
                    {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'].map((k) => (
                        <Key key={k}>{k}</Key>
                    ))}
                    <Key width="w-36">\</Key>
                </div>

                <div className="flex gap-3">
                    <Key width="w-48" align="left">
                        Caps Lock
                    </Key>
                    {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'"].map((k) => (
                        <Key key={k}>{k}</Key>
                    ))}
                    <motion.div initial={{ scale: 0.98 }} animate={{ scale: 1.02 }} transition={{ repeat: Infinity, duration: 1.5, repeatType: 'reverse' }}>
                        <Key width="w-56" align="left" isActive={true}>
                            Enter
                        </Key>
                    </motion.div>
                </div>

                <div className="flex gap-3">
                    <Key width="w-64" align="left">
                        Shift
                    </Key>
                    {['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'].map((k) => (
                        <Key key={k}>{k}</Key>
                    ))}
                    <Key width="w-68" align="left">
                        Shift
                    </Key>
                </div>

                <div className="flex gap-3">
                    <motion.div initial={{ scale: 0.98 }} animate={{ scale: 1.02 }} transition={{ repeat: Infinity, duration: 1.5, repeatType: 'reverse' }}>
                        <Key width="w-32" isActive={true}>
                            Ctrl
                        </Key>
                    </motion.div>
                    <Key width="w-32">Fn</Key>

                    <Key width="w-32">
                        <FaWindows className="h-10 w-10" />
                    </Key>

                    <Key width="w-32">Alt</Key>

                    <Key width="w-[40rem]" />

                    <Key width="w-32">Alt</Key>
                    <Key width="w-32">Opt</Key>
                    <Key width="w-32">Ctrl</Key>
                </div>
            </div>
        </div>
    )
}
