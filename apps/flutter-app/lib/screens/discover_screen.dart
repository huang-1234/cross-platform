import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/book.dart';
import '../providers/bookshelf_provider.dart';
import '../services/api_service.dart';

class DiscoverScreen extends StatefulWidget {
  const DiscoverScreen({Key? key}) : super(key: key);

  @override
  State<DiscoverScreen> createState() => _DiscoverScreenState();
}

class _DiscoverScreenState extends State<DiscoverScreen> {
  final List<String> categories = [
    '文学',
    '小说',
    '历史',
    '科技',
    '经济',
    '生活',
    '艺术',
    '教育'
  ];

  List<Book> recommendBooks = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadRecommendBooks();
  }

  Future<void> _loadRecommendBooks() async {
    setState(() {
      isLoading = true;
    });

    try {
      // 在实际应用中，这里应该调用不同的API获取推荐书籍
      // 这里为了简单，使用相同的模拟数据
      await Future.delayed(const Duration(milliseconds: 800));
      setState(() {
        recommendBooks = mockBooks;
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('发现好书'),
      ),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Padding(
                    padding: EdgeInsets.fromLTRB(16, 16, 16, 8),
                    child: Text(
                      '推荐阅读',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  ListView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    padding: const EdgeInsets.all(16),
                    itemCount: recommendBooks.length,
                    itemBuilder: (context, index) {
                      return BookCard(book: recommendBooks[index]);
                    },
                  ),
                  const Padding(
                    padding: EdgeInsets.fromLTRB(16, 16, 16, 8),
                    child: Text(
                      '热门分类',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(16),
                    child: Wrap(
                      spacing: 12,
                      runSpacing: 12,
                      children: categories.map((category) {
                        return CategoryItem(category: category);
                      }).toList(),
                    ),
                  ),
                  const SizedBox(height: 80), // 底部空白，防止内容被底部导航栏遮挡
                ],
              ),
            ),
    );
  }
}

class BookCard extends StatelessWidget {
  final Book book;

  const BookCard({Key? key, required this.book}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.pushNamed(
          context,
          '/reader',
          arguments: {'bookId': book.id},
        );
      },
      child: Container(
        margin: const EdgeInsets.only(bottom: 16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(8),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(4),
                child: Image.network(
                  book.cover,
                  width: 80,
                  height: 120,
                  fit: BoxFit.cover,
                  errorBuilder: (context, error, stackTrace) {
                    return Container(
                      width: 80,
                      height: 120,
                      color: Colors.grey[300],
                      child: const Icon(Icons.broken_image),
                    );
                  },
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      book.title,
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      book.author,
                      style: TextStyle(
                        fontSize: 14,
                        color: Colors.grey[600],
                      ),
                    ),
                    const SizedBox(height: 16),
                    Consumer<BookshelfProvider>(
                      builder: (context, bookshelfProvider, child) {
                        final isInBookshelf = bookshelfProvider.books
                            .any((b) => b.id == book.id);
                        return ElevatedButton(
                          onPressed: isInBookshelf
                              ? null
                              : () {
                                  bookshelfProvider.addBookToShelf(book);
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    const SnackBar(
                                      content: Text('已添加到书架'),
                                      duration: Duration(seconds: 2),
                                    ),
                                  );
                                },
                          style: ElevatedButton.styleFrom(
                            minimumSize: const Size(double.infinity, 36),
                          ),
                          child: Text(isInBookshelf ? '已在书架' : '加入书架'),
                        );
                      },
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class CategoryItem extends StatelessWidget {
  final String category;

  const CategoryItem({Key? key, required this.category}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        // 处理分类点击
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('你点击了$category分类'),
            duration: const Duration(seconds: 1),
          ),
        );
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(4),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 4,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Text(category),
      ),
    );
  }
}
