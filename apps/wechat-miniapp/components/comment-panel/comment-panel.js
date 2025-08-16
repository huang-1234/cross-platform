// components/comment-panel/comment-panel.js
const readerStore = require('../../store/readerStore')
const util = require('../../utils/util')

Component({
  properties: {
    highlightId: {
      type: String,
      value: ''
    }
  },

  data: {
    currentHighlight: null,
    highlightComments: [],
    commentText: ''
  },

  lifetimes: {
    attached() {
      this.loadHighlightData()
    }
  },

  observers: {
    'highlightId': function(highlightId) {
      if (highlightId) {
        this.loadHighlightData()
      }
    }
  },

  methods: {
    // 加载高亮和评论数据
    loadHighlightData() {
      const { highlightId } = this.properties
      const { highlights, comments } = readerStore.data

      const currentHighlight = highlights.find(h => h.id === highlightId)
      const highlightComments = comments.filter(c => c.highlightId === highlightId)

      this.setData({
        currentHighlight,
        highlightComments
      })
    },

    // 添加评论
    handleAddComment() {
      const { commentText, currentHighlight } = this.data
      if (!commentText.trim() || !currentHighlight) return

      readerStore.addComment({
        highlightId: currentHighlight.id,
        content: commentText.trim()
      })

      this.setData({
        commentText: '',
        highlightComments: readerStore.data.comments.filter(c => c.highlightId === currentHighlight.id)
      })
    },

    // 删除评论
    handleDeleteComment(e) {
      const { commentId } = e.currentTarget.dataset
      readerStore.removeComment(commentId)

      this.setData({
        highlightComments: readerStore.data.comments.filter(c => c.highlightId === this.properties.highlightId)
      })
    },

    // 删除高亮
    handleDeleteHighlight() {
      const { highlightId } = this.properties
      readerStore.removeHighlight(highlightId)
      this.triggerEvent('close')
    },

    // 关闭面板
    handleClose() {
      this.triggerEvent('close')
    },

    // 输入评论
    handleInput(e) {
      this.setData({
        commentText: e.detail.value
      })
    }
  }
})
