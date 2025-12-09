export type Tone = 'friendly' | 'mentor' | 'counselor'
export type MediaType = 'image' | 'video' | null

export interface Reply {
  id: string
  author: string
  content: string
  timestamp: string
}

export interface Comment {
  id: string
  author: string
  content: string
  timestamp: string
  isAi: boolean
  replies: Reply[]
}

export interface Post {
  id: string
  content: string
  mediaType: MediaType
  mediaDataUrl?: string | null
  timestamp: string
  tone: Tone
  comments: Comment[]
  isLoadingComments: boolean
}

export interface NewPostPayload {
  content: string
  mediaType: MediaType
  mediaDataUrl?: string | null
}