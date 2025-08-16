import React from 'react'
import { View } from '@tarojs/components'
import './HighlightMenu.scss'

interface HighlightMenuProps {
  position: { x: number; y: number }
  onHighlight: (color?: string) => void
  onClose: () => void
}

function HighlightMenu({
  position,
  onHighlight,
  onClose
}: HighlightMenuProps) {
  // 高亮颜色选项
  const colors = [
    { value: '#ffeb3b', label: '黄色' },
    { value: '#a5d6a7', label: '绿色' },
    { value: '#90caf9', label: '蓝色' },
    { value: '#ef9a9a', label: '红色' }
  ]

  // 处理高亮颜色选择
  const handleColorSelect = (color: string) => {
    onHighlight(color)
  }

  return (
    <View
      className='highlightMenu'
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    >
      <View className='menuContent'>
        <View className='colorOptions'>
          {colors.map(color => (
            <View
              key={color.value}
              className='colorOption'
              style={{ backgroundColor: color.value }}
              onClick={() => handleColorSelect(color.value)}
            />
          ))}
        </View>

        <View className='menuItem' onClick={() => onHighlight()}>
          高亮
        </View>

        <View className='menuItem' onClick={onClose}>
          取消
        </View>
      </View>
      <View className='arrow' />
    </View>
  )
}

export default React.memo(HighlightMenu)