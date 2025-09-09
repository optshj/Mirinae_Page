import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

export const metadata: Metadata = {
    title: '미리내 | 당신의 하루를 별처럼 빛나게',
    description: '미리내는 데스크톱 캘린더 위젯입니다. 설치 후 바탕화면에서 바로 일정을 확인하고 관리할 수 있습니다. 당신의 하루를 별처럼 빛나게, 미리내와 함께 하세요.',
    keywords: ['미리내', '일정 관리', '할 일 목록', '생산성', '시간 관리', '캘린더', '리마인더', '목표 설정', '집중력 향상'],
    openGraph: {
        title: '미리내 | 당신의 하루를 별처럼 빛나게',
        description: '당신의 하루를 별처럼 빛나게, 미리내와 함께 하세요.',
        url: 'https://mirinaecalendar.vercel.app',
        siteName: '미리내',
        locale: 'ko_KR',
        type: 'website'
    },
    verification: {
        google: 'huSHYvBftuJFa028T6tGdShVcrWecu4qHuQWqhyKrmU',
        other: {
            'naver-site-verification': 'eb1b34008d84666681f83ab2b09ee63faea83204'
        }
    }
}
export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="kr">
            <body className={`antialiased`}>
                <Analytics />
                <SpeedInsights />
                {children}
            </body>
        </html>
    )
}
