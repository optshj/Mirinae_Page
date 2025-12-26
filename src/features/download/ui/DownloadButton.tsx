'use client'
import { sendGAEvent } from '@next/third-parties/google'
import { FaWindows } from 'react-icons/fa'
import { DownloadUrl } from '../lib/DownloadUrl'
import { Dialog, DialogTrigger } from '@/shared/ui/dialog'
import { DownloadDescription } from '@/entities/decription'

export function DownloadButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <a
                    href={DownloadUrl()}
                    download
                    className="bg-brand hover:bg-brand-hover flex cursor-pointer items-center rounded-lg px-4 py-2 text-white"
                    onClick={() => sendGAEvent('event', 'download_button_click', { location: 'mirinae_page' })}
                >
                    <FaWindows className="mr-2 inline-block" />
                    Windows로 다운로드하기
                </a>
            </DialogTrigger>
            <DownloadDescription />
        </Dialog>
    )
}
