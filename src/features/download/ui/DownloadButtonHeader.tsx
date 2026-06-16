'use client'
import { sendGAEvent } from '@next/third-parties/google'
import { DownloadUrl } from '../lib/DownloadUrl'
import { Dialog, DialogTrigger } from '@/shared/ui/dialog'
import { Download } from 'lucide-react'
import { DownloadDescription } from '@/entities/decription'
import { Mixpanel } from '@/shared/lib/mixpanel'

export function DownloadButtonHeader() {
    const handleDownload = () => {
        sendGAEvent('event', 'download_button_click', { location: 'mirinae_page' })
        Mixpanel.track('Download Button Click', { location: 'header' })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <a
                    href={DownloadUrl()}
                    download
                    onClick={handleDownload}
                    className="group flex cursor-pointer items-center gap-2 rounded-xl p-2 text-white transition-all duration-300 hover:scale-105 hover:bg-white/20 active:scale-95"
                >
                    <Download className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:-rotate-12" />
                    <span className="text-sm font-medium">다운로드</span>
                </a>
            </DialogTrigger>
            <DownloadDescription />
        </Dialog>
    )
}
