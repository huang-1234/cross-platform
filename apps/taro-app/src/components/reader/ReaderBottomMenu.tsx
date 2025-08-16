import React from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './ReaderBottomMenu.scss'

interface ReaderBottomMenuProps {
  onFontSizeChange: (type: 'increase' | 'decrease') => void
  onThemeChange: () => void
  onBackToBookshelf: () => void
  onShowChapters: () => void
}

function ReaderBottomMenu({
  onFontSizeChange,
  onThemeChange,
  onBackToBookshelf,
  onShowChapters
}: ReaderBottomMenuProps) {
  return (
    <View className='readerBottomMenu'>
      <View className='menuItem' onClick={onBackToBookshelf}>
        <Text className='menuIcon'>📚</Text>
        <Text className='menuText'>书架</Text>
      </View>

      <View className='menuItem' onClick={onShowChapters}>
        <Text className='menuIcon'>📑</Text>
        <Text className='menuText'>目录</Text>
      </View>

      <View className='menuItem' onClick={() => onFontSizeChange('decrease')}>
        <Text className='menuIcon'>A-</Text>
        <Text className='menuText'>缩小</Text>
      </View>

      <View className='menuItem' onClick={() => onFontSizeChange('increase')}>
        <Text className='menuIcon'>A+</Text>
        <Text className='menuText'>放大</Text>
      </View>

      <View className='menuItem' onClick={onThemeChange}>
        <Text className='menuIcon'>🌓</Text>
        <Text className='menuText'>主题</Text>
      </View>
    </View>
  )
}

export default React.memo(ReaderBottomMenu)