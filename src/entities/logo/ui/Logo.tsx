import Image from 'next/image'

export function Logo() {
    return (
        <div className="flex items-center gap-2">
            <Image src="/icon.png" alt="로고" width={24} height={24} priority quality={100} />
            <span className="font-semibold text-white">Mirinae</span>
        </div>
    )
}
