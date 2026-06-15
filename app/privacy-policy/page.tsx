import type { Metadata } from 'next'
import { PrivacyPolicyPage } from '@/pages/Privacy-policy'

export const metadata: Metadata = {
    title: '개인정보 처리방침 | 미리내',
    description: '바탕화면 캘린더 위젯 미리내의 개인정보 처리방침을 확인하세요.',
    alternates: {
        canonical: 'https://www.mirinaecalendar.store/privacy-policy'
    },
    robots: {
        index: false,
        follow: true
    }
}

export default PrivacyPolicyPage
