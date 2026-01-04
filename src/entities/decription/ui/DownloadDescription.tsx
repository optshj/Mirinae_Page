import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/dialog'
import { CheckCircle2, Download, ShieldCheck } from 'lucide-react'

export function DownloadDescription() {
    return (
        <DialogContent className="bg-glass border-none text-white">
            <DialogHeader className="flex flex-col items-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                    <Download className="h-8 w-8 text-blue-300" />
                </div>
                <DialogTitle className="text-center text-2xl font-bold tracking-tight text-white">미리내 설치 시작!</DialogTitle>
                <DialogDescription className="text-center text-slate-300">설치 완료까지 단 1분이면 충분합니다.</DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-3">
                {/* 가이드 리스트 */}
                <div className="group bg-glass flex items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-white/10">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                        <CheckCircle2 className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="text-sm">
                        <p className="font-semibold text-blue-400">파일 실행</p>
                        <p className="text-xs text-zinc-300">
                            브라우저 하단 또는 상단의 <br />
                            <span className="font-bold text-white underline underline-offset-2">mirinae-setup.exe</span>를 클릭하세요.
                        </p>
                    </div>
                </div>

                <div className="group bg-glass flex items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-white/10">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                        <ShieldCheck className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div className="text-sm">
                        <p className="font-semibold text-emerald-400">PC 보호 창이 뜨나요?</p>
                        <p className="mt-1 text-xs leading-relaxed text-slate-300">
                            <span className="font-bold text-white underline underline-offset-2">추가 정보</span>를 누른 뒤 <br />
                            <span className="font-bold text-white underline underline-offset-2">실행</span> 버튼을 클릭하면 안전하게 설치됩니다.
                        </p>
                    </div>
                </div>
            </div>

            <p className="text-center text-xs text-slate-300">설치 후 구글 계정으로 로그인하면 즉시 사용 가능합니다.</p>
        </DialogContent>
    )
}
