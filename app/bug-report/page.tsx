import type { Metadata } from 'next'
import { BugReportPage } from '@/pages/Bug-Report'

export const metadata: Metadata = {
    title: '문의 및 기능 제안 | 미리내',
    description: '바탕화면 캘린더 위젯 미리내를 사용하며 발견한 버그를 신고하거나, 추가되었으면 하는 기능을 자유롭게 제안해주세요.',
    alternates: {
        canonical: 'https://www.mirinae.today/bug-report'
    },
    openGraph: {
        title: '문의 및 기능 제안 | 미리내',
        description: '미리내를 사용하며 발견한 버그를 신고하거나, 추가되었으면 하는 기능을 자유롭게 제안해주세요.',
        url: 'https://www.mirinae.today/bug-report',
        siteName: '미리내',
        locale: 'ko_KR',
        type: 'website',
        images: [
            {
                url: 'https://www.mirinae.today/ogImage.webp',
                alt: '문의 및 기능 제안 | 미리내',
                width: 1200,
                height: 630
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: '문의 및 기능 제안 | 미리내',
        description: '미리내를 사용하며 발견한 버그를 신고하거나, 추가되었으면 하는 기능을 자유롭게 제안해주세요.',
        images: ['https://www.mirinae.today/ogImage.webp']
    }
}

export default BugReportPage
