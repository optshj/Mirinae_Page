'use client'
import { sendGAEvent } from '@next/third-parties/google'
import { FaWindows } from 'react-icons/fa'
import { DownloadUrl } from '../lib/DownloadUrl'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog'

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
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>🔁 다운로드 진행중!</DialogTitle>
                    <DialogDescription>
                        <br />
                        ✅ 파일이 다운로드되면 mirinae-setup-.exe 파일을 실행시켜주세요!
                        <br />✅ 백신프로그램의 경고문구가 나올수 있어요!
                        <br />
                        바이러스는 <span className="font-semibold">절대</span> 없으니 안심하시고 설치해도됩니다! <br />
                        <br />
                        😄 설치가 완료되면 자동으로 실행됩니다!
                        <br /> <span className="font-semibold">구글로그인</span> 후 사용해주세요!
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
