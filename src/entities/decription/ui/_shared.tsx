export const DemoControl = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-2.5 text-sm font-medium text-zinc-200 backdrop-blur-sm">{children}</div>
)

export const DemoWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="flex w-full flex-col items-center justify-center gap-4 p-4">{children}</div>
)
