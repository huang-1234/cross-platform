import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useReaderStore } from '../../store/readerStore'
import ReaderContent from '../../components/reader/ReaderContent'
import CommentPanel from '../../components/reader/CommentPanel'
import ReaderBottomMenu from '../../components/reader/ReaderBottomMenu'
import './index.scss'

function ReaderPage() {
  const router = useRouter()
  const { bookId, chapterId } = router.params
  const [activeHighlightId, setActiveHighlightId] = useState<string | null>(null)
  const [showMenu, setShowMenu] = useState(false)
  const [fontSize, setFontSize] = useState(16) // 默认字体大小
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  const { highlights } = useReaderStore()

  // 设置导航栏标题
  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '阅读'
    })
    // 隐藏导航栏
    Taro.hideNavigationBarLoading()
  }, [])

  // 监听高亮点击事件
  useEffect(() => {
    const handleHighlightClick = (e) => {
      const target = e.target
      if (target.className.includes('highlight')) {
        const highlightId = target.dataset.id
        setActiveHighlightId(highlightId)
      }
    }

    document.addEventListener('click', handleHighlightClick)

    return () => {
      document.removeEventListener('click', handleHighlightClick)
    }
  }, [])

  // 监听点击事件，控制菜单显示
  useEffect(() => {
    const handleTouchEvent = () => {
      // 点击屏幕中间区域时切换菜单显示状态
      setShowMenu(prev => !prev)
    }

    document.addEventListener('click', handleTouchEvent)

    return () => {
      document.removeEventListener('click', handleTouchEvent)
    }
  }, [])

  // 关闭评论面板
  const handleCloseCommentPanel = () => {
    setActiveHighlightId(null)
  }

  // 字体大小调整
  const handleFontSizeChange = (type: 'increase' | 'decrease') => {
    setFontSize(prev => {
      if (type === 'increase') {
        return Math.min(prev + 2, 24) // 最大字体大小24px
      } else {
        return Math.max(prev - 2, 12) // 最小字体大小12px
      }
    })

    // 更新CSS变量
    document.documentElement.style.setProperty('--reader-font-size', `${fontSize}px`)
  }

  // 切换主题
  const handleThemeChange = () => {
    setIsDarkTheme(prev => !prev)

    if (isDarkTheme) {
      // 切换到亮色主题
      document.documentElement.style.setProperty('--reader-bg-color', '#f8f8f8')
      document.documentElement.style.setProperty('--reader-text-color', '#333')
    } else {
      // 切换到暗色主题
      document.documentElement.style.setProperty('--reader-bg-color', '#1a1a1a')
      document.documentElement.style.setProperty('--reader-text-color', '#e0e0e0')
    }
  }

  // 返回书架
  const handleBackToBookshelf = () => {
    Taro.navigateBack()
  }

  // 显示目录
  const handleShowChapters = () => {
    Taro.showToast({
      title: '目录功能开发中',
      icon: 'none'
    })
  }

  return (
    <View className='readerPage'>
      <ReaderContent bookId={bookId!} chapterId={chapterId!} />

      {activeHighlightId && (
        <CommentPanel
          highlightId={activeHighlightId}
          onClose={handleCloseCommentPanel}
        />
      )}

      {showMenu && (
        <ReaderBottomMenu
          onFontSizeChange={handleFontSizeChange}
          onThemeChange={handleThemeChange}
          onBackToBookshelf={handleBackToBookshelf}
          onShowChapters={handleShowChapters}
        />
      )}
    </View>
  )
}

export default React.memo(ReaderPage)