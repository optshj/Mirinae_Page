import type { Metadata } from 'next'
import { BugReportPage } from '@/pages/Bug-Report'

export const metadata: Metadata = {
    title: '문의 및 기능 제안 | 미리내',
    description: '바탕화면 캘린더 위젯 미리내를 사용하며 발견한 버그를 신고하거나, 추가되었으면 하는 기능을 자유롭게 제안해주세요.',
    alternates: {
        canonical: 'https://www.mirinaecalendar.store/bug-report'
    },
    openGraph: {
        title: '문의 및 기능 제안 | 미리내',
        description: '미리내를 사용하며 발견한 버그를 신고하거나, 추가되었으면 하는 기능을 자유롭게 제안해주세요.',
        url: 'https://www.mirinaecalendar.store/bug-report',
        siteName: '미리내',
        locale: 'ko_KR',
        type: 'website'
    }
}

export default BugReportPage
