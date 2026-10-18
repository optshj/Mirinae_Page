import { useEffect, useState } from 'react'

const RELEASES_PAGE = 'https://github.com/optshj/Mirinae/releases/latest'

let cache: Promise<string | null> | null = null

function fetchDownloadUrl() {
    cache ??= fetch('https://api.github.com/repos/optshj/Mirinae_DesktopCalender/releases/latest')
        .then((response) => response.json())
        .then((data) => {
            const exeAsset = data.assets.find((asset: { name: string }) => asset.name.endsWith('.exe'))
            if (!exeAsset) {
                console.error('최신 릴리스에서 .exe 파일을 찾을 수 없습니다.')
                return null
            }
            return exeAsset.browser_download_url as string
        })
        .catch((error) => {
            console.error('GitHub API 호출 중 오류 발생:', error)
            cache = null
            return null
        })
    return cache
}

export function useDownloadUrl() {
    // API 응답 전·실패 시에도 클릭이 헛돌지 않게 릴리스 페이지로 폴백 ('#'이면 download 속성 때문에 페이지 HTML이 받아진다)
    const [downloadUrl, setDownloadUrl] = useState(RELEASES_PAGE)

    useEffect(() => {
        fetchDownloadUrl().then((url) => {
            if (url) setDownloadUrl(url)
        })
    }, [])

    return downloadUrl
}
