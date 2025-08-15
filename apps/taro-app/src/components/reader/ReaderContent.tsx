import React, { useEffect, useRef, useState } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useReaderStore } from '../../store/readerStore'
import { applyHighlights, calculateReadingProgress, getSelectionInfo } from '../../utils/reader'
import HighlightMenu from './HighlightMenu'
import './ReaderContent.scss'

interface ReaderContentProps {
  bookId: string
  chapterId?: string
}

const ReaderContent: React.FC<ReaderContentProps> = ({ bookId, chapterId }) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [showHighlightMenu, setShowHighlightMenu] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
  const [selectedText, setSelectedText] = useState('')
  const [selectionInfo, setSelectionInfo] = useState<any>(null)

  const {
    currentBookId,
    currentChapterId,
    chapters,
    highlights,
    loading,
    error,
    fetchBookContent,
    updateReadingProgress,
    addHighlight
  } = useReaderStore()

  // 获取当前章节内容
  const currentChapter = chapters.find(chapter =>
    chapter.id === (chapterId || currentChapterId)
  )

  // 加载书籍内容
  useEffect(() => {
    if (bookId && (!currentBookId || currentBookId !== bookId)) {
      fetchBookContent(bookId)
    }
  }, [bookId, currentBookId, fetchBookContent])

  // 处理滚动事件，更新阅读进度
  const handleScroll = (e) => {
    if (!contentRef.current) return

    const { scrollTop } = e.detail
    const { scrollHeight, clientHeight } = contentRef.current

    const progress = calculateReadingProgress(scrollTop, scrollHeight, clientHeight)
    updateReadingProgress(progress, currentChapter?.id)
  }

  // 处理文本选择
  const handleTextSelect = () => {
    const info = getSelectionInfo()
    if (!info) {
      setShowHighlightMenu(false)
      return
    }

    const { text, startOffset, endOffset } = info
    if (!text) return

    setSelectedText(text)
    setSelectionInfo({ startOffset, endOffset })

    // 计算菜单位置
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()

      setMenuPosition({
        x: rect.left + rect.width / 2,
        y: rect.bottom + 10
      })

      setShowHighlightMenu(true)
    }
  }

  // 创建高亮
  const handleCreateHighlight = (color: string = '#ffeb3b') => {
    if (!selectedText || !selectionInfo || !currentChapter) return

    const { startOffset, endOffset } = selectionInfo

    addHighlight({
      bookId,
      chapterId: currentChapter.id,
      text: selectedText,
      startOffset,
      endOffset,
      color
    })

    setShowHighlightMenu(false)
    window.getSelection()?.removeAllRanges()
  }

  // 渲染章节内容，应用高亮
  const renderChapterContent = () => {
    if (!currentChapter) return null

    // 获取当前章节的高亮
    const chapterHighlights = highlights.filter(h =>
      h.bookId === bookId && h.chapterId === currentChapter.id
    )

    // 应用高亮到内容
    const contentWithHighlights = applyHighlights(currentChapter.content, chapterHighlights)

    return (
      <View
        className='chapterContent'
        ref={contentRef}
        onTouchEnd={handleTextSelect}
        dangerouslySetInnerHTML={{ __html: contentWithHighlights }}
      />
    )
  }

  if (loading) {
    return <View className='loading'>加载中...</View>
  }

  if (error) {
    return <View className='error'>加载失败: {error}</View>
  }

  if (!currentChapter) {
    return <View className='empty'>没有找到章节内容</View>
  }

  return (
    <View className='readerContent'>
      <ScrollView
        scrollY
        className='scrollView'
        onScroll={handleScroll}
        scrollWithAnimation
      >
        <View className='chapterTitle'>
          <Text>{currentChapter.title}</Text>
        </View>

        {renderChapterContent()}
      </ScrollView>

      {showHighlightMenu ? (
        <HighlightMenu
          position={menuPosition}
          onHighlight={handleCreateHighlight}
          onClose={() => setShowHighlightMenu(false)}
        />
      ) : null}
    </View>
  )
}

export default ReaderContent