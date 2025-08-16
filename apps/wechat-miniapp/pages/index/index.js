// pages/index/index.js
const api = require('../../services/api')
const bookshelfStore = require('../../store/bookshelfStore')

Page({
  data: {
    recommendBooks: [],
    loading: true,
    categories: ['文学', '小说', '历史', '科技', '经济', '生活', '艺术', '教育']
  },

  onLoad() {
    this.loadRecommendBooks()
  },

  // 加载推荐书籍
  async loadRecommendBooks() {
    this.setData({ loading: true })

    try {
      // 在实际应用中，这里应该调用不同的API获取推荐书籍
      // 这里为了简单，使用相同的模拟数据
      const books = await api.fetchBooks()
      this.setData({
        recommendBooks: books,
        loading: false
      })
    } catch (error) {
      this.setData({
        loading: false
      })
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
    }
  },

  // 打开阅读器
  handleOpenBook(e) {
    const bookId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/reader/reader?bookId=${bookId}`
    })
  },

  // 添加到书架
  handleAddToShelf(e) {
    const bookId = e.currentTarget.dataset.id
    const book = this.data.recommendBooks.find(b => b.id === bookId)

    if (book) {
      const added = bookshelfStore.addBookToShelf(book)

      if (added) {
        wx.showToast({
          title: '已添加到书架',
          icon: 'success',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: '已在书架中',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },

  // 处理分类点击
  handleCategoryTap(e) {
    const category = e.currentTarget.dataset.category
    wx.showToast({
      title: `你点击了${category}分类`,
      icon: 'none'
    })
  }
})
