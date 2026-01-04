import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
    return (
        <footer className="from-background-primary border-t border-white/5 bg-gradient-to-b to-[#2a2a3a] px-6 py-12 text-gray-300">
            <div className="mx-auto max-w-5xl">
                <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                    {/* Brand Section */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Image src="/icon.svg" alt="Mirinae Logo" width={32} height={32} className="opacity-90" />
                            <span className="text-xl font-bold tracking-tight text-white">미리내</span>
                        </div>
                        <p className="text-sm text-gray-400">
                            당신의 하루를 별처럼 빛나게
                            <br />
                            심플하고 아름다운 데스크톱 캘린더
                        </p>
                    </div>

                    {/* Links Section */}
                    <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
                        <div className="flex flex-col gap-3">
                            <h3 className="font-semibold text-white">지원</h3>
                            <a target="_blank" rel="noopener noreferrer" className="text-sm transition-colors hover:text-white hover:underline">
                                버그 및 불편사항 제보
                            </a>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h3 className="font-semibold text-white">법적 고지</h3>
                            <Link href="/privacy-policy" className="text-sm transition-colors hover:text-white hover:underline">
                                개인정보처리방침
                            </Link>
                            <span className="cursor-not-allowed text-sm text-gray-500">서비스 이용약관</span>
                        </div>
                    </div>
                </div>

                <div className="my-8 h-px w-full bg-white/5" />

                <div className="flex flex-col items-center justify-between gap-4 text-xs text-gray-500 sm:flex-row">
                    <p>© 2025 Mirinae. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
