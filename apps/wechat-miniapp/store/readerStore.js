const api = require('../services/api')
const util = require('../utils/util')

// 阅读器状态管理
const readerStore = {
  data: {
    currentBookId: null,
    currentChapterId: null,
    chapters: [],
    highlights: [],
    comments: [],
    readingProgress: 0,
    loading: false,
    error: null,
    fontSize: 16,
    isDarkMode: false
  },

  // 获取书籍内容
  async fetchBookContent(bookId) {
    this.data.loading = true
    this.data.error = null
    this.data.currentBookId = bookId

    try {
      const data = await api.fetchBookContent(bookId)
      this.data.chapters = data.chapters
      this.data.currentChapterId = data.chapters.length > 0 ? data.chapters[0].id : null
      this.data.loading = false

      // 加载高亮和评论
      this._loadHighlightsAndComments()

      return data
    } catch (error) {
      this.data.error = error.message
      this.data.loading = false
      throw error
    }
  },

  // 添加高亮
  addHighlight({bookId, chapterId, text, startOffset, endOffset, color = '#ffeb3b'}) {
    const highlight = {
      id: util.generateUUID(),
      bookId,
      chapterId,
      text,
      startOffset,
      endOffset,
      color,
      createdAt: Date.now()
    }

    this.data.highlights.push(highlight)
    this._saveHighlightsToStorage()
    return highlight
  },

  // 移除高亮
  removeHighlight(highlightId) {
    const initialLength = this.data.highlights.length
    this.data.highlights = this.data.highlights.filter(h => h.id !== highlightId)

    // 同时移除关联的评论
    this.data.comments = this.data.comments.filter(c => c.highlightId !== highlightId)

    if (this.data.highlights.length !== initialLength) {
      this._saveHighlightsToStorage()
      this._saveCommentsToStorage()
      return true
    }
    return false
  },

  // 添加评论
  addComment({highlightId, content}) {
    const comment = {
      id: util.generateUUID(),
      highlightId,
      content,
      createdAt: Date.now()
    }

    this.data.comments.push(comment)
    this._saveCommentsToStorage()
    return comment
  },

  // 移除评论
  removeComment(commentId) {
    const initialLength = this.data.comments.length
    this.data.comments = this.data.comments.filter(c => c.id !== commentId)

    if (this.data.comments.length !== initialLength) {
      this._saveCommentsToStorage()
      return true
    }
    return false
  },

  // 更新阅读进度
  updateReadingProgress(progress, chapterId) {
    this.data.readingProgress = progress
    if (chapterId) {
      this.data.currentChapterId = chapterId
    }

    // 同时更新书架中的进度
    if (this.data.currentBookId) {
      const bookshelfStore = require('./bookshelfStore')
      bookshelfStore.updateBookProgress(this.data.currentBookId, progress)
    }
  },

  // 改变字体大小
  changeFontSize(size) {
    this.data.fontSize = size
    wx.setStorageSync('reader_fontSize', size)
  },

  // 切换暗黑模式
  toggleDarkMode() {
    this.data.isDarkMode = !this.data.isDarkMode
    wx.setStorageSync('reader_isDarkMode', this.data.isDarkMode)
  },

  // 获取当前章节
  getCurrentChapter() {
    if (!this.data.currentChapterId) return null
    return this.data.chapters.find(chapter => chapter.id === this.data.currentChapterId)
  },

  // 从本地存储加载高亮和评论
  _loadHighlightsAndComments() {
    try {
      const bookId = this.data.currentBookId
      if (!bookId) return

      const key = `highlights_${bookId}`
      const highlights = wx.getStorageSync(key)
      if (highlights) {
        this.data.highlights = highlights
      } else {
        this.data.highlights = []
      }

      const commentsKey = `comments_${bookId}`
      const comments = wx.getStorageSync(commentsKey)
      if (comments) {
        this.data.comments = comments
      } else {
        this.data.comments = []
      }

      // 加载阅读设置
      const fontSize = wx.getStorageSync('reader_fontSize')
      if (fontSize) {
        this.data.fontSize = fontSize
      }

      const isDarkMode = wx.getStorageSync('reader_isDarkMode')
      if (isDarkMode !== undefined) {
        this.data.isDarkMode = isDarkMode
      }
    } catch (e) {
      console.error('Failed to load reader data from storage:', e)
    }
  },

  // 保存高亮到本地存储
  _saveHighlightsToStorage() {
    try {
      const bookId = this.data.currentBookId
      if (!bookId) return

      const key = `highlights_${bookId}`
      wx.setStorageSync(key, this.data.highlights)
    } catch (e) {
      console.error('Failed to save highlights to storage:', e)
    }
  },

  // 保存评论到本地存储
  _saveCommentsToStorage() {
    try {
      const bookId = this.data.currentBookId
      if (!bookId) return

      const key = `comments_${bookId}`
      wx.setStorageSync(key, this.data.comments)
    } catch (e) {
      console.error('Failed to save comments to storage:', e)
    }
  }
}

module.exports = readerStore
