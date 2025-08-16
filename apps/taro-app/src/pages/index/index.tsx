import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useBookshelfStore, Book } from '../../store/bookshelfStore'
import { mockBooks } from '../../services/api'
import BottomTabBar from '../../components/common/BottomTabBar'
import './index.scss'

function IndexPage() {
  const [recommendBooks, setRecommendBooks] = useState<Book[]>([])
  const { addBookToShelf } = useBookshelfStore()

  // 模拟获取推荐书籍
  useEffect(() => {
    // 这里使用mockBooks作为推荐书籍数据
    setRecommendBooks(mockBooks)
  }, [])

  // 打开阅读器
  const handleOpenBook = (bookId: string) => {
    Taro.navigateTo({
      url: `/pages/reader/index?bookId=${bookId}`
    })
  }

  // 添加到书架
  const handleAddToShelf = (book: Book, e: any) => {
    e.stopPropagation()
    addBookToShelf(book)
    Taro.showToast({
      title: '已添加到书架',
      icon: 'success',
      duration: 2000
    })
  }

  return (
    <View className='indexPage'>
      <View className='header'>
        <Text className='title'>发现好书</Text>
      </View>

      <ScrollView scrollY className='content'>
        <View className='section'>
          <View className='sectionHeader'>
            <Text className='sectionTitle'>推荐阅读</Text>
          </View>

          <View className='bookList'>
            {recommendBooks.map(book => (
              <View
                key={book.id}
                className='bookCard'
                onClick={() => handleOpenBook(book.id)}
              >
                <Image className='bookCover' src={book.cover} mode="aspectFill" />
                <View className='bookInfo'>
                  <Text className='bookTitle'>{book.title}</Text>
                  <Text className='bookAuthor'>{book.author}</Text>
                  <Text
                    className='addButton'
                    onClick={(e) => handleAddToShelf(book, e)}
                  >
                    加入书架
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View className='section'>
          <View className='sectionHeader'>
            <Text className='sectionTitle'>热门分类</Text>
          </View>

          <View className='categoryList'>
            {['文学', '小说', '历史', '科技', '经济', '生活', '艺术', '教育'].map(category => (
              <View key={category} className='categoryItem'>
                <Text>{category}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 底部空白，防止内容被底部标签栏遮挡 */}
        <View style={{ height: '120px' }} />
      </ScrollView>

      <BottomTabBar current="discover" />
    </View>
  )
}

export default React.memo(IndexPage)