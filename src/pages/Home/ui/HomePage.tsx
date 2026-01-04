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
            <Footer />
        </>
    )
}
