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
import { fetchBookContent } from '../../services/api'
import { Highlight, Comment } from '../reducers/reader'

// 获取书籍内容
export const fetchBookContentRequest = (bookId) => ({
  type: FETCH_BOOK_CONTENT_REQUEST,
  payload: { bookId }
})

export const fetchBookContentSuccess = (data) => ({
  type: FETCH_BOOK_CONTENT_SUCCESS,
  payload: data
})

export const fetchBookContentFailure = (error) => ({
  type: FETCH_BOOK_CONTENT_FAILURE,
  payload: error
})

// 异步获取书籍内容
export function getBookContent(bookId: string) {
  return async dispatch => {
    dispatch(fetchBookContentRequest(bookId))
    try {
      const data = await fetchBookContent(bookId)
      dispatch(fetchBookContentSuccess(data))
    } catch (error) {
      dispatch(fetchBookContentFailure(error.message))
    }
  }
}

// 添加高亮
export const addHighlight = (highlight: Highlight) => ({
  type: ADD_HIGHLIGHT,
  payload: highlight
})

// 移除高亮
export const removeHighlight = (highlightId: string) => ({
  type: REMOVE_HIGHLIGHT,
  payload: highlightId
})

// 添加评论
export const addComment = (comment: Comment) => ({
  type: ADD_COMMENT,
  payload: comment
})

// 移除评论
export const removeComment = (commentId: string) => ({
  type: REMOVE_COMMENT,
  payload: commentId
})

// 更新阅读进度
export const updateReadingProgress = (progress) => ({
  type: UPDATE_READING_PROGRESS,
  payload: progress
})
