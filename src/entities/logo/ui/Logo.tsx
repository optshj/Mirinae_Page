import Image from 'next/image'

export function Logo() {
    return (
        <div className="flex items-center gap-2" itemScope itemType="https://schema.org/Organization">
            <Image src="/icon.svg" alt="로고" width={24} height={24} />
            <h1 className="font-semibold text-white" itemProp="name">
                미리내
            </h1>
        </div>
    )
}
