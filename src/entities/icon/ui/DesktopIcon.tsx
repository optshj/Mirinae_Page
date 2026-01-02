import { FileText, Folder, HardDrive, Trash2 } from 'lucide-react'
import { ReactElement } from 'react'

export function DesktopIcons() {
    return (
        <div className="hidden lg:inline-block">
            <DesktopIcon icon={<Trash2 />} label="휴지통" x={-600} y={-200} />
            <DesktopIcon icon={<HardDrive />} label="내 PC" x={-600} y={-100} />
            <DesktopIcon icon={<Folder />} label="문서" x={-550} y={0} />
            <DesktopIcon icon={<FileText />} label="Project.txt" x={500} y={-150} />
        </div>
    )
}

function DesktopIcon({ icon, label, x, y }: { icon: ReactElement; label: string; x: number; y: number }) {
    return (
        <div
            className="group absolute z-40 flex flex-col items-center gap-1.5 rounded-lg p-2 transition-all hover:bg-white/10"
            style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
        >
            <div className="flex h-12 w-12 items-center justify-center text-blue-200/60 drop-shadow-xl transition-all group-hover:scale-110 group-hover:text-blue-200">{icon}</div>
            <span className="rounded px-2 py-0.5 text-center text-[11px] font-medium tracking-tight text-zinc-400 group-hover:text-white">{label}</span>
        </div>
    )
}
