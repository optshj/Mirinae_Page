import { useEffect, useState } from 'react'

export function DownloadUrl() {
    const [downloadUrl, setDownloadUrl] = useState('#')

    useEffect(() => {
        fetch('https://api.github.com/repos/optshj/Mirinae_DesktopCalender/releases/latest')
            .then((response) => response.json())
            .then((data) => {
                const exeAsset = data.assets.find((asset: { name: string }) => asset.name.endsWith('.exe'))

                if (exeAsset) {
                    // .exe 파일이 있으면 state에 다운로드 URL 저장
                    setDownloadUrl(exeAsset.browser_download_url)
                } else {
                    // .exe 파일을 찾지 못한 경우
                    console.error('최신 릴리스에서 .exe 파일을 찾을 수 없습니다.')
                }
            })
            .catch((error) => {
                console.error('GitHub API 호출 중 오류 발생:', error)
            })
    }, []) // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때 한 번만 실행되도록 함
    return downloadUrl
}
