import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import BottomTabBar from '../../components/common/BottomTabBar'
import './index.scss'

function MinePage() {
  // 用户信息（实际应用中应该从服务器获取或本地存储）
  const user = {
    avatar: 'https://joeschmoe.io/api/v1/random',
    nickname: '读书爱好者',
    readingDays: 30,
    booksCount: 5
  }

  // 功能列表
  const features = [
    { id: 'notes', title: '我的笔记', icon: '📝' },
    { id: 'highlights', title: '我的划线', icon: '🖌️' },
    { id: 'favorites', title: '我的收藏', icon: '⭐' },
    { id: 'history', title: '阅读历史', icon: '📚' },
    { id: 'settings', title: '设置', icon: '⚙️' },
    { id: 'help', title: '帮助与反馈', icon: '❓' }
  ]

  // 处理功能点击
  const handleFeatureClick = (featureId: string) => {
    Taro.showToast({
      title: `点击了${featureId}功能`,
      icon: 'none'
    })
  }

  return (
    <View className='minePage'>
      {/* 用户信息 */}
      <View className='userCard'>
        <Image className='avatar' src={user.avatar} />
        <View className='userInfo'>
          <Text className='nickname'>{user.nickname}</Text>
          <View className='stats'>
            <View className='statItem'>
              <Text className='statValue'>{user.readingDays}</Text>
              <Text className='statLabel'>阅读天数</Text>
            </View>
            <View className='statItem'>
              <Text className='statValue'>{user.booksCount}</Text>
              <Text className='statLabel'>藏书</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 功能列表 */}
      <View className='featureList'>
        {features.map(feature => (
          <View
            key={feature.id}
            className='featureItem'
            onClick={() => handleFeatureClick(feature.id)}
          >
            <Text className='featureIcon'>{feature.icon}</Text>
            <Text className='featureTitle'>{feature.title}</Text>
            <Text className='featureArrow'>›</Text>
          </View>
        ))}
      </View>

      {/* 版本信息 */}
      <View className='footer'>
        <Text className='version'>微阅读 v1.0.0</Text>
      </View>

      <BottomTabBar current="mine" />
    </View>
  )
}

export default React.memo(MinePage)