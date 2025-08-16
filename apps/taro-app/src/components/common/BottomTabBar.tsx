import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './BottomTabBar.scss'

import record from '../../assets/icons/record.svg'


// 书架
// import bookshelf from '../../assets/icons/bookshelf.svg'
const bookshelfIcon = record
const bookshelfActiveIcon = record;

// 发现
// import discover from '../../assets/icons/discover.svg'
const discoverIcon = record
const discoverActiveIcon = record;

// 我的
// import mine from '../../assets/icons/mine.svg'
const mineIcon = record
const mineActiveIcon = record;

interface TabItem {
  key: string
  title: string
  icon: string
  activeIcon: string
  path: string
}

interface BottomTabBarProps {
  current: string
}

function BottomTabBar({ current }: BottomTabBarProps) {
  // 定义底部标签页
  const tabs: TabItem[] = [
    {
      key: 'bookshelf',
      title: '书架',
      icon: bookshelfIcon, // 需要替换为实际图标路径
      activeIcon: bookshelfActiveIcon,
      path: '/pages/bookshelf/index'
    },
    {
      key: 'discover',
      title: '发现',
      icon: discoverIcon, // 需要替换为实际图标路径
      activeIcon: discoverActiveIcon,
      path: '/pages/index/index'
    },
    {
      key: 'mine',
      title: '我的',
      icon: mineIcon, // 需要替换为实际图标路径
      activeIcon: mineActiveIcon,
      path: '/pages/mine/index'
    }
  ]

  // 处理标签点击
  const handleTabClick = (path: string) => {
    Taro.switchTab({ url: path })
  }

  return (
    <View className='bottomTabBar'>
      {tabs.map(tab => (
        <View
          key={tab.key}
          className={`tabItem ${current === tab.key ? 'active' : ''}`}
          onClick={() => handleTabClick(tab.path)}
        >
          <Image
            className='tabIcon'
            src={current === tab.key ? tab.activeIcon : tab.icon}
          />
          <Text className='tabTitle'>{tab.title}</Text>
        </View>
      ))}
    </View>
  )
}

export default React.memo(BottomTabBar)