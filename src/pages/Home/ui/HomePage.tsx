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
            {/* Section4 수면과 같은 반투명 물색. 둘 다 같은 고정 배경 위라 이음매가 맞는다 */}
            <Footer className="border-t-0 bg-[#1c1e3a]/60 bg-none" />
        </>
    )
}
