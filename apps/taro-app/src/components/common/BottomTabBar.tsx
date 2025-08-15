import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './BottomTabBar.scss'
import '~taro-ui/dist/style/components/icon.scss'

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

const BottomTabBar: React.FC<BottomTabBarProps> = ({ current }) => {
  // 定义底部标签页
  const tabs: TabItem[] = [
    {
      key: 'bookshelf',
      title: '书架',
      icon: '../../assets/icons/record-0.svg', // 需要替换为实际图标路径
      activeIcon: '../../assets/icons/record.svg',
      path: '/pages/bookshelf/index'
    },
    {
      key: 'discover',
      title: '发现',
      icon: '../../assets/icons/record-0.svg', // 需要替换为实际图标路径
      activeIcon: '../../assets/icons/record.svg',
      path: '/pages/index/index'
    },
    {
      key: 'mine',
      title: '我的',
      icon: '../../assets/icons/record-0.svg', // 需要替换为实际图标路径
      activeIcon: '../../assets/icons/record.svg',
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

export default BottomTabBar
