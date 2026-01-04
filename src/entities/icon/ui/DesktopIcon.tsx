import { FileText, Folder, Gamepad2, Mail, Globe, HardDrive, Image as Img, Music, Settings, Trash2 } from 'lucide-react'
import { ReactElement } from 'react'

export function DesktopIcons() {
    return (
        <div className="hidden lg:inline-block">
            {/* System Icons (Grid Layout) */}
            <DesktopIcon icon={<Trash2 size={32} />} label="휴지통" x={-650} y={-250} />
            <DesktopIcon icon={<HardDrive size={32} />} label="내 PC" x={-650} y={-150} />
            <DesktopIcon icon={<Folder size={32} />} label="문서" x={-650} y={-50} />
            <DesktopIcon icon={<Globe size={32} />} label="인터넷" x={-550} y={-150} />
            <DesktopIcon icon={<Settings size={32} />} label="설정" x={-550} y={50} />

            {/* User Files (Scattered) */}
            <DesktopIcon icon={<FileText size={32} />} label="Project.txt" x={450} y={-250} />
            <DesktopIcon icon={<Img size={32} />} label="photo.png" x={550} y={-250} />
            <DesktopIcon icon={<Music size={32} />} label="song.mp3" x={450} y={-150} />
            <DesktopIcon icon={<Mail size={32} />} label="Mail" x={450} y={-50} />
            <DesktopIcon icon={<Gamepad2 size={32} />} label="Game" x={550} y={-50} />
        </div>
    )
}

function DesktopIcon({ icon, label, x, y }: { icon: ReactElement; label: string; x: number; y: number }) {
    return (
        <div
            className="group absolute z-40 flex w-24 cursor-pointer flex-col items-center gap-1 rounded-lg border border-transparent p-2 transition-all hover:border-white/10 hover:bg-white/10 hover:backdrop-blur-sm active:bg-white/20"
            style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
        >
            <div className="flex h-10 w-10 items-center justify-center text-blue-100/70 drop-shadow-xl transition-all group-hover:scale-110 group-hover:text-blue-50 group-active:scale-95">
                {icon}
            </div>
            <span className="line-clamp-2 w-full rounded px-1 py-0.5 text-center text-[11px] leading-tight font-medium tracking-tight break-all text-blue-100/80 drop-shadow-lg group-hover:text-white">
                {label}
            </span>
        </div>
    )
}
