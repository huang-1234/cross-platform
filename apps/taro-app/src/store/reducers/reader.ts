import {
  FETCH_BOOK_CONTENT_REQUEST,
  FETCH_BOOK_CONTENT_SUCCESS,
  FETCH_BOOK_CONTENT_FAILURE,
  ADD_HIGHLIGHT,
  REMOVE_HIGHLIGHT,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UPDATE_READING_PROGRESS
} from '../constants/reader'

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
}

const INITIAL_STATE: ReaderState = {
  currentBookId: null,
  currentChapterId: null,
  chapters: [],
  highlights: [],
  comments: [],
  readingProgress: 0,
  loading: false,
  error: null
}

export default function reducer(state = INITIAL_STATE, action): ReaderState {
  switch (action.type) {
    case FETCH_BOOK_CONTENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        currentBookId: action.payload.bookId
      }
    case FETCH_BOOK_CONTENT_SUCCESS:
      return {
        ...state,
        loading: false,
        chapters: action.payload.chapters,
        currentChapterId: action.payload.chapters[0]?.id || null
      }
    case FETCH_BOOK_CONTENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case ADD_HIGHLIGHT:
      return {
        ...state,
        highlights: [...state.highlights, action.payload]
      }
    case REMOVE_HIGHLIGHT: {
      const highlightId = action.payload
      return {
        ...state,
        highlights: state.highlights.filter(h => h.id !== highlightId),
        comments: state.comments.filter(c => c.highlightId !== highlightId)
      }
    }
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload]
      }
    case REMOVE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(c => c.id !== action.payload)
      }
    case UPDATE_READING_PROGRESS:
      return {
        ...state,
        readingProgress: action.payload,
        currentChapterId: action.payload.chapterId || state.currentChapterId
      }
    default:
      return state
  }
}
