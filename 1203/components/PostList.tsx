import { useState } from 'react'
import type { Comment, Post } from '../types'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

interface PostListProps {
  posts: Post[]
  onAddReply: (postId: string, commentId: string, replyContent: string) => void
}

function formatTime(iso: string) {
  try {
    const d = new Date(iso)
    return `${d.getFullYear()}.${(d.getMonth() + 1)
      .toString()
      .padStart(2, '0')}.${d.getDate().toString().padStart(2, '0')} ${d
      .getHours()
      .toString()
      .padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
  } catch {
    return iso
  }
}

export function PostList({ posts, onAddReply }: PostListProps) {
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({})

  const handleChangeReply = (commentId: string, value: string) => {
    setReplyDrafts(prev => ({ ...prev, [commentId]: value }))
  }

  const handleSubmitReply = (postId: string, comment: Comment) => {
    const text = replyDrafts[comment.id]?.trim()
    if (!text) return
    onAddReply(postId, comment.id, text)
    setReplyDrafts(prev => ({ ...prev, [comment.id]: '' }))
  }

  if (!posts.length) {
    return (
      <p className="mt-8 text-center text-sm text-gray-500">
        아직 기록된 혼자말이 없어요. 첫 글을 남겨볼까요?
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <Card
          key={post.id}
          className="border-none bg-white/80 backdrop-blur"
        >
          <CardContent className="space-y-4 pt-5">
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {formatTime(post.timestamp)}
                </span>
                <Badge variant="outline" className="text-[10px]">
                  {post.tone === 'mentor'
                    ? 'AI 선배 모드'
                    : post.tone === 'counselor'
                    ? 'AI 상담 모드'
                    : 'AI 친구 모드'}
                </Badge>
              </div>
              <p className="whitespace-pre-wrap text-sm text-gray-800">
                {post.content}
              </p>

              {post.mediaDataUrl && post.mediaType === 'image' && (
                <img
                  src={post.mediaDataUrl}
                  alt="post-media"
                  className="mt-3 max-h-80 w-full rounded-2xl object-cover"
                />
              )}
              {post.mediaDataUrl && post.mediaType === 'video' && (
                <video
                  src={post.mediaDataUrl}
                  controls
                  className="mt-3 max-h-80 w-full rounded-2xl object-cover"
                />
              )}
            </div>

            <Separator />

            <div className="space-y-3">
              {post.isLoadingComments && post.comments.length === 0 && (
                <p className="text-xs text-gray-400">
                  AI가 생각하는 중이에요...
                </p>
              )}

              {post.comments.map(comment => (
                <div
                  key={comment.id}
                  className="space-y-2 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 p-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-purple-700">
                      {comment.author}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {formatTime(comment.timestamp)}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap text-sm text-gray-800">
                    {comment.content}
                  </p>

                  {comment.replies.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {comment.replies.map(reply => (
                        <div
                          key={reply.id}
                          className="ml-3 border-l border-purple-100 pl-2 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-700">
                              {reply.author}
                            </span>
                            <span className="text-[10px] text-gray-400">
                              {formatTime(reply.timestamp)}
                            </span>
                          </div>
                          <p className="whitespace-pre-wrap text-gray-800">
                            {reply.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-2 space-y-2">
                    <Textarea
                      placeholder="AI에게 조용히 답글을 남겨보세요. (여기에는 AI가 추가로 답변하지 않아요)"
                      value={replyDrafts[comment.id] ?? ''}
                      onChange={e =>
                        handleChangeReply(comment.id, e.target.value)
                      }
                      className="min-h-[60px] resize-none text-xs"
                    />
                    <div className="flex justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSubmitReply(post.id, comment)}
                      >
                        댓글 남기기
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {!post.isLoadingComments && post.comments.length === 0 && (
                <p className="text-xs text-gray-400">
                  AI 답변을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}