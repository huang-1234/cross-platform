// pages/mine/mine.js
Page({
  data: {
    user: {
      avatar: 'https://joeschmoe.io/api/v1/random',
      nickname: '读书爱好者',
      readingDays: 30,
      booksCount: 5
    },
    features: [
      { id: 'notes', title: '我的笔记', icon: '📝' },
      { id: 'highlights', title: '我的划线', icon: '🖌️' },
      { id: 'favorites', title: '我的收藏', icon: '⭐' },
      { id: 'history', title: '阅读历史', icon: '📚' },
      { id: 'settings', title: '设置', icon: '⚙️' },
      { id: 'help', title: '帮助与反馈', icon: '❓' }
    ]
  },

  // 处理功能点击
  handleFeatureClick(e) {
    const featureId = e.currentTarget.dataset.id
    wx.showToast({
      title: `点击了${featureId}功能`,
      icon: 'none'
    })
  }
})
