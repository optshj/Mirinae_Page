import { Footer } from '@/widgets/Footer'
import { Header } from '@/widgets/Header'
import { Main, Section1, Section2, Section3, Section4 } from '@/widgets/Section'

export function HomePage() {
    return (
        <>
            <Header />
            <main>
                <Main />
                <Section1 />
                <Section2 />
                <Section3 />
                <Section4 />
            </main>
            {/* Section4 가까운 능선과 같은 색이라 능선이 그대로 푸터로 이어진다. 모바일은 능선 아래 여백이 이미 있어 위 패딩을 줄인다 */}
            <Footer className="border-t-0 bg-[#16182f] bg-none pt-2 sm:pt-12" />
        </>
    )
}
