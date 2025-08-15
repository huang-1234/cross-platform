import { create } from 'zustand'
import { fetchBooks } from '../services/api'

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

  // 操作方法
  fetchBooks: () => Promise<void>
  addBookToShelf: (book: Book) => void
  removeBookFromShelf: (bookId: string) => void
}

export const useBookshelfStore = create<BookshelfState>((set, get) => ({
  books: [],
  loading: false,
  error: null,

  fetchBooks: async () => {
    set({ loading: true, error: null })
    try {
      const books = await fetchBooks()
      set({ books, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  addBookToShelf: (book: Book) => {
    set(state => ({
      books: [...state.books, book]
    }))
  },

  removeBookFromShelf: (bookId: string) => {
    set(state => ({
      books: state.books.filter(book => book.id !== bookId)
    }))
  }
}))
