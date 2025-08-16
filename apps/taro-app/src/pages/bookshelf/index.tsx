import React, { useEffect } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useBookshelfStore } from '../../store/bookshelfStore'
import BottomTabBar from '../../components/common/BottomTabBar'
import './index.scss'

const BookshelfPage = () => {
  const { books, loading, error, fetchBooks } = useBookshelfStore()

  // 获取书架上的书籍
  useEffect(() => {
    fetchBooks()
  }, [fetchBooks])

  // 打开阅读器
  function handleOpenBook(bookId: string) {
    Taro.navigateTo({
      url: `/pages/reader/index?bookId=${bookId}`
    })
  }

  // 渲染书籍项
  function renderBookItem(book) {
    return (
      <View
        key={book.id}
        className='bookItem'
        onClick={() => handleOpenBook(book.id)}
      >
        <Image className='bookCover' src={book.cover} mode="aspectFill" />
        <View className='bookInfo'>
          <Text className='bookTitle'>{book.title}</Text>
          <Text className='bookAuthor'>{book.author}</Text>
          {book.progress > 0 && (
            <View className='progressBar'>
              <View
                className='progressInner'
                style={{ width: `${book.progress * 100}%` }}
              />
            </View>
          )}
        </View>
      </View>
    )
  }

  return (
    <View className='bookshelfPage'>
      <View className='header'>
        <Text className='title'>我的书架</Text>
      </View>

      <View className='bookList'>
        {loading ? (
          <View className='loading'>加载中...</View>
        ) : error ? (
          <View className='error'>
            <Text>{error}</Text>
            <Text className='retry' onClick={() => fetchBooks()}>重试</Text>
          </View>
        ) : books.length > 0 ? (
          books.map(book => renderBookItem(book))
        ) : (
          <View className='empty'>
            <Text>书架空空如也，快去添加图书吧</Text>
          </View>
        )}
      </View>

      <BottomTabBar current="bookshelf" />
    </View>
  )
}

export default React.memo(BookshelfPage)