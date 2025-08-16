// API基础URL
const BASE_URL = 'https://api.example.com'

// 通用请求方法
const request = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BASE_URL}${url}`,
      ...options,
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data)
        } else {
          reject(new Error(`请求失败: ${res.statusCode}`))
        }
      },
      fail: (err) => {
        console.error('API请求错误:', err)
        reject(err)
      }
    })
  })
}

// 获取书架上的书籍
const fetchBooks = () => {
  // 在实际项目中，这里应该调用真实API
  // return request('/books')

  // 使用模拟数据
  return Promise.resolve(mockBooks)
}

// 获取书籍详情
const fetchBookDetail = (bookId) => {
  // 在实际项目中，这里应该调用真实API
  // return request(`/books/${bookId}`)

  // 使用模拟数据
  const book = mockBooks.find(b => b.id === bookId)
  if (!book) {
    return Promise.reject(new Error('未找到书籍'))
  }
  return Promise.resolve(book)
}

// 获取书籍内容
const fetchBookContent = (bookId) => {
  // 在实际项目中，这里应该调用真实API
  // return request(`/books/${bookId}/content`)

  // 使用模拟数据
  return Promise.resolve(mockBookContent)
}

// 保存阅读进度
const saveReadingProgress = (bookId, progress) => {
  return request(`/books/${bookId}/progress`, {
    method: 'POST',
    data: { progress }
  })
}

// 模拟数据
// 当API未准备好时，可以使用这些模拟数据
const mockBooks = [
  {
    id: '1',
    title: '活着',
    author: '余华',
    cover: 'https://img3.doubanio.com/view/subject/l/public/s29053580.jpg',
    description: '《活着》是作家余华的代表作之一，讲述了农村人福贵悲惨的人生遭遇。',
    progress: 0.3,
    lastReadTime: Date.now() - 86400000
  },
  {
    id: '2',
    title: '百年孤独',
    author: '加西亚·马尔克斯',
    cover: 'https://img1.doubanio.com/view/subject/l/public/s6384944.jpg',
    description: '《百年孤独》是魔幻现实主义文学的代表作，描写了布恩迪亚家族七代人的传奇故事。',
    progress: 0.5,
    lastReadTime: Date.now() - 2 * 86400000
  },
  {
    id: '3',
    title: '围城',
    author: '钱钟书',
    cover: 'https://img2.doubanio.com/view/subject/l/public/s1070222.jpg',
    description: '《围城》是钱钟书所著的长篇小说，描写了青年方鸿渐从留学回国到结婚的经历。',
    progress: 0.8,
    lastReadTime: Date.now() - 5 * 86400000
  }
]

// 模拟书籍内容
const mockBookContent = {
  bookId: '1',
  chapters: [
    {
      id: 'chapter-1',
      title: '第一章',
      content: '我比现在年轻十岁的时候，获得了一个游手好闲的职业，去乡间收集民间歌谣。那一年的整个夏天，我骑着一辆旧自行车在收集歌谣的路上奔波，天很蓝，路两旁的树木很茂盛，风吹过树梢发出沙沙的响声。我喜欢这样的夏天，也喜欢我的工作，尽管它毫无意义。我想我年轻的时候是一个纯粹的人，喜欢的就是喜欢，不喜欢的就是不喜欢，我的喜欢里面没有杂质，我心里的一切都是简单的。'
    },
    {
      id: 'chapter-2',
      title: '第二章',
      content: '我的工作职责是到农村收集民间歌谣，到了一个地方，我先去拜访那里的乡长，说明我的来意后，乡长就召集村里的老人来唱歌给我听，我把他们的歌谣记录下来。有时候还会有乡长酒宴的邀请，我这才知道什么叫做宾至如归。'
    }
  ]
}

module.exports = {
  fetchBooks,
  fetchBookDetail,
  fetchBookContent,
  saveReadingProgress,
  mockBooks,
  mockBookContent
}
