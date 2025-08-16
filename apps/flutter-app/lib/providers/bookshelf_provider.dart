import 'package:flutter/foundation.dart';
import '../models/book.dart';
import '../services/api_service.dart';

class BookshelfProvider with ChangeNotifier {
  final ApiService _apiService = ApiService();

  List<Book> _books = [];
  bool _loading = false;
  String? _error;

  List<Book> get books => _books;
  bool get loading => _loading;
  String? get error => _error;

  BookshelfProvider() {
    fetchBooks();
  }

  Future<void> fetchBooks() async {
    _loading = true;
    _error = null;
    notifyListeners();

    try {
      final books = await _apiService.fetchBooks();
      _books = books;
      _loading = false;
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      _loading = false;
      notifyListeners();
    }
  }

  void addBookToShelf(Book book) {
    final exists = _books.any((b) => b.id == book.id);
    if (!exists) {
      _books.add(book);
      notifyListeners();
    }
  }

  void removeBookFromShelf(String bookId) {
    _books.removeWhere((book) => book.id == bookId);
    notifyListeners();
  }

  void updateBookProgress(String bookId, double progress) {
    final index = _books.indexWhere((book) => book.id == bookId);
    if (index != -1) {
      _books[index].progress = progress;
      _books[index].lastReadTime = DateTime.now().millisecondsSinceEpoch;
      notifyListeners();
    }
  }
}
