// pages/reader/reader.js
const readerStore = require('../../store/readerStore')
const util = require('../../utils/util')

Page({
  data: {
    bookId: null,
    chapterId: null,
    contentWithHighlights: '',
    currentChapter: null,
    activeHighlightId: null,
    showMenu: false,
    showHighlightMenu: false,
    highlightMenuPosition: { x: 0, y: 0 },
    selectedText: '',
    selectionInfo: null,
    fontSize: 16,
    isDarkMode: false
  },

  onLoad(options) {
    const { bookId, chapterId } = options
    this.setData({ bookId })
    this.loadBookContent(bookId, chapterId)

    // 设置导航栏标题
    wx.setNavigationBarTitle({
      title: '阅读'
    })
  },

  // 加载书籍内容
  async loadBookContent(bookId, chapterId) {
    try {
      await readerStore.fetchBookContent(bookId)

      const currentChapter = readerStore.getCurrentChapter()
      if (currentChapter) {
        // 应用高亮到内容
        const highlights = readerStore.data.highlights.filter(
          h => h.bookId === bookId && h.chapterId === currentChapter.id
        )
        const contentWithHighlights = util.applyHighlights(currentChapter.content, highlights)

        this.setData({
          currentChapter,
          contentWithHighlights,
          fontSize: readerStore.data.fontSize,
          isDarkMode: readerStore.data.isDarkMode
        })
      }
    } catch (error) {
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      })
    }
  },

  // 处理滚动事件，更新阅读进度
  handleScroll(e) {
    const { scrollTop, scrollHeight } = e.detail
    const query = wx.createSelectorQuery()
    query.select('.reader-content').boundingClientRect()
    query.exec(res => {
      const viewportHeight = res[0].height
      const progress = util.calculateReadingProgress(scrollTop, scrollHeight, viewportHeight)
      readerStore.updateReadingProgress(progress)
    })
  },

  // 点击屏幕切换菜单显示状态
  handleScreenTap() {
    this.setData({
      showMenu: !this.data.showMenu
    })
  },

  // 长按文本选择
  handleLongPress(e) {
    // 微信小程序不支持直接获取选中文本
    // 这里简化为显示一个固定的高亮菜单
    this.setData({
      showHighlightMenu: true,
      highlightMenuPosition: {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY
      },
      // 模拟选中的文本，实际应用中需要更复杂的实现
      selectedText: '选中的文本示例',
      selectionInfo: {
        startOffset: 100,
        endOffset: 120
      }
    })
  },

  // 创建高亮
  handleCreateHighlight(e) {
    const { color = '#ffeb3b' } = e.currentTarget.dataset
    const { selectedText, selectionInfo, bookId, currentChapter } = this.data

    if (selectedText && selectionInfo && bookId && currentChapter) {
      readerStore.addHighlight({
        bookId,
        chapterId: currentChapter.id,
        text: selectedText,
        startOffset: selectionInfo.startOffset,
        endOffset: selectionInfo.endOffset,
        color
      })

      // 重新渲染内容以显示高亮
      const highlights = readerStore.data.highlights.filter(
        h => h.bookId === bookId && h.chapterId === currentChapter.id
      )
      const contentWithHighlights = util.applyHighlights(currentChapter.content, highlights)

      this.setData({
        contentWithHighlights,
        showHighlightMenu: false,
        selectedText: '',
        selectionInfo: null
      })
    }
  },

  // 关闭高亮菜单
  closeHighlightMenu() {
    this.setData({
      showHighlightMenu: false
    })
  },

  // 处理高亮点击
  handleHighlightTap(e) {
    const highlightId = e.currentTarget.dataset.id
    this.setData({
      activeHighlightId: highlightId
    })
  },

  // 关闭评论面板
  closeCommentPanel() {
    this.setData({
      activeHighlightId: null
    })
  },

  // 字体大小调整
  handleFontSizeChange(e) {
    const { type } = e.currentTarget.dataset
    let { fontSize } = this.data

    if (type === 'increase') {
      fontSize = Math.min(fontSize + 2, 24) // 最大字体大小24px
    } else {
      fontSize = Math.max(fontSize - 2, 12) // 最小字体大小12px
    }

    readerStore.changeFontSize(fontSize)
    this.setData({ fontSize })
  },

  // 切换主题
  handleThemeChange() {
    const isDarkMode = !this.data.isDarkMode
    readerStore.toggleDarkMode()
    this.setData({ isDarkMode })
  },

  // 返回书架
  handleBackToBookshelf() {
    wx.navigateBack()
  },

  // 显示目录
  handleShowChapters() {
    wx.showToast({
      title: '目录功能开发中',
      icon: 'none'
    })
  }
})
