const api = require('../services/api')

// 书架状态管理
const bookshelfStore = {
  data: {
    books: [],
    loading: false,
    error: null
  },

  // 获取书架上的书籍
  async fetchBooks() {
    this.data.loading = true
    this.data.error = null

    try {
      const books = await api.fetchBooks()
      this.data.books = books
      this.data.loading = false
      return books
    } catch (error) {
      this.data.error = error.message
      this.data.loading = false
      throw error
    }
  },

  // 添加书籍到书架
  addBookToShelf(book) {
    // 检查书籍是否已存在
    const exists = this.data.books.some(b => b.id === book.id)
    if (!exists) {
      this.data.books.push(book)
      this._saveToStorage()
      return true
    }
    return false
  },

  // 从书架移除书籍
  removeBookFromShelf(bookId) {
    const initialLength = this.data.books.length
    this.data.books = this.data.books.filter(book => book.id !== bookId)

    if (this.data.books.length !== initialLength) {
      this._saveToStorage()
      return true
    }
    return false
  },

  // 更新阅读进度
  updateBookProgress(bookId, progress) {
    const index = this.data.books.findIndex(book => book.id === bookId)
    if (index !== -1) {
      this.data.books[index].progress = progress
      this.data.books[index].lastReadTime = Date.now()
      this._saveToStorage()
      return true
    }
    return false
  },

  // 从本地存储加载数据
  loadFromStorage() {
    try {
      const books = wx.getStorageSync('bookshelf')
      if (books) {
        this.data.books = books
      }
    } catch (e) {
      console.error('Failed to load bookshelf from storage:', e)
    }
  },

  // 保存数据到本地存储
  _saveToStorage() {
    try {
      wx.setStorageSync('bookshelf', this.data.books)
    } catch (e) {
      console.error('Failed to save bookshelf to storage:', e)
    }
  }
}

// 初始化时从本地存储加载数据
bookshelfStore.loadFromStorage()

module.exports = bookshelfStore
