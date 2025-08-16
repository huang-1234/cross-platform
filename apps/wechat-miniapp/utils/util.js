const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

// 应用高亮到文本
const applyHighlights = (content, highlights) => {
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

// 计算阅读进度
const calculateReadingProgress = (scrollTop, contentHeight, viewportHeight) => {
  if (contentHeight <= viewportHeight) return 1

  const progress = scrollTop / (contentHeight - viewportHeight)
  return Math.min(Math.max(progress, 0), 1)
}

// 生成UUID
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

module.exports = {
  formatTime,
  applyHighlights,
  calculateReadingProgress,
  generateUUID
}
