export default {
  pages: [
    'pages/index/index',
    'pages/bookshelf/index',
    'pages/reader/index',
    'pages/mine/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '微阅读',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#999',
    selectedColor: '#333',
    backgroundColor: '#fff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/bookshelf/index',
        text: '书架',
        iconPath: 'assets/icons/bookshelf.png',
        selectedIconPath: 'assets/icons/bookshelf-active.png'
      },
      {
        pagePath: 'pages/index/index',
        text: '发现',
        iconPath: 'assets/icons/discover.png',
        selectedIconPath: 'assets/icons/discover-active.png'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: 'assets/icons/mine.png',
        selectedIconPath: 'assets/icons/mine-active.png'
      }
    ]
  }
}
