'use client'
import { motion } from 'motion/react'
import Link from 'next/link'
import { Lightbulb } from 'lucide-react'
import { Footer } from '@/widgets/Footer'
import { Header } from '@/widgets/Header'
import { StarsBackground } from '@/entities/background'
import { NotificationDescription, TrayAutostartDescription } from '@/entities/decription'
import { Mixpanel } from '@/shared/lib/mixpanel'
import { HighlightText } from '@/shared/ui/HighlightText'
import { FeatureExplorer, type Category } from './FeatureExplorer'
import { FeatureVideo } from './FeatureVideo'

const categories: Category[] = [
    {
        title: '일정 관리',
        features: [
            {
                subTitle: '빠르게 기록하기',
                title: '일정 추가',
                description: '날짜를 클릭하고 제목, 시간, 색상만 정하면 끝\n복잡한 메뉴 없이 바로 일정을 등록할 수 있어요',
                visual: <FeatureVideo src="/demo/일정추가.mp4" />
            },
            {
                subTitle: '다시 만들 필요 없이',
                title: '일정 수정',
                description: '제목, 시간, 색상까지 언제든 다시 바꿀 수 있어요\n삭제하고 새로 만들 필요 없이 그대로 고치면 끝',
                visual: <FeatureVideo src="/demo/일정수정.mp4" />
            },
            {
                subTitle: '날짜만 바꾸고 싶을 때',
                title: '일정 드래그로 옮기기',
                description: '일정을 드래그해서 원하는 날짜로 바로 옮길 수 있어요\n다시 입력할 필요 없이 위치만 바꾸면 돼요',
                visual: <FeatureVideo src="/demo/일정드래그로옮기기.mp4" />,
                isNew: true
            },
            {
                subTitle: '성취감은 덤',
                title: '일정 완료',
                description: '끝낸 일정은 체크 한 번으로 완료 표시\n오늘 무엇을 해냈는지 한눈에 확인하세요',
                visual: <FeatureVideo src="/demo/일정완료.mp4" />,
                isNew: true
            },
            {
                subTitle: '깔끔하게 정리하기',
                title: '일정 삭제',
                description: '더 이상 필요 없는 일정은 한 번의 클릭으로 삭제하세요',
                visual: <FeatureVideo src="/demo/일정삭제.mp4" />
            },
            {
                subTitle: '원하는 일정만 모아보기',
                title: '일정 색상 필터링',
                description: '색상별로 분류한 일정을 필터링해서\n업무, 개인, 약속 등 원하는 카테고리만 모아볼 수 있어요',
                visual: <FeatureVideo src="/demo/색상필터.mp4" />
            },
            {
                subTitle: '실수해도 괜찮아요',
                title: '행동 되돌리기',
                description: '일정을 완료하거나 삭제한 직후엔 바로 되돌릴 수 있어요\n실수로 눌러도 걱정 없이 원래대로 돌아갑니다',
                visual: <FeatureVideo src="/demo/행동되돌리기.mp4" />,
                isNew: true
            }
        ]
    },
    {
        title: '화면 구성',
        features: [
            {
                subTitle: '공간을 더 넓게',
                title: '캘린더 접기',
                description: '아이콘 하나로 캘린더를 접어두고\n필요할 때만 펼쳐서 확인하세요',
                visual: <FeatureVideo src="/demo/캘린더접기.mp4" />
            },
            {
                subTitle: '필요한 만큼만 작게',
                title: '캘린더 축소',
                description: '캘린더를 작게 접어두고 간결하게 확인할 수 있어요\n필요할 때 한 번 더 누르면 원래 크기로 돌아와요',
                visual: <FeatureVideo src="/demo/캘린더축소.mp4" />,
                isNew: true
            },
            {
                subTitle: '심플함이 필요할 때',
                title: '달력만 보기',
                description: '일정 목록을 숨기고\n달력 그리드만 깔끔하게 표시할 수 있어요',
                visual: <FeatureVideo src="/demo/캘린더요약보기.mp4" />
            },
            {
                subTitle: '눈이 편안하게',
                title: '다크모드',
                description: '다크모드를 자유롭게 켜고 끌 수 있어요\n어두운 환경에서도 눈의 피로를 줄여줍니다',
                visual: <FeatureVideo src="/demo/다크모드.mp4" />
            },
            {
                subTitle: '바탕화면과 자연스럽게',
                title: '투명도 조절',
                description: '배경화면이 비치는 정도를 직접 조절할 수 있어요\n위젯이 데스크톱에 자연스럽게 어우러지도록 만드세요',
                visual: <FeatureVideo src="/demo/투명도.mp4" />
            },
            {
                subTitle: '쉬는 날도 놓치지 않게',
                title: '공휴일 표시',
                description: '공휴일을 표시할지 여부를 설정에서 선택할 수 있어요\n중요한 휴일을 놓치지 않고 확인하세요',
                visual: <FeatureVideo src="/demo/공휴일표시.mp4" />
            }
        ]
    },
    {
        title: '설정',
        features: [
            {
                subTitle: '한눈에 보기 좋게',
                title: '일정 표시 개수 설정',
                description: '하루에 표시할 일정 개수를 직접 정할 수 있습니다.\n 원하는 개수로 설정해서 깔끔하게 일정을 관리하세요',
                visual: <FeatureVideo src="/demo/표시개수.mp4" />
            },
            {
                subTitle: '놓치지 않게 미리',
                title: '일정 알림',
                description: '일정 시작 몇 분 전에 알림을 받을지 직접 정할 수 있어요\n중요한 일정을 놓치지 않도록 도와줘요',
                visual: <NotificationDescription />,
                isNew: true
            },
            {
                subTitle: '취향대로 꾸미기',
                title: '색상 팔레트 변경',
                description: '파스텔, 비비드, 톤다운 등 다양한 팔레트 중에 고를 수 있어요\n캘린더 전체 색감을 취향에 맞게 바꿔보세요',
                visual: <FeatureVideo src="/demo/컬러팔레트.mp4" />,
                isNew: true
            },
            {
                subTitle: '색상마다 의미를 담아',
                title: '색상 이름 지정',
                description: '각 색상에 업무, 개인, 약속처럼 원하는 이름을 붙일 수 있어요\n어떤 색이 무슨 일정인지 헷갈리지 않게 관리하세요',
                visual: <FeatureVideo src="/demo/색상이름.mp4" />,
                isNew: true
            },
            {
                subTitle: '한 번만 설정하면 끝',
                title: '자동 실행',
                description: '트레이 아이콘 설정에서 Windows 시작 시 자동 실행을 켜두면\nPC를 켤 때마다 미리내가 바탕화면에서 자동으로 실행돼요',
                visual: <TrayAutostartDescription />
            }
        ]
    }
]

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '미리내',
    alternateName: ['Mirinae', '미리내 캘린더'],
    applicationCategory: 'DesktopApplication',
    operatingSystem: 'Windows',
    url: 'https://www.mirinaecalendar.store/docs',
    description: '바탕화면에서 바로 사용하는 캘린더 위젯, 미리내의 기능 안내',
    featureList: categories.flatMap((category) => category.features.map((feature) => feature.title))
}

