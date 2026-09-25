'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/dialog'
import { Check, Copy, Monitor } from 'lucide-react'
import { posthog } from '@/shared/lib/posthog'

const SITE_URL = 'mirinae.today'

export function PCOnlyDescription() {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        posthog.capture('pc_link_copy', { location: 'pc_only_dialog' })
        await navigator.clipboard.writeText(`https://www.${SITE_URL}/?utm_source=mobile_handoff`)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    return (
        <DialogContent className="bg-glass rounded-2xl border-none py-12 text-white">
            <DialogHeader className="flex flex-col items-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                    <Monitor className="h-8 w-8 text-blue-300" />
                </div>
                <DialogTitle className="text-center text-2xl font-bold tracking-tight text-white">PC에서 다운로드해주세요</DialogTitle>
                <DialogDescription className="text-center text-slate-300">
                    미리내는 Windows PC에서 실행되는 데스크톱 앱이에요.
                    <br />
                    아래 주소를 복사해서 PC로 옮겨 접속해주세요.
                </DialogDescription>
            </DialogHeader>

            <motion.button
                onClick={handleCopy}
                whileTap={{ scale: 0.96 }}
                animate={copied ? { scale: [1, 1.03, 1] } : { scale: 1 }}
                transition={{ duration: 0.25 }}
                className="group bg-glass mt-2 flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left transition-colors hover:bg-white/10"
            >
                <span className="truncate font-mono text-sm text-white">{SITE_URL}</span>
                <span className="relative flex h-4 shrink-0 items-center gap-1.5 overflow-hidden text-xs font-medium text-blue-300">
                    <AnimatePresence mode="wait" initial={false}>
                        {copied ? (
                            <motion.span
                                key="copied"
                                initial={{ y: 8, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -8, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="flex items-center gap-1.5 text-emerald-300"
                            >
                                <Check className="h-3.5 w-3.5" />
                                복사됨
                            </motion.span>
                        ) : (
                            <motion.span
                                key="copy"
                                initial={{ y: 8, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -8, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="flex items-center gap-1.5"
                            >
                                <Copy className="h-3.5 w-3.5" />
                                복사하기
                            </motion.span>
                        )}
                    </AnimatePresence>
                </span>
            </motion.button>
        </DialogContent>
    )
}
