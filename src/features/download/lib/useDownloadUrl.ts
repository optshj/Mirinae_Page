import { useEffect, useState } from 'react'

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
    const [downloadUrl, setDownloadUrl] = useState('#')

    useEffect(() => {
        fetchDownloadUrl().then((url) => {
            if (url) setDownloadUrl(url)
        })
    }, [])

    return downloadUrl
}
