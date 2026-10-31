import { useSyncExternalStore } from 'react'

// 배경 별이 별자리를 이룰지. 배경(Main)과 그걸 켜는 섹션(Section4)이 서로 떨어져 있어 모듈 상태로 잇는다
let formed = false
const listeners = new Set<() => void>()

export function setConstellation(next: boolean) {
    if (formed === next) return
    formed = next
    listeners.forEach((l) => l())
}

const subscribe = (l: () => void) => {
    listeners.add(l)
    return () => {
        listeners.delete(l)
    }
}

export const useConstellation = () => useSyncExternalStore(subscribe, () => formed, () => false)