export function DocsPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Header />
            <main>
                <StarsBackground />
                <section className="relative flex flex-col items-center px-6 pt-60 pb-32 text-center">
                    <motion.h1
                        className="text-4xl font-semibold tracking-tighter text-white md:text-5xl"
                        initial={{ y: 30, opacity: 0, filter: 'blur(10px)' }}
                        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        미리내의 <HighlightText>기능</HighlightText>
                    </motion.h1>
                    <motion.p
                        className="mt-6 max-w-xl text-lg text-white/60 md:text-xl"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        사용하는 방법을 알아보세요!
                    </motion.p>
                </section>

                <FeatureExplorer categories={categories} />

                <section className="mx-auto max-w-4xl px-6 pt-24 pb-48">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-glass relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl px-8 py-12 text-center shadow-xl sm:flex-row sm:justify-between sm:text-left"
                    >
                        <div className="relative flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-5">
                            <div>
                                <h2 className="text-xl font-bold text-white sm:text-2xl">원하는 기능이 있으신가요?</h2>
                                <p className="mt-2 text-sm text-white/50">아직 미리내에 없는 기능이라면, 자유롭게 의견을 남겨주세요</p>
                            </div>
                        </div>

                        <Link
                            href="/bug-report"
                            onClick={() => Mixpanel.track('Feature Request Link Click', { location: 'docs' })}
                            className="bg-brand hover:bg-brand-hover flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-white transition-colors"
                        >
                            <Lightbulb className="h-4 w-4" />
                            기능 제안하기
                        </Link>
                    </motion.div>
                </section>
            </main>
            <Footer />
        </>
    )
}
