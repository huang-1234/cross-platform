import { v4 as uuidv4 } from 'uuid'
import { Highlight, Comment } from '../store/reducers/reader'

/**
 * 创建高亮对象
 */
export function createHighlight(bookId: string, chapterId: string, text: string, startOffset: number, endOffset: number): Highlight {
  return {
    id: uuidv4(),
    bookId,
    chapterId,
    text,
    startOffset,
    endOffset,
    color: '#ffeb3b', // 默认高亮颜色
    createdAt: Date.now()
  }
}

/**
 * 创建评论对象
 */
export function createComment(highlightId: string, content: string): Comment {
  return {
    id: uuidv4(),
    highlightId,
    content,
    createdAt: Date.now()
  }
}

/**
 * 获取选中的文本信息
 */
export function getSelectionInfo() {
  const selection = window.getSelection()
  if (!selection || selection.rangeCount === 0) return null

  const range = selection.getRangeAt(0)
  const text = range.toString().trim()

  if (!text) return null

  // 获取起始和结束位置
  const preCaretRange = range.cloneRange()
  const element = range.startContainer.parentElement

  preCaretRange.selectNodeContents(element)
  preCaretRange.setEnd(range.startContainer, range.startOffset)
  const startOffset = preCaretRange.toString().length

  preCaretRange.selectNodeContents(element)
  preCaretRange.setEnd(range.endContainer, range.endOffset)
  const endOffset = preCaretRange.toString().length

  return {
    text,
    startOffset,
    endOffset,
    element
  }
}

/**
 * 应用高亮到文本
 */
export function applyHighlights(content: string, highlights: Highlight[]): string {
  if (!highlights || highlights.length === 0) return content

  // 按照结束位置倒序排列，以避免位置偏移问题
  const sortedHighlights = [...highlights].sort((a, b) => b.endOffset - a.endOffset)

  let highlightedContent = content

  sortedHighlights.forEach(highlight => {
    const { startOffset, endOffset, id, color } = highlight
    const before = highlightedContent.substring(0, startOffset)
    const selected = highlightedContent.substring(startOffset, endOffset)
    const after = highlightedContent.substring(endOffset)

    highlightedContent = `${before}<span class="highlight" data-id="${id}" style="background-color: ${color}">${selected}</span>${after}`
  })

  return highlightedContent
}

/**
 * 计算阅读进度
 */
export function calculateReadingProgress(scrollTop: number, contentHeight: number, viewportHeight: number): number {
  if (contentHeight <= viewportHeight) return 1

  const progress = scrollTop / (contentHeight - viewportHeight)
  return Math.min(Math.max(progress, 0), 1)
}

/**
 * 格式化时间
 */
export function formatTime(timestamp: number): string {
  const date = new Date(timestamp)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
