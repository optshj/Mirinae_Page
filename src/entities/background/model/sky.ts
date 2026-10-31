// 배경 별 위치(화면 비율 0~1, 지름 px). 배경(StarsBackground)이 정하고, 커서·히어로 아이콘이 읽는다
// locked: Section4 별자리에 쓰이는 별. taken: 히어로 아이콘이 가져간 별(배경·커서에서 빠진다)
export type SkyStar = { fx: number; fy: number; size: number; locked?: boolean; taken?: boolean }

let stars: SkyStar[] = []

export const setSkyStars = (next: SkyStar[]) => {
    stars = next
}

export const getSkyStars = () => stars
