// pages/bookshelf/bookshelf.js
const bookshelfStore = require('../../store/bookshelfStore')

Page({
  data: {
    books: [],
    loading: true,
    error: null
  },

  onLoad() {
    this.fetchBooks()
  },

  onShow() {
    // 每次页面显示时更新书架数据
    this.setData({
      books: bookshelfStore.data.books
    })
  },

  onPullDownRefresh() {
    this.fetchBooks().then(() => {
      wx.stopPullDownRefresh()
    })
  },

  // 获取书架上的书籍
  async fetchBooks() {
    this.setData({ loading: true, error: null })

    try {
      await bookshelfStore.fetchBooks()
      this.setData({
        books: bookshelfStore.data.books,
        loading: false
      })
    } catch (error) {
      this.setData({
        error: error.message,
        loading: false
      })
    }
  },

  // 打开阅读器
  handleOpenBook(e) {
    const bookId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/reader/reader?bookId=${bookId}`
    })
  }
})
