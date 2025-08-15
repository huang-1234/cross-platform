import {
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  ADD_BOOK_TO_SHELF,
  REMOVE_BOOK_FROM_SHELF
} from '../constants/bookshelf'
import { fetchBooks } from '../../services/api'
import { Book } from '../reducers/bookshelf'

// 获取书架上的书籍
export const fetchBooksRequest = () => ({
  type: FETCH_BOOKS_REQUEST
})

export const fetchBooksSuccess = (books) => ({
  type: FETCH_BOOKS_SUCCESS,
  payload: books
})

export const fetchBooksFailure = (error) => ({
  type: FETCH_BOOKS_FAILURE,
  payload: error
})

// 异步获取书架书籍
export function getBooks() {
  return async dispatch => {
    dispatch(fetchBooksRequest())
    try {
      const books = await fetchBooks()
      dispatch(fetchBooksSuccess(books))
    } catch (error) {
      dispatch(fetchBooksFailure(error.message))
    }
  }
}

// 添加书籍到书架
export const addBookToShelf = (book: Book) => ({
  type: ADD_BOOK_TO_SHELF,
  payload: book
})

// 从书架移除书籍
export const removeBookFromShelf = (bookId: string) => ({
  type: REMOVE_BOOK_FROM_SHELF,
  payload: bookId
})
