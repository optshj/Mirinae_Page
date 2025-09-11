import Link from 'next/link'

export function Footer() {
    return (
        <footer className="bg-[#111827] px-5 py-10">
            <div className="text-text-secondary mx-auto max-w-5xl">
                <div>© 2025 Mirinae. All rights reserved.</div>
                <div>버그 및 불편사항 제보</div>
                <Link href="/privacy-policy" className="hover:underline">
                    개인정보처리방침
                </Link>
                <div>서비스 이용약관</div>
            </div>
        </footer>
    )
}
