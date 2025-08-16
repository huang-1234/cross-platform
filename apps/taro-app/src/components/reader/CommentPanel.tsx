import React, { useState } from 'react'
import { View, Text, Textarea, Button } from '@tarojs/components'
import { useReaderStore } from '../../store/readerStore'
import { formatTime } from '../../utils/reader'
import './CommentPanel.scss'

interface CommentPanelProps {
  highlightId: string
  onClose: () => void
}

function CommentPanel({ highlightId, onClose }: CommentPanelProps) {
  const [commentText, setCommentText] = useState('')

  const {
    highlights,
    comments,
    addComment,
    removeComment,
    removeHighlight
  } = useReaderStore()

  // 获取当前高亮
  const currentHighlight = highlights.find(h => h.id === highlightId)

  // 获取当前高亮的所有评论
  const highlightComments = comments.filter(c => c.highlightId === highlightId)

  // 添加评论
  const handleAddComment = () => {
    if (!commentText.trim()) return

    addComment({
      highlightId,
      content: commentText.trim()
    })

    setCommentText('')
  }

  // 删除评论
  const handleDeleteComment = (commentId: string) => {
    removeComment(commentId)
  }

  // 删除高亮
  const handleDeleteHighlight = () => {
    removeHighlight(highlightId)
    onClose()
  }

  if (!currentHighlight) {
    return null
  }

  return (
    <View className='commentPanel'>
      <View className='header'>
        <Text className='title'>笔记与评论</Text>
        <Text className='closeBtn' onClick={onClose}>×</Text>
      </View>

      <View className='highlightContent'>
        <View
          className='highlightText'
          style={{ backgroundColor: currentHighlight.color }}
        >
          {currentHighlight.text}
        </View>
        <View className='highlightTime'>
          {formatTime(currentHighlight.createdAt)}
        </View>
        <View className='deleteHighlight' onClick={handleDeleteHighlight}>
          删除划线
        </View>
      </View>

      <View className='commentList'>
        {highlightComments.length > 0 ? (
          highlightComments.map(comment => (
            <View key={comment.id} className='commentItem'>
              <View className='commentContent'>
                {comment.content}
              </View>
              <View className='commentFooter'>
                <Text className='commentTime'>
                  {formatTime(comment.createdAt)}
                </Text>
                <Text
                  className='deleteComment'
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  删除
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View className='emptyComment'>暂无评论</View>
        )}
      </View>

      <View className='commentInput'>
        <Textarea
          className='textarea'
          value={commentText}
          onInput={e => setCommentText(e.detail.value)}
          placeholder="写下你的评论..."
          maxlength={200}
          autoHeight
        />
        <Button
          className='submitBtn'
          disabled={!commentText.trim()}
          onClick={handleAddComment}
        >
          发表
        </Button>
      </View>
    </View>
  )
}

export default React.memo(CommentPanel)