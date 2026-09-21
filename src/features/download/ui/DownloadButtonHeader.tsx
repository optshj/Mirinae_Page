'use client'
import { sendGAEvent } from '@next/third-parties/google'
import { useDownloadUrl } from '../lib/useDownloadUrl'
import { useIsMobileDevice } from '../lib/useIsMobileDevice'
import { Dialog, DialogTrigger } from '@/shared/ui/dialog'
import { Download } from 'lucide-react'
import { DownloadDescription, PCOnlyDescription } from '@/entities/decription'
import { Mixpanel } from '@/shared/lib/mixpanel'

export function DownloadButtonHeader({ menuItem = false }: { menuItem?: boolean }) {
    const downloadUrl = useDownloadUrl()
    const isMobile = useIsMobileDevice()
    const handleDownload = () => {
        sendGAEvent('event', 'download_button_click', { location: 'mirinae_page' })
        Mixpanel.track('Download Button Click', { location: 'header', device: isMobile ? 'mobile' : 'desktop' })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <a
                    href={isMobile ? undefined : downloadUrl}
                    download={isMobile ? undefined : true}
                    onClick={handleDownload}
                    className={
                        menuItem
                            ? 'flex items-center gap-3 rounded-xl px-4 py-3 text-white transition-all hover:bg-white/10 active:scale-95'
                            : 'group flex cursor-pointer items-center gap-2 rounded-xl p-2 text-white transition-all duration-300 hover:scale-105 hover:bg-white/20 active:scale-95'
                    }
                >
                    <Download className={menuItem ? 'h-4 w-4' : 'h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:-rotate-12'} />
                    <span className="text-sm font-medium">다운로드</span>
                </a>
            </DialogTrigger>
            {isMobile ? <PCOnlyDescription /> : <DownloadDescription />}
        </Dialog>
    )
}
