import { cn } from '@/shared/lib/utils'
import type { HighlightBulletType } from '../model/highlights'

const BULLET_TYPE_STYLE: Record<HighlightBulletType, { label: string; className: string }> = {
    new: { label: '신규', className: 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300' },
    improve: { label: '개선', className: 'border-sky-400/20 bg-sky-400/10 text-sky-300' },
    fix: { label: '수정', className: 'border-amber-400/20 bg-amber-400/10 text-amber-300' }
}

interface BulletTypeTagProps {
    type: HighlightBulletType
}

export function BulletTypeTag({ type }: BulletTypeTagProps) {
    const { label, className } = BULLET_TYPE_STYLE[type]

    return (
        <span
            className={cn(
                'mt-0.5 shrink-0 rounded-full border px-1.5 py-0.5 font-mono text-[10px] leading-none whitespace-nowrap',
                className
            )}
        >
            {label}
        </span>
    )
}
