export const easeOutExpo = [0.22, 1, 0.36, 1] as const

export const sectionVariants = {
    hidden: {},
    show: {}
}

export const titleVariants = {
    hidden: { y: 24, opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        transition: { duration: 1.6, ease: easeOutExpo }
    }
}

export const paragraphVariants = {
    hidden: { y: 24, opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        transition: { duration: 1.6, ease: easeOutExpo, delay: 0.8 }
    }
}

export const buttonVariants = {
    hidden: { y: 24, opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        transition: { duration: 1.6, ease: easeOutExpo, delay: 1.6 }
    }
}
