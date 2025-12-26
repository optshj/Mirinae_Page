'use client'
import React from 'react'
import { sendGAEvent } from '@next/third-parties/google'
import { DownloadUrl } from '../lib/DownloadUrl'
import { Dialog, DialogTrigger } from '@/shared/ui/dialog'
import { Download } from 'lucide-react'
import { DownloadDescription } from '@/entities/decription'

export function DownloadButtonHeader() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <a
                    href={DownloadUrl()}
                    download
                    onClick={() => sendGAEvent('event', 'download_button_click', { location: 'mirinae_page' })}
                    className="group flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-white/20 active:scale-95"
                >
                    <Download className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:-rotate-12" />
                    <span className="font-medium">다운로드</span>
                </a>
            </DialogTrigger>
            <DownloadDescription />
        </Dialog>
    )
}
