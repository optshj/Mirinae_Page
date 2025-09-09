'use client'
import { useEffect, useState } from 'react'
import { FaWindows } from 'react-icons/fa'

export function DownloadButton() {
    const [downloadUrl, setDownloadUrl] = useState('#')

    useEffect(() => {
        fetch('https://api.github.com/repos/optshj/Mirinae_DesktopCalender/releases/latest')
            .then((response) => response.json())
            .then((data) => {
                const exeAsset = data.assets.find((asset: { name: string }) => asset.name.endsWith('.exe'))

                if (exeAsset) {
                    setDownloadUrl(exeAsset.browser_download_url)
                } else {
                    console.error('최신 릴리스에서 .exe 파일을 찾을 수 없습니다.')
                }
            })
            .catch((error) => {
                console.error('GitHub API 호출 중 오류 발생:', error)
            })
    }, []) // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때 한 번만 실행되도록 함

    return (
        <a href={downloadUrl} download className="bg-brand hover:bg-brand-hover flex cursor-pointer items-center rounded-lg px-4 py-2 text-white">
            <FaWindows className="mr-2 inline-block" />
            Windows로 다운로드하기
        </a>
    )
}
