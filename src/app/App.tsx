import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleAnalytics } from '@next/third-parties/google'
import MixpanelInit from './MixpanelInit'
import './globals.css'

export const metadata: Metadata = {
    applicationName: '미리내',
    title: '미리내 | 당신의 하루를 별처럼 빛나게',
    description:
        '미리내는 데스크톱 캘린더 위젯입니다. 설치 후 바탕화면에서 바로 일정을 확인하고 관리할 수 있습니다. 사용자는 캘린더를 이용해 유연한 일정관리를 할 수 있습니다. 구글 캘린더와 연동하여 일정이 자동으로 업데이트됩니다. 미리내와 함께 당신의 하루를 별처럼 빛나게 만들어보세요.',
    keywords: [
        '미리내',
        '캘린더',
        '일정 관리',
        '할 일 목록',
        '생산성',
        '시간 관리',
        '리마인더',
        '목표 설정',
        '집중력 향상',
        '구글캘린더',
        '바탕화면',
        '바탕화면 캘린더',
        '바탕화면 위젯',
        '데스크톱 위젯',
        '윈도우 위젯',
        'mirinae',
        'calendar',
        'widget',
        'desktop',
        'desktop widget',
        'productivity',
        'schedule',
        'task',
        'todo',
        'reminder',
        'time management'
    ],
    alternates: {
        canonical: 'https://www.mirinaecalendar.store/'
    },
    openGraph: {
        title: '미리내 | 당신의 하루를 별처럼 빛나게',
        description: '당신의 하루를 별처럼 빛나게, 미리내와 함께 하세요.',
        url: 'https://www.mirinaecalendar.store/',
        siteName: '미리내',
        locale: 'ko_KR',
        type: 'website',
        images: [
            {
                url: 'https://www.mirinaecalendar.store/ogImage.webp',
                alt: '미리내 | 당신의 하루를 별처럼 빛나게',
                width: 1200,
                height: 630
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: '미리내 | 당신의 하루를 별처럼 빛나게',
        description: '당신의 하루를 별처럼 빛나게, 미리내와 함께 하세요.',
        images: ['https://www.mirinaecalendar.store/ogImage.webp']
    },
    icons: {
        icon: '/favicon.ico'
    },
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1
    },
    verification: {
        google: 'huSHYvBftuJFa028T6tGdShVcrWecu4qHuQWqhyKrmU',
        other: {
            'naver-site-verification': 'eb1b34008d84666681f83ab2b09ee63faea83204'
        }
    }
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '미리내',
    alternateName: ['Mirinae', '미리내 캘린더'],
    url: 'https://www.mirinaecalendar.store/'
}

const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '미리내',
    alternateName: ['Mirinae', '미리내 캘린더'],
    url: 'https://www.mirinaecalendar.store/',
    logo: 'https://www.mirinaecalendar.store/icon.svg'
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="ko">
            <body className={`antialiased`}>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
                <MixpanelInit />
                <Analytics />
                <SpeedInsights />
                <GoogleAnalytics gaId="G-922SR40MS9" />
                {children}
            </body>
        </html>
    )
}
