'use client'
import { sendGAEvent } from '@next/third-parties/google'
import { FaWindows } from 'react-icons/fa'
import { useDownloadUrl } from '../lib/useDownloadUrl'
import { Dialog, DialogTrigger } from '@/shared/ui/dialog'
import { DownloadDescription } from '@/entities/decription'
import { Mixpanel } from '@/shared/lib/mixpanel'

export function DownloadButton() {
    const downloadUrl = useDownloadUrl()
    const handleDownload = () => {
        sendGAEvent('event', 'download_button_click', { location: 'mirinae_page' })
        Mixpanel.track('Download Button Click', { location: 'main_section' })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <a
                    href={downloadUrl}
                    download
                    className="bg-brand hover:bg-brand-hover flex cursor-pointer items-center rounded-lg px-4 py-2 text-white transition-all active:scale-95"
                    onClick={handleDownload}
                >
                    <FaWindows className="mr-2 inline-block" />
                    Windows용 다운로드
                </a>
            </DialogTrigger>
            <DownloadDescription />
        </Dialog>
    )
}
