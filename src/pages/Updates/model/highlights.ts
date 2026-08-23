export type HighlightBulletType = 'new' | 'improve' | 'fix'

export interface HighlightBullet {
    type: HighlightBulletType
    text: string
}

export interface UpdateHighlight {
    version: string
    date: string
    title: string
    bullets: HighlightBullet[]
}

// updates.ts(전체 릴리스 원본)에서 사용자에게 의미 있는 기능 릴리스만 선별해 정리한 목록입니다.
// 자잘한 버그 수정이나 내부 작업(로그인 로직 보강, 분석 도구 연동 등)은 제외했습니다.
export const highlights: UpdateHighlight[] = [
    {
        version: '0.5.1',
        date: '2026-08-24',
        title: '일정 완료와 알림 기능이 추가됐어요',
        bullets: [
            { type: 'new', text: '일정을 완료 처리하고 표시할 수 있는 기능이 추가됐어요' },
            { type: 'new', text: '일정 시작 전 알림을 받을 수 있어요' },
            { type: 'improve', text: '설정 화면의 드롭다운 UI가 더 깔끔해졌어요' }
        ]
    },
    {
        version: '0.5.0',
        date: '2026-08-07',
        title: '색상 팔레트와 캘린더 미니뷰가 추가됐어요',
        bullets: [
            { type: 'new', text: '일정마다 원하는 색상을 팔레트에서 직접 골라 지정할 수 있어요' },
            { type: 'new', text: '캘린더 미니뷰로 접힌 상태에서도 한눈에 날짜를 확인할 수 있어요' },
            { type: 'improve', text: '하루종일 옵션을 Ctrl + D 단축키로 빠르게 켜고 끌 수 있어요' },
            { type: 'new', text: '기능소개 페이지로 바로 이동하는 버튼이 추가됐어요' }
        ]
    },
    {
        version: '0.4.1',
        date: '2026-06-28',
        title: '일정에 종료일을 지정할 수 있어요',
        bullets: [
            { type: 'new', text: '일정 추가/수정 폼에서 종료일을 선택할 수 있어요' },
            { type: 'improve', text: '업데이트 다운로드 안내 폼이 더 편해졌어요' }
        ]
    },
    {
        version: '0.3.8',
        date: '2026-06-05',
        title: '일정 색상을 직접 골라보세요',
        bullets: [{ type: 'new', text: '일정에 표시할 색상을 원하는 대로 고를 수 있는 기능이 추가됐어요' }]
    },
    {
        version: '0.3.7',
        date: '2026-05-31',
        title: '반복 일정이 제대로 표시돼요',
        bullets: [{ type: 'fix', text: '반복 일정이 캘린더에 정상적으로 표시되도록 수정했어요' }]
    },
    {
        version: '0.3.0',
        date: '2026-05-11',
        title: '며칠씩 이어지는 일정도 등록해보세요',
        bullets: [{ type: 'new', text: '여러 날에 걸쳐 진행되는 긴 일정을 추가할 수 있게 됐어요' }]
    },
    {
        version: '0.1.10',
        date: '2026-03-08',
        title: 'D-Day 표시와 반응형 캘린더가 추가됐어요',
        bullets: [
            { type: 'new', text: '날짜를 누르면 D-Day가 표시돼요' },
            { type: 'improve', text: '창 크기에 맞춰 캘린더가 반응형으로 조절돼요' }
        ]
    },
    {
        version: '0.1.8',
        date: '2026-02-27',
        title: '캘린더가 새로운 모습으로 바뀌었어요',
        bullets: [{ type: 'improve', text: '캘린더 디자인이 새롭게 리뉴얼됐어요' }]
    },
    {
        version: '0.1.6',
        date: '2025-12-24',
        title: '일정 완료 기능과 문의하기가 추가됐어요',
        bullets: [
            { type: 'new', text: '일정을 완료 처리할 수 있는 기능이 추가됐어요' },
            { type: 'new', text: '개발자에게 바로 문의할 수 있는 기능이 추가됐어요' },
            { type: 'improve', text: '일정이 시간순으로 자동 정렬돼요' }
        ]
    },
    {
        version: '0.1.3',
        date: '2025-11-20',
        title: '푸터를 접어 화면을 넓게 써보세요',
        bullets: [{ type: 'new', text: '푸터를 접을 수 있는 기능이 추가돼 화면을 더 넓게 쓸 수 있어요' }]
    },
    {
        version: '0.0.12',
        date: '2025-10-01',
        title: '초기 UI가 대대적으로 다듬어졌어요',
        bullets: [
            { type: 'new', text: '하루종일 옵션을 선택할 수 있게 됐어요' },
            { type: 'improve', text: '화면 크기 조절 방식이 Dial에서 슬라이더로 바뀌어 더 편해졌어요' },
            { type: 'improve', text: '로그인 성공 후 화면 UI가 개선됐어요' },
            { type: 'improve', text: '창 크기에 맞춰 화면이 자연스럽게 조절돼요' }
        ]
    },
    {
        version: '0.0.11',
        date: '2025-09-14',
        title: '일정 수정 기능이 추가됐어요',
        bullets: [{ type: 'new', text: '등록한 일정을 수정할 수 있는 기능이 추가됐어요' }]
    },
    {
        version: '0.0.7',
        date: '2025-09-05',
        title: '시간 조절 UI가 바뀌었어요',
        bullets: [{ type: 'improve', text: '일정 시간을 조절하는 UI가 새롭게 바뀌었어요' }]
    },
    {
        version: '0.0.5',
        date: '2025-08-31',
        title: '하단 일정 목록이 추가됐어요',
        bullets: [{ type: 'new', text: '화면 하단에서 더 다양한 일정을 확인할 수 있어요' }]
    },
    {
        version: '0.0.3',
        date: '2025-08-26',
        title: '투명도 조절과 캘린더 접기 UX가 좋아졌어요',
        bullets: [
            { type: 'improve', text: '투명도 조절 UX가 개선됐어요' },
            { type: 'fix', text: '캘린더를 접었을 때 의도치 않은 클릭이 차단돼요' }
        ]
    }
]
