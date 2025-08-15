import {
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  ADD_BOOK_TO_SHELF,
  REMOVE_BOOK_FROM_SHELF
} from '../constants/bookshelf'

export interface Book {
  id: string
  title: string
  author: string
  cover: string
  description: string
  progress: number
  lastReadTime?: number
}

interface BookshelfState {
  books: Book[]
  loading: boolean
  error: string | null
}

const INITIAL_STATE: BookshelfState = {
  books: [],
  loading: false,
  error: null
}

export default function reducer(state = INITIAL_STATE, action): BookshelfState {
  switch (action.type) {
    case FETCH_BOOKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload
      }
    case FETCH_BOOKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case ADD_BOOK_TO_SHELF:
      return {
        ...state,
        books: [...state.books, action.payload]
      }
    case REMOVE_BOOK_FROM_SHELF:
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload)
      }
    default:
      return state
  }
}
