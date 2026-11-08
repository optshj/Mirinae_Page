import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SmoothScroll } from './SmoothScroll'
import './globals.css'

export const metadata: Metadata = {
    applicationName: '미리내',
    title: '미리내 - 바탕화면 캘린더 위젯',
    description:
        '윈도우 바탕화면에서 바로 보는 캘린더 위젯. 구글 캘린더와 자동 동기화되고, 설치만 하면 끝. 무료로 다운로드하세요.',
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
        canonical: 'https://www.mirinae.today/'
    },
    openGraph: {
        title: '미리내 | 당신의 하루를 별처럼 빛나게',
        description: '당신의 하루를 별처럼 빛나게, 미리내와 함께 하세요.',
        url: 'https://www.mirinae.today/',
        siteName: '미리내',
        locale: 'ko_KR',
        type: 'website',
        images: [
            {
                url: 'https://www.mirinae.today/ogImage.webp',
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
        images: ['https://www.mirinae.today/ogImage.webp']
    },
    icons: {
        icon: '/favicon.ico'
    },
    verification: {
        google: 'huSHYvBftuJFa028T6tGdShVcrWecu4qHuQWqhyKrmU',
        other: {
            'naver-site-verification': 'e5d4310d2cde75301536feb5610cd673887aefd2'
        }
    }
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '미리내',
    alternateName: ['Mirinae', '미리내 캘린더'],
    url: 'https://www.mirinae.today/'
}

const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '미리내',
    alternateName: ['Mirinae', '미리내 캘린더'],
    url: 'https://www.mirinae.today/',
    logo: 'https://www.mirinae.today/icon.svg'
}

const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '미리내',
    alternateName: ['Mirinae', '미리내 캘린더'],
    description: '윈도우 바탕화면에서 바로 보는 캘린더 위젯. 구글 캘린더와 자동 동기화됩니다.',
    url: 'https://www.mirinae.today/',
    image: 'https://www.mirinae.today/ogImage.webp',
    operatingSystem: 'Windows',
    applicationCategory: 'ProductivityApplication',
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'KRW' }
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
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />
                <Analytics />
                <SpeedInsights />
                <SmoothScroll />
                {children}
            </body>
        </html>
    )
}
