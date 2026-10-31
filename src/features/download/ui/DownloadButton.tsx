'use client'
import { FaWindows } from 'react-icons/fa'
import { useDownloadUrl } from '../lib/useDownloadUrl'
import { useDeviceOs } from '../lib/useDeviceOs'
import { Dialog, DialogTrigger } from '@/shared/ui/dialog'
import { DownloadDescription, PCOnlyDescription } from '@/entities/decription'
import { posthog } from '@/shared/lib/posthog'

export function DownloadButton() {
    const downloadUrl = useDownloadUrl()
    const os = useDeviceOs()
    const canInstall = os === 'windows'
    const handleDownload = () => {
        posthog.capture('download_button_click', { location: 'main_section', device: os === 'mobile' ? 'mobile' : 'desktop' })
        if (!canInstall && os !== 'mobile') posthog.capture('unsupported_os_download_click', { location: 'main_section', os })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <a
                    href={canInstall ? downloadUrl : undefined}
                    download={canInstall ? true : undefined}
                    className="bg-brand hover:bg-brand-hover flex cursor-pointer items-center rounded-lg px-4 py-2 text-black transition-all active:scale-95"
                    onClick={handleDownload}
                >
                    <FaWindows className="mr-2 inline-block" />
                    Windows용 다운로드
                </a>
            </DialogTrigger>
            {canInstall ? <DownloadDescription /> : <PCOnlyDescription />}
        </Dialog>
    )
}
