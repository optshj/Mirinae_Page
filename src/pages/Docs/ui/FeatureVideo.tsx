'use client'
import { useRef } from 'react'
import { useInView } from 'motion/react'

export const FeatureVideo = ({ src }: { src: string }) => {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '200px' })

    return (
        <div ref={ref} className="aspect-[940/1030] w-full overflow-hidden rounded-md bg-white/5 sm:rounded-2xl">
            {inView && <video src={src} autoPlay loop muted playsInline className="h-full w-full object-contain" />}
        </div>
    )
}
