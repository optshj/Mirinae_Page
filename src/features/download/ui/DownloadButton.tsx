'use client'
import { FaWindows } from 'react-icons/fa'
import { useDownloadUrl } from '../lib/useDownloadUrl'
import { useIsMobileDevice } from '../lib/useIsMobileDevice'
import { Dialog, DialogTrigger } from '@/shared/ui/dialog'
import { DownloadDescription, PCOnlyDescription } from '@/entities/decription'
import { posthog } from '@/shared/lib/posthog'

export function DownloadButton() {
    const downloadUrl = useDownloadUrl()
    const isMobile = useIsMobileDevice()
    const handleDownload = () => {
        posthog.capture('download_button_click', { location: 'main_section', device: isMobile ? 'mobile' : 'desktop' })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <a
                    href={isMobile ? undefined : downloadUrl}
                    download={isMobile ? undefined : true}
                    className="bg-brand hover:bg-brand-hover flex cursor-pointer items-center rounded-lg px-4 py-2 text-white transition-all active:scale-95"
                    onClick={handleDownload}
                >
                    <FaWindows className="mr-2 inline-block" />
                    Windows용 다운로드
                </a>
            </DialogTrigger>
            {isMobile ? <PCOnlyDescription /> : <DownloadDescription />}
        </Dialog>
    )
}
