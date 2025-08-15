import { create } from 'zustand'
import { fetchBookContent } from '../services/api'
import { v4 as uuidv4 } from 'uuid'

export interface Highlight {
  id: string
  bookId: string
  chapterId: string
  text: string
  startOffset: number
  endOffset: number
  color: string
  createdAt: number
}

export interface Comment {
  id: string
  highlightId: string
  content: string
  createdAt: number
}

export interface Chapter {
  id: string
  title: string
  content: string
}

interface ReaderState {
  currentBookId: string | null
  currentChapterId: string | null
  chapters: Chapter[]
  highlights: Highlight[]
  comments: Comment[]
  readingProgress: number
  loading: boolean
  error: string | null

  // 操作方法
  fetchBookContent: (bookId: string) => Promise<void>
  addHighlight: (highlight: Omit<Highlight, 'id' | 'createdAt'>) => void
  removeHighlight: (highlightId: string) => void
  addComment: (comment: Omit<Comment, 'id' | 'createdAt'>) => void
  removeComment: (commentId: string) => void
  updateReadingProgress: (progress: number, chapterId?: string) => void
}

export const useReaderStore = create<ReaderState>((set, get) => ({
  currentBookId: null,
  currentChapterId: null,
  chapters: [],
  highlights: [],
  comments: [],
  readingProgress: 0,
  loading: false,
  error: null,

  fetchBookContent: async (bookId: string) => {
    set({ loading: true, error: null, currentBookId: bookId })
    try {
      const data = await fetchBookContent(bookId)
      set({
        chapters: data.chapters,
        currentChapterId: data.chapters[0]?.id || null,
        loading: false
      })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  addHighlight: (highlightData) => {
    const highlight: Highlight = {
      ...highlightData,
      id: uuidv4(),
      createdAt: Date.now()
    }

    set(state => ({
      highlights: [...state.highlights, highlight]
    }))

    return highlight
  },

  removeHighlight: (highlightId: string) => {
    set(state => ({
      highlights: state.highlights.filter(h => h.id !== highlightId),
      comments: state.comments.filter(c => c.highlightId !== highlightId)
    }))
  },

  addComment: (commentData) => {
    const comment: Comment = {
      ...commentData,
      id: uuidv4(),
      createdAt: Date.now()
    }

    set(state => ({
      comments: [...state.comments, comment]
    }))

    return comment
  },

  removeComment: (commentId: string) => {
    set(state => ({
      comments: state.comments.filter(c => c.id !== commentId)
    }))
  },

  updateReadingProgress: (progress: number, chapterId?: string) => {
    set(state => ({
      readingProgress: progress,
      currentChapterId: chapterId || state.currentChapterId
    }))
  }
}))
