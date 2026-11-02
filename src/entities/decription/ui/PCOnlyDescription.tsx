'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/shared/ui/dialog'
import { Check, Copy } from 'lucide-react'
import { posthog } from '@/shared/lib/posthog'

const SITE_URL = 'mirinae.today'

// 폰에서는 아래에서 올라오는 시트(복사 버튼이 엄지 닿는 자리), sm 이상(맥 등 데스크톱)에서는 가운데 창
export function PCOnlyDescription() {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        posthog.capture('pc_link_copy', { location: 'pc_only_dialog' })
        const distinctId = posthog.get_distinct_id()
        await navigator.clipboard.writeText(`https://www.${SITE_URL}/${distinctId ? `?hid=${distinctId}` : ''}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    return (
        <DialogContent
            showCloseButton={false}
            className="bg-glass top-auto bottom-0 left-0 max-w-none translate-x-0 translate-y-0 gap-5 rounded-t-3xl rounded-b-none border-none px-6 pt-3 pb-[calc(2.25rem+env(safe-area-inset-bottom))] text-white max-sm:data-[state=closed]:slide-out-to-bottom max-sm:data-[state=open]:slide-in-from-bottom sm:top-[50%] sm:bottom-auto sm:left-[50%] sm:max-w-md sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-2xl sm:pt-8 sm:pb-6"
        >
            <div aria-hidden className="mx-auto mb-2 h-1 w-10 rounded-full bg-white/30 sm:hidden" />

            <div className="flex items-center gap-3.5">
                <Image src="/icon.svg" alt="" width={52} height={52} className="rounded-[13px]" />
                <div className="text-left">
                    <p className="text-[13px] font-semibold text-slate-300">미리내 · Windows 10·11</p>
                    <DialogTitle className="mt-0.5 text-[21px] font-bold tracking-tight text-white">PC에서 설치하는 앱이에요</DialogTitle>
                </div>
            </div>

            <DialogDescription className="text-left text-[15px] leading-relaxed text-slate-300">
                PC 브라우저에서 아래 주소로 들어와 받아 주세요.
            </DialogDescription>

            <motion.button
                onClick={handleCopy}
                whileTap={{ scale: 0.96 }}
                animate={copied ? { scale: [1, 1.03, 1] } : { scale: 1 }}
                transition={{ duration: 0.25 }}
                className="bg-glass flex w-full items-center justify-between gap-3 rounded-xl px-[18px] py-4 text-left transition-colors hover:bg-white/10"
            >
                <span className="truncate text-lg font-extrabold tracking-tight text-white">{SITE_URL}</span>
                <span className="relative flex h-4 shrink-0 items-center overflow-hidden text-[13px] font-medium text-blue-300">
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
                                주소 복사
                            </motion.span>
                        )}
                    </AnimatePresence>
                </span>
            </motion.button>

            <DialogClose className="w-full py-2.5 text-[15px] font-semibold text-slate-300 transition-colors hover:text-white">닫기</DialogClose>
        </DialogContent>
    )
}
