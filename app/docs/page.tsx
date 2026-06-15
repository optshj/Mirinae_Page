import type { Metadata } from 'next'
import { DocsPage } from '@/pages/Docs'

export const metadata: Metadata = {
    title: '기능 | 미리내',
    description:
        '바탕화면 캘린더 위젯 미리내의 모든 기능을 소개합니다. 일정 추가/삭제/완료, 색상 필터링, 캘린더 접기, 다크모드, 투명도 조절, 공휴일 표시, 자동 실행까지 바탕화면에서 바로 사용하는 방법을 확인하세요.',
    keywords: ['미리내 사용법', '바탕화면 캘린더', '바탕화면 위젯', '데스크톱 위젯', '캘린더 위젯', '윈도우 위젯', '다크모드 캘린더', '투명 위젯'],
    alternates: {
        canonical: 'https://www.mirinaecalendar.store/docs'
    },
    openGraph: {
        title: '기능 | 미리내',
        description: '바탕화면 캘린더 위젯 미리내의 모든 기능을 소개합니다.',
        url: 'https://www.mirinaecalendar.store/docs',
        siteName: '미리내',
        locale: 'ko_KR',
        type: 'website',
        images: [
            {
                url: 'https://www.mirinaecalendar.store/ogImage.webp',
                alt: '미리내 사용법 | 바탕화면 캘린더 위젯 기능 안내',
                width: 1200,
                height: 630
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: '미리내 사용법 | 바탕화면 캘린더 위젯 기능 안내',
        description: '바탕화면 캘린더 위젯 미리내의 모든 기능을 사용 방법과 함께 소개합니다.',
        images: ['https://www.mirinaecalendar.store/ogImage.webp']
    }
}

export default DocsPage
