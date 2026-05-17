'use client'
import { useState, useRef } from 'react'
import { motion } from 'motion/react'
import { Header } from '@/widgets/Header'
import { Footer } from '@/widgets/Footer'
import { StarsBackground } from '@/entities/background'
import { Camera, Send, X, AlertCircle, CheckCircle2 } from 'lucide-react'

const easeOutExpo = [0.22, 1, 0.36, 1] as const

export function BugReportPage() {
    const [description, setDescription] = useState('')
    const [images, setImages] = useState<File[]>([])
    const [previews, setPreviews] = useState<string[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || [])
        if (images.length + selectedFiles.length > 5) {
            alert('최대 5개의 이미지만 업로드 가능합니다.')
            return
        }

        const newImages = [...images, ...selectedFiles]
        setImages(newImages)

        const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file))
        setPreviews([...previews, ...newPreviews])
    }

    const removeImage = (index: number) => {
        const newImages = [...images]
        newImages.splice(index, 1)
        setImages(newImages)

        const newPreviews = [...previews]
        URL.revokeObjectURL(newPreviews[index])
        newPreviews.splice(index, 1)
        setPreviews(newPreviews)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!description.trim()) return

        setIsSubmitting(true)
        setStatus('idle')

        const DISCORD_WEBHOOK_URL = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL

        if (!DISCORD_WEBHOOK_URL) {
            console.error('Discord Webhook URL is not defined')
            setStatus('error')
            setIsSubmitting(false)
            return
        }

        const formData = new FormData()

        formData.append(
            'payload_json',
            JSON.stringify({
                content: `**[버그 및 불편사항 제보]**\n\n**내용:**\n${description}\n\n**일시:** ${new Date().toLocaleString()}`
            })
        )

        images.forEach((file, index) => {
            formData.append(`file${index}`, file)
        })

        try {
            const response = await fetch(DISCORD_WEBHOOK_URL, {
                method: 'POST',
                body: formData
            })

            if (response.ok) {
                setStatus('success')
                setDescription('')
                setImages([])
                previews.forEach((url) => URL.revokeObjectURL(url))
                setPreviews([])
            } else {
                setStatus('error')
            }
        } catch (error) {
            console.error('Error submitting bug report:', error)
            setStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="relative flex min-h-screen flex-col overflow-hidden">
            <StarsBackground />
            <Header />

            <main className="flex flex-grow items-center justify-center px-4 pt-32 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: easeOutExpo }}
                    className="bg-glass w-full max-w-2xl rounded-3xl border border-white/10 p-8 shadow-2xl md:p-12"
                >
                    <div className="mb-8">
                        <h1 className="mb-2 text-3xl font-bold text-white">버그 및 불편사항 제보</h1>
                        <p className="text-white/60">미리내를 이용하시면서 겪으신 버그나 제안하고 싶은 내용을 자유롭게 작성해주세요.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="description" className="mb-2 block text-sm font-medium text-white/80">
                                상세 내용
                            </label>
                            <textarea
                                id="description"
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="버그가 발생한 상황이나 불편했던 점을 자세히 알려주세요."
                                className="custom-scrollbar focus:ring-brand/50 h-40 w-full resize-none overflow-y-auto rounded-2xl border border-white/10 bg-white/5 p-4 text-white placeholder-white/30 transition-all focus:ring-2 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-white/80">이미지 첨부 (최대 5장)</label>
                            <div className="flex flex-wrap gap-4">
                                {previews.map((preview, index) => (
                                    <div key={preview} className="group relative h-20 w-20 overflow-hidden rounded-xl border border-white/20">
                                        <img src={preview} alt={`Preview ${index}`} className="h-full w-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                                {images.length < 5 && (
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-white/20 text-white/40 transition-all hover:border-white/40 hover:text-white/60"
                                    >
                                        <Camera size={20} />
                                        <span className="text-[10px]">추가</span>
                                    </button>
                                )}
                            </div>
                            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" multiple className="hidden" />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || !description.trim()}
                            className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl py-4 font-bold transition-all ${
                                isSubmitting || !description.trim()
                                    ? 'cursor-not-allowed bg-white/10 text-white/40'
                                    : 'bg-brand shadow-brand/20 hover:bg-brand-hover text-white shadow-lg'
                            }`}
                        >
                            {isSubmitting ? (
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                            ) : (
                                <>
                                    <Send size={18} />
                                    <span>제출하기</span>
                                </>
                            )}
                        </button>

                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 rounded-xl border border-green-400/20 bg-green-400/10 p-4 text-green-400"
                            >
                                <CheckCircle2 size={18} />
                                <span className="text-sm">제보해주셔서 감사합니다! 소중한 의견 반영하도록 하겠습니다.</span>
                            </motion.div>
                        )}

                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-red-400"
                            >
                                <AlertCircle size={18} />
                                <span className="text-sm">제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</span>
                            </motion.div>
                        )}
                    </form>
                </motion.div>
            </main>

            <Footer />
        </div>
    )
}
