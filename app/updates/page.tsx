import type { Metadata } from 'next'
import { UpdatesPage } from '@/pages/Updates'

export const metadata: Metadata = {
    title: '패치노트 | 미리내',
    description: '바탕화면 캘린더 위젯 미리내의 새로운 기능과 개선 사항, 버그 수정 내역을 확인하세요.',
    alternates: {
        canonical: 'https://www.mirinaecalendar.store/updates'
    },
    openGraph: {
        title: '패치노트 | 미리내',
        description: '바탕화면 캘린더 위젯 미리내의 새로운 기능과 개선 사항, 버그 수정 내역을 확인하세요.',
        url: 'https://www.mirinaecalendar.store/updates',
        siteName: '미리내',
        locale: 'ko_KR',
        type: 'website'
    }
}

export default UpdatesPage
