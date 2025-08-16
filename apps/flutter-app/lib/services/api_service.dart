import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/book.dart';
import '../models/highlight.dart';

class ApiService {
  static const String baseUrl = 'https://api.example.com';

  Future<List<Book>> fetchBooks() async {
    // 在实际项目中，这里应该调用真实API
    // final response = await http.get(Uri.parse('$baseUrl/books'));
    // if (response.statusCode == 200) {
    //   final List<dynamic> data = json.decode(response.body);
    //   return data.map((item) => Book.fromJson(item)).toList();
    // } else {
    //   throw Exception('Failed to load books');
    // }

    // 使用模拟数据
    return Future.delayed(const Duration(milliseconds: 500), () => mockBooks);
  }

  Future<Book> fetchBookDetail(String bookId) async {
    // 在实际项目中，这里应该调用真实API
    // final response = await http.get(Uri.parse('$baseUrl/books/$bookId'));
    // if (response.statusCode == 200) {
    //   return Book.fromJson(json.decode(response.body));
    // } else {
    //   throw Exception('Failed to load book details');
    // }

    // 使用模拟数据
    return Future.delayed(const Duration(milliseconds: 300), () {
      final book = mockBooks.firstWhere((b) => b.id == bookId,
          orElse: () => throw Exception('Book not found'));
      return book;
    });
  }

  Future<BookContent> fetchBookContent(String bookId) async {
    // 在实际项目中，这里应该调用真实API
    // final response = await http.get(Uri.parse('$baseUrl/books/$bookId/content'));
    // if (response.statusCode == 200) {
    //   final data = json.decode(response.body);
    //   return BookContent(
    //     bookId: data['bookId'],
    //     chapters: (data['chapters'] as List)
    //         .map((chapter) => Chapter.fromJson(chapter))
    //         .toList(),
    //   );
    // } else {
    //   throw Exception('Failed to load book content');
    // }

    // 使用模拟数据
    return Future.delayed(const Duration(milliseconds: 700), () => mockBookContent);
  }
}

class BookContent {
  final String bookId;
  final List<Chapter> chapters;

  BookContent({
    required this.bookId,
    required this.chapters,
  });
}

// 模拟数据
final List<Book> mockBooks = [
  Book(
    id: '1',
    title: '活着',
    author: '余华',
    cover: 'https://img3.doubanio.com/view/subject/l/public/s29053580.jpg',
    description: '《活着》是作家余华的代表作之一，讲述了农村人福贵悲惨的人生遭遇。',
    progress: 0.3,
    lastReadTime: DateTime.now().millisecondsSinceEpoch - 86400000,
  ),
  Book(
    id: '2',
    title: '百年孤独',
    author: '加西亚·马尔克斯',
    cover: 'https://img1.doubanio.com/view/subject/l/public/s6384944.jpg',
    description: '《百年孤独》是魔幻现实主义文学的代表作，描写了布恩迪亚家族七代人的传奇故事。',
    progress: 0.5,
    lastReadTime: DateTime.now().millisecondsSinceEpoch - 2 * 86400000,
  ),
  Book(
    id: '3',
    title: '围城',
    author: '钱钟书',
    cover: 'https://img2.doubanio.com/view/subject/l/public/s1070222.jpg',
    description: '《围城》是钱钟书所著的长篇小说，描写了青年方鸿渐从留学回国到结婚的经历。',
    progress: 0.8,
    lastReadTime: DateTime.now().millisecondsSinceEpoch - 5 * 86400000,
  ),
];

// 模拟书籍内容
final BookContent mockBookContent = BookContent(
  bookId: '1',
  chapters: [
    Chapter(
      id: 'chapter-1',
      title: '第一章',
      content: '我比现在年轻十岁的时候，获得了一个游手好闲的职业，去乡间收集民间歌谣。那一年的整个夏天，我骑着一辆旧自行车在收集歌谣的路上奔波，天很蓝，路两旁的树木很茂盛，风吹过树梢发出沙沙的响声。我喜欢这样的夏天，也喜欢我的工作，尽管它毫无意义。我想我年轻的时候是一个纯粹的人，喜欢的就是喜欢，不喜欢的就是不喜欢，我的喜欢里面没有杂质，我心里的一切都是简单的。',
    ),
    Chapter(
      id: 'chapter-2',
      title: '第二章',
      content: '我的工作职责是到农村收集民间歌谣，到了一个地方，我先去拜访那里的乡长，说明我的来意后，乡长就召集村里的老人来唱歌给我听，我把他们的歌谣记录下来。有时候还会有乡长酒宴的邀请，我这才知道什么叫做宾至如归。',
    ),
  ],
);
