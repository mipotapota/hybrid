import { useRef, useState } from 'react'
import type { NewPostPayload, MediaType, Tone } from '../types'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'

interface PostFormProps {
  tone: Tone
  onToneChange: (tone: Tone) => void
  onSubmit: (payload: NewPostPayload) => void
}

export function PostForm({ tone, onToneChange, onSubmit }: PostFormProps) {
  const [content, setContent] = useState('')
  const [mediaPreviewUrl, setMediaPreviewUrl] = useState<string | null>(null)
  const [mediaType, setMediaType] = useState<MediaType>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fileRef = useRef<HTMLInputElement | null>(null)
  const fileBlobRef = useRef<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    fileBlobRef.current = file || null

    if (!file) {
      setMediaPreviewUrl(null)
      setMediaType(null)
      return
    }

    const url = URL.createObjectURL(file)
    setMediaPreviewUrl(url)

    if (file.type.startsWith('image/')) {
      setMediaType('image')
    } else if (file.type.startsWith('video/')) {
      setMediaType('video')
    } else {
      setMediaType(null)
      setMediaPreviewUrl(null)
      fileBlobRef.current = null
      if (fileRef.current) fileRef.current.value = ''
      alert('이미지 또는 동영상 파일만 첨부할 수 있어요.')
    }
  }

  const resetForm = () => {
    setContent('')
    setMediaPreviewUrl(null)
    setMediaType(null)
    fileBlobRef.current = null
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() && !fileBlobRef.current) return
    setIsSubmitting(true)

    const send = (mediaDataUrl?: string | null) => {
      const payload: NewPostPayload = {
        content,
        mediaType,
        mediaDataUrl: mediaDataUrl ?? null,
      }
      onSubmit(payload)
      resetForm()
      setIsSubmitting(false)
    }

    if (fileBlobRef.current) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = typeof reader.result === 'string' ? reader.result : undefined
        send(result ?? null)
      }
      reader.readAsDataURL(fileBlobRef.current)
    } else {
      send(null)
    }
  }

  return (
    <Card className="mb-4 border-none bg-white/80 backdrop-blur">
      <CardContent className="space-y-4 pt-5">
        <div className="space-y-2">
          <Label className="text-sm text-gray-700">AI 말투</Label>
          <Tabs
            value={tone}
            onValueChange={value => onToneChange(value as Tone)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="friendly">친구처럼</TabsTrigger>
              <TabsTrigger value="mentor">선배처럼</TabsTrigger>
              <TabsTrigger value="counselor">상담사처럼</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content" className="text-sm text-gray-700">
            혼자만 알고 싶은 이야기
          </Label>
          <Textarea
            id="content"
            placeholder="지금 마음속에 있는 말을 편하게 적어보세요."
            value={content}
            onChange={e => setContent(e.target.value)}
            className="min-h-[120px] resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="media" className="text-sm text-gray-700">
            사진 / 영상 첨부 (선택)
          </Label>
          <Input
            id="media"
            ref={fileRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
          {mediaPreviewUrl && mediaType === 'image' && (
            <img
              src={mediaPreviewUrl}
              alt="preview"
              className="mt-2 max-h-72 w-full rounded-2xl object-cover"
            />
          )}
          {mediaPreviewUrl && mediaType === 'video' && (
            <video
              src={mediaPreviewUrl}
              controls
              className="mt-2 max-h-72 w-full rounded-2xl object-cover"
            />
          )}
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting || (!content.trim() && !fileBlobRef.current)}
          >
            {isSubmitting ? '보내는 중...' : 'AI에게 보내기'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}