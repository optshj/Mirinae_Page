import React, { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useConstellation } from '../model/constellation'

// 별자리 좌표(vw, vh). 앞쪽 별들이 순서대로 이 자리로 모이고, 같은 순서로 선이 이어진다
const CONSTELLATION = [
    [20, 36],
    [31, 24],
    [40, 32],
    [50, 16],
    [61, 30],
    [70, 22],
    [80, 35]
] as const
const LINE = `M ${CONSTELLATION.map(([x, y]) => `${x} ${y}`).join(' L ')}`
const GATHER = 1.4
const ease = [0.22, 1, 0.36, 1] as const

interface StarProps {
    id: string
    left: string
    top: string
    size: string
    animationDuration: string
}
interface ShootingStarProps {
    id: string
    left: string
    top: string
    animationDelay: string
    animationDuration: string
}
export const StarsBackground = ({ numStars = 80, numShootingStars = 10 }) => {
    const [stars, setStars] = useState<StarProps[]>([])
    const [shootingStars, setShootingStars] = useState<ShootingStarProps[]>([])
    const formed = useConstellation()
    const reduce = useReducedMotion()

    useEffect(() => {
        const generatedStars = Array.from({ length: numStars }).map((_, index) => ({
            id: `star-${index}`,
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            size: `${1 + Math.random() * 1.5}px`,
            animationDuration: `${3 + Math.random() * 7}s`
        }))
        setStars(generatedStars)
    }, [numStars])

    // 별동별 생성 로직
    useEffect(() => {
        const generatedShootingStars = Array.from({ length: numShootingStars }).map((_, index) => {
            let top, left

            if (Math.random() > 0.5) {
                top = `-10%`
                left = `${Math.random() * 100}%`
            } else {
                top = `${Math.random() * 100}%`
                left = `${100 + Math.random() * 5}%`
            }

            const animationDelay = index < 5 ? `${Math.random() * 3}s` : `${3 + Math.random() * 17}s`

            return {
                id: `shooting-star-${index}`,
                top,
                left,
                animationDelay,
                animationDuration: `${3 + Math.random() * 3}s`
            }
        })
        setShootingStars(generatedShootingStars)
    }, [numShootingStars])
    return (
        <div className="fixed top-0 left-0 -z-10 h-screen w-full overflow-hidden bg-black bg-gradient-to-b from-[#1A1F3D] via-[#5A5475] to-[#8E7C8A]">
            {stars.map((star, i) => {
                const target = CONSTELLATION[i]
                if (target)
                    return (
                        // 모이는 동안엔 반짝임(transform 애니메이션)을 꺼야 motion의 scale이 먹는다
                        <motion.div
                            key={star.id}
                            className={`absolute rounded-full bg-white ${formed ? 'shadow-[0_0_8px_2px_rgba(255,255,255,0.6)]' : 'animate-twinkle'}`}
                            style={{ width: star.size, height: star.size, animationDuration: star.animationDuration }}
                            initial={false}
                            animate={formed ? { left: `${target[0]}vw`, top: `${target[1]}vh`, scale: 2.2 } : { left: star.left, top: star.top, scale: 1 }}
                            transition={reduce ? { duration: 0 } : { duration: formed ? GATHER : 0.8, delay: formed ? i * 0.06 : 0, ease }}
                        />
                    )
                return (
                    <div
                        key={star.id}
                        className="animate-twinkle absolute rounded-full bg-white"
                        style={{
                            top: star.top,
                            left: star.left,
                            width: star.size,
                            height: star.size,
                            animationDuration: star.animationDuration
                        }}
                    />
                )
            })}

            <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                <motion.path
                    d={LINE}
                    fill="none"
                    stroke="white"
                    strokeOpacity={0.45}
                    strokeWidth={1}
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    initial={false}
                    animate={{ pathLength: formed ? 1 : 0, opacity: formed ? 1 : 0 }}
                    transition={reduce ? { duration: 0 } : formed ? { delay: GATHER, duration: 1.6, ease: 'easeInOut' } : { duration: 0.3 }}
                />
            </svg>

            {shootingStars.map((star) => (
                <div
                    key={star.id}
                    className="animate-shooting absolute"
                    style={{
                        top: star.top,
                        left: star.left,
                        animationDelay: star.animationDelay,
                        animationDuration: star.animationDuration
                    }}
                >
                    <div className="absolute top-0 left-0 h-0.5 w-[150px]" style={{ transform: 'rotate(135deg)' }}>
                        <div className="absolute right-0 h-full w-0.5 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.7)]" />
                        <div className="absolute top-1/2 right-0 h-full w-full -translate-y-1/2 rounded-full bg-gradient-to-r from-white/0 to-white/30" />
                    </div>
                </div>
            ))}
        </div>
    )
}
