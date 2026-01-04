import React, { useState, useEffect } from 'react'

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
            {stars.map((star) => (
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
            ))}

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
