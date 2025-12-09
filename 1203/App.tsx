import { useEffect, useState } from 'react'
import { Card, CardContent } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Separator } from './components/ui/separator'
import { PostForm } from './components/PostForm'
import { PostList } from './components/PostList'
import type { NewPostPayload, Post, Tone, Comment, Reply } from './types'

const STORAGE_KEY = 'honjaman-posts-v1'

// 🔑 네 Gemini API 키
const GEMINI_API_KEY = "AIzaSyCEae0sxdXCicYlRygoxEmtHrlcHCZrJlE"
const GEMINI_MODEL = "models/gemini-2.0-flash";

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function loadInitialPosts(): Post[] {
  if (typeof localStorage === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: Post[] = JSON.parse(raw)
    return parsed
  } catch {
    return []
  }
}

function savePosts(posts: Post[]) {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
}

function formatNow() {
  return new Date().toISOString()
}

const toneDescriptions: Record<Tone, string> = {
  friendly: '따뜻하고 편안한 친구처럼, 공감과 위로를 중심으로 이야기해줘.',
  mentor: '경험 많은 선배처럼, 현실적인 조언과 격려를 중심으로 이야기해줘.',
  counselor: '전문 상담사처럼, 감정을 섬세하게 인정해주고 조심스럽게 이야기해줘.',
}

async function generateAiReplyWithGemini(
  payload: NewPostPayload,
  tone: Tone,
): Promise<string> {
  const toneText = toneDescriptions[tone]
  const mediaInfo =
    payload.mediaType === 'image' || payload.mediaType === 'video'
      ? '사용자가 사진/영상도 함께 보냈어. 글 내용과 함께 이 미디어가 주는 분위기도 참고해서 답장해줘.'
      : '미디어는 없이 텍스트만 보냈어.'

  const prompt = `
당신은 사용자의 혼잣말을 조용히 들어주는 AI 친구입니다.

[말투 설정]
${toneText}

[상황 정보]
- ${mediaInfo}

[답장 규칙]
- 반드시 한국어로만 답변해줘.
- 2~4문장 정도로 짧게 답변해줘.
- 사용자를 평가하거나 가르치려 들지 말고, 먼저 감정을 인정해줘.
- 반말과 존댓말 사이의 편안한 말투로 이야기해줘.
- 이모지는 0~2개까지만 사용해줘.

[사용자의 혼잣말]
${payload.content}
  `.trim()

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      }),
    },
  )

  const data = await response.json()
  console.log('📌 Gemini raw:', data)

  if (!response.ok || (data as any).error) {
    const message =
      (data as any).error?.message || 'Gemini API 호출 중 오류가 발생했어요.'
    throw new Error(message)
  }

  const text =
    (data as any).candidates?.[0]?.content?.parts
      ?.map((p: any) => p.text || '')
      .join('')
      ?.trim() || ''

  if (!text) {
    throw new Error('AI 응답이 비어있어요.')
  }

  return text
}

export default function App() {
  const [posts, setPosts] = useState<Post[]>(() => loadInitialPosts())
  const [tone, setTone] = useState<Tone>('friendly')

  useEffect(() => {
    savePosts(posts)
  }, [posts])

  const handleNewPost = async (payload: NewPostPayload) => {
    const id = generateId()
    const now = formatNow()

    const newPost: Post = {
      id,
      content: payload.content,
      mediaType: payload.mediaType,
      mediaDataUrl: payload.mediaDataUrl ?? null,
      timestamp: now,
      tone,
      comments: [],
      isLoadingComments: true,
    }

    setPosts(prev => [newPost, ...prev])

    try {
      // 🔥 여기서 진짜 Gemini 호출
      const aiText = await generateAiReplyWithGemini(payload, tone)

      const aiAuthor =
        tone === 'mentor'
          ? 'AI 선배'
          : tone === 'counselor'
          ? 'AI 상담사'
          : 'AI 친구'

      const aiComment: Comment = {
        id: generateId(),
        author: aiAuthor,
        content: aiText,
        timestamp: formatNow(),
        isAi: true,
        replies: [],
      }

      setPosts(prev =>
        prev.map(p =>
          p.id === id
            ? { ...p, comments: [aiComment], isLoadingComments: false }
            : p,
        ),
      )
    } catch (err: any) {
      console.error('Gemini error:', err)
      const errorComment: Comment = {
        id: generateId(),
        author: 'AI 친구',
        content: `⚠️ AI 오류: ${err.message || '알 수 없는 오류가 발생했어요.'}`,
        timestamp: formatNow(),
        isAi: true,
        replies: [],
      }
      setPosts(prev =>
        prev.map(p =>
          p.id === id
            ? { ...p, comments: [errorComment], isLoadingComments: false }
            : p,
        ),
      )
    }
  }

  const handleAddReply = (
    postId: string,
    commentId: string,
    replyContent: string,
  ) => {
    const reply: Reply = {
      id: generateId(),
      author: '나',
      content: replyContent,
      timestamp: formatNow(),
    }

    setPosts(prev =>
      prev.map(post => {
        if (post.id !== postId) return post
        return {
          ...post,
          comments: post.comments.map(c =>
            c.id === commentId
              ? { ...c, replies: [...(c.replies || []), reply] }
              : c,
          ),
        }
      }),
    )
    // 대댓글에는 AI 추가 호출 없음
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <header className="mb-6 text-center">
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
            혼자말
          </h1>
          <p className="text-sm text-gray-600">
            글, 사진, 영상으로 털어놓으면 AI가 조용히 대답해주는 공간이에요.
          </p>
        </header>

        <Card className="mb-6 border-none bg-white/70 backdrop-blur">
          <CardContent className="space-y-2 pt-4 pb-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                말투를 고르고, 혼자만 알고 싶은 이야기를 적어보세요.
              </span>
              <Badge variant="outline" className="text-[10px]">
                텍스트 · 사진 · 영상 첨부 가능
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* 기존 디자인 그대로 사용 */}
        <PostForm tone={tone} onToneChange={setTone} onSubmit={handleNewPost} />

        <Separator className="my-4" />

        <PostList posts={posts} onAddReply={handleAddReply} />
      </div>
    </div>
  )
}
