import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/dialog'
import { MousePointer2, ShieldCheck, X } from 'lucide-react'

/**
 * 실제 SmartScreen 창을 448x320 캔버스에 고정 좌표로 재현한 데모.
 * 캔버스 안의 모든 치수는 4px 격자에 맞춰져 있다 — 커서 좌표(globals.css의
 * defender-cursor)가 이 격자로 계산되므로 4 단위를 벗어나지 않게 유지할 것.
 * 바깥 박스 크기와 scale은 항상 448x320 * scale 로 한 쌍을 맞춘다.
 */
function DefenderDemo() {
    return (
        <div aria-hidden className="relative h-40 w-56 overflow-hidden rounded-lg border border-white/15 bg-[#4b555d] shadow-2xl sm:h-[280px] sm:w-[392px]">
            <div className="absolute top-0 left-0 h-80 w-[448px] origin-top-left scale-50 sm:scale-[0.875]">
                <div className="absolute top-4 right-4 flex h-6 w-8 items-center justify-center rounded-[4px] bg-[#f2f2f2] text-[#1a1a1a]">
                    <X className="size-3" />
                </div>

                <div className="px-6 pt-6">
                    <p className="text-2xl leading-8 font-light tracking-tight text-white">Windows의 PC 보호</p>
                    <p className="mt-6 text-xs leading-5 text-[#e4e7e9]">
                        Microsoft Defender SmartScreen에서 인식할 수 없는 앱의 시작을 차단했습니다. 이 앱을 실행하면 PC가 위험에 노출될 수 있습니다.
                    </p>
                    <p className="mt-2">
                        <span className="animate-defender-link motion-reduce:bg-step-1/45 -ml-1 inline-block rounded-[4px] px-1 py-1 text-xs leading-4 text-white underline underline-offset-2 motion-reduce:animate-none">
                            추가 정보
                        </span>
                    </p>
                    <div className="animate-defender-reveal mt-4 flex flex-col gap-1 text-xs leading-5 text-[#e4e7e9] motion-reduce:animate-none">
                        <p>
                            앱: <span className="text-white">mirinae-setup.exe</span>
                        </p>
                        <p>게시자: 알 수 없는 게시자</p>
                    </div>
                </div>

                <div className="absolute right-0 bottom-0 left-0 flex items-center justify-end gap-2 px-6 py-4">
                    <span className="animate-defender-reveal motion-reduce:animate-none">
                        <span className="animate-defender-run motion-reduce:ring-step-2/75 block rounded-[4px] bg-white px-6 py-2 text-xs leading-4 font-bold text-[#1a1a1a] motion-reduce:animate-none motion-reduce:ring-2">
                            실행
                        </span>
                    </span>
                    <span className="rounded-[4px] bg-white px-4 py-2 text-xs leading-4 font-bold text-[#1a1a1a]">실행 안 함</span>
                </div>

                <span className="pointer-events-none absolute inset-0 flex rotate-[-24deg] items-center justify-center text-[32px] font-light tracking-tighter whitespace-nowrap text-white opacity-[0.09]">
                    예시 화면
                </span>

                <MousePointer2 className="animate-defender-cursor absolute top-0 left-0 size-6 fill-white text-slate-800 drop-shadow-[0_4px_4px_rgba(0,0,0,0.55)] motion-reduce:hidden" />
            </div>
        </div>
    )
}

function StepDot({ children, className }: { children: React.ReactNode; className: string }) {
    return <span className={`flex size-8 items-center justify-center rounded-full text-base font-black ${className}`}>{children}</span>
}

export function DownloadDescription() {
    return (
        <DialogContent className="bg-glass custom-scrollbar max-h-[88dvh] overflow-y-auto rounded-2xl border-none py-8 text-white">
            <DialogHeader className="flex flex-col gap-2">
                <DialogTitle className="text-xl font-bold tracking-tight text-white sm:text-2xl">다운로드 중이에요!</DialogTitle>
                <DialogDescription className="text-base leading-6 text-slate-300">
                    <strong className="font-bold text-white">mirinae-setup.exe</strong>를 실행하면 나타납니다.
                    <br /> 아래 순서대로 두 번만 누르면 설치가 끝나요.
                </DialogDescription>
            </DialogHeader>

            <div className="mt-2 grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2">
                <StepDot className="animate-defender-step-a bg-step-1 text-[#3f3413] motion-reduce:animate-none motion-reduce:opacity-100">1</StepDot>
                <p className="animate-defender-step-a text-base leading-6 text-white motion-reduce:animate-none motion-reduce:opacity-100">
                    작은 밑줄 글씨 <span className="text-step-1 font-black">추가 정보</span>
                </p>

                <span className="h-full w-1 justify-self-center rounded-full bg-white/15" />
                <DefenderDemo />

                <StepDot className="animate-defender-step-b bg-step-2 text-[#1e2436] motion-reduce:animate-none motion-reduce:opacity-100">2</StepDot>
                <p className="animate-defender-step-b text-base leading-6 text-white motion-reduce:animate-none motion-reduce:opacity-100">
                    새로 생긴 <span className="text-step-2 font-black">실행</span> 버튼 클릭!
                </p>
            </div>

            <div className="border-safe/30 bg-safe/10 flex gap-3 rounded-2xl border p-4">
                <ShieldCheck className="text-safe mt-1 size-5 shrink-0" />
                <div className="flex flex-col gap-2">
                    <p className="text-safe text-base leading-6 font-bold">바이러스가 아니에요</p>
                    <p className="text-xs leading-5 text-slate-300">
                        코드 서명 인증서를 준비 중이라 Windows가 &lsquo;처음 보는 앱&rsquo;으로 분류할 뿐이에요. 인증서가 등록되면 이 창은 더 이상 뜨지 않습니다.
                    </p>
                </div>
            </div>
        </DialogContent>
    )
}
