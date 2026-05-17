'use client'
import { sendGAEvent } from '@next/third-parties/google'
import { FaWindows } from 'react-icons/fa'
import { DownloadUrl } from '../lib/DownloadUrl'
import { Dialog, DialogTrigger } from '@/shared/ui/dialog'
import { DownloadDescription } from '@/entities/decription'
import { Mixpanel } from '@/shared/lib/mixpanel'

export function DownloadButton() {
    const handleDownload = () => {
        sendGAEvent('event', 'download_button_click', { location: 'mirinae_page' })
        Mixpanel.track('Download Button Click', { location: 'main_section' })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <a
                    href={DownloadUrl()}
                    download
                    className="bg-brand hover:bg-brand-hover flex cursor-pointer items-center rounded-lg px-4 py-2 text-white transition-colors"
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
