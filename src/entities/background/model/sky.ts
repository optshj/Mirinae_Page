// 배경 별 위치(화면 비율 0~1, 지름 px). 배경(StarsBackground)이 정하고, 커서가 별과 선을 잇기 위해 읽는다
export type SkyStar = { fx: number; fy: number; size: number }

let stars: SkyStar[] = []

export const setSkyStars = (next: SkyStar[]) => {
    stars = next
}

export const getSkyStars = () => stars
