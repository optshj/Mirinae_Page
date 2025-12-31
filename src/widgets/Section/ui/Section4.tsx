'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
    question: string
    answer: string
}
const faqs: FAQItem[] = [
    {
        question: '미리내는 무료인가요?',
        answer: '네, 미리내는 현재 완전히 무료로 제공되고 있습니다. 모든 기능을 자유롭게 이용해 보세요.'
    },
    {
        question: '어떤 운영체제를 지원하나요?',
        answer: '현재 Windows 운영체제(Windows 10 이상)를 지원하고 있습니다. \n macOS 및 다른 운영체제 지원은 추후 검토 중입니다.'
    },
    {
        question: '일정 데이터는 어디에 저장되나요?',
        answer: '모든 일정 데이터는 구글 캘린더와 동기화되어 안전하게 저장됩니다. \n 그 외에 따로 저장하지 않으니 안심하고 사용하세요.'
    },
    {
        question: '인터넷 연결이 필요한가요?',
        answer: '앱 다운로드 및 업데이트 확인을 제외하고, 기본적인 일정 관리 기능은 인터넷 연결 없이도 오프라인 환경에서 완벽하게 작동합니다.'
    },
    {
        question: '설치는 어떻게 하나요?',
        answer: '상단의 다운로드 버튼을 클릭하여 설치 파일을 받은 후, 실행하면 자동으로 설치가 진행됩니다.'
    }
]

export function Section4() {
    return (
        <section className="relative py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <motion.h2
                        className="text-brand text-base font-semibold"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        FAQ
                    </motion.h2>
                    <motion.p
                        className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        자주 묻는 질문
                    </motion.p>
                    <motion.p
                        className="text-text-secondary mt-6 text-lg leading-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        미리내에 대해 궁금한 점이 있으신가요?
                    </motion.p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl divide-y divide-white/10">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} faq={faq} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function FAQItem({ faq, index }: { faq: FAQItem; index: number }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <motion.div
            className="group cursor-pointer py-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 + 0.1 * index }}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="flex w-full items-start justify-between text-white">
                <span className="group-hover:text-brand text-base leading-7 font-semibold transition-colors">{faq.question}</span>
                <span className="ml-6 flex h-7 items-center">
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown className="text-brand h-6 w-6" aria-hidden="true" />
                    </motion.div>
                </span>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="text-text-secondary mt-4 pr-12 text-base leading-7 whitespace-pre-line">{faq.answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
