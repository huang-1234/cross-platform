import 'package:flutter/foundation.dart';
import 'package:uuid/uuid.dart';

import '../models/highlight.dart';
import '../services/api_service.dart';

class ReaderProvider with ChangeNotifier {
  final ApiService _apiService = ApiService();
  final Uuid _uuid = const Uuid();

  String? _currentBookId;
  String? _currentChapterId;
  List<Chapter> _chapters = [];
  List<Highlight> _highlights = [];
  List<Comment> _comments = [];
  double _readingProgress = 0.0;
  bool _loading = false;
  String? _error;
  double _fontSize = 16.0;
  bool _isDarkMode = false;

  String? get currentBookId => _currentBookId;
  String? get currentChapterId => _currentChapterId;
  List<Chapter> get chapters => _chapters;
  List<Highlight> get highlights => _highlights;
  List<Comment> get comments => _comments;
  double get readingProgress => _readingProgress;
  bool get loading => _loading;
  String? get error => _error;
  double get fontSize => _fontSize;
  bool get isDarkMode => _isDarkMode;

  Future<void> fetchBookContent(String bookId) async {
    _loading = true;
    _error = null;
    _currentBookId = bookId;
    notifyListeners();

    try {
      final data = await _apiService.fetchBookContent(bookId);
      _chapters = data.chapters;
      _currentChapterId = data.chapters.isNotEmpty ? data.chapters[0].id : null;
      _loading = false;
      notifyListeners();
    } catch (e) {
      _error = e.toString();
      _loading = false;
      notifyListeners();
    }
  }

  Highlight addHighlight({
    required String bookId,
    required String chapterId,
    required String text,
    required int startOffset,
    required int endOffset,
    String color = '#ffeb3b',
  }) {
    final highlight = Highlight(
      id: _uuid.v4(),
      bookId: bookId,
      chapterId: chapterId,
      text: text,
      startOffset: startOffset,
      endOffset: endOffset,
      color: color,
      createdAt: DateTime.now().millisecondsSinceEpoch,
    );

    _highlights.add(highlight);
    notifyListeners();
    return highlight;
  }

  void removeHighlight(String highlightId) {
    _highlights.removeWhere((h) => h.id == highlightId);
    _comments.removeWhere((c) => c.highlightId == highlightId);
    notifyListeners();
  }

  Comment addComment({
    required String highlightId,
    required String content,
  }) {
    final comment = Comment(
      id: _uuid.v4(),
      highlightId: highlightId,
      content: content,
      createdAt: DateTime.now().millisecondsSinceEpoch,
    );

    _comments.add(comment);
    notifyListeners();
    return comment;
  }

  void removeComment(String commentId) {
    _comments.removeWhere((c) => c.id == commentId);
    notifyListeners();
  }

  void updateReadingProgress(double progress, [String? chapterId]) {
    _readingProgress = progress;
    if (chapterId != null) {
      _currentChapterId = chapterId;
    }
    notifyListeners();
  }

  void changeFontSize(double size) {
    _fontSize = size;
    notifyListeners();
  }

  void toggleDarkMode() {
    _isDarkMode = !_isDarkMode;
    notifyListeners();
  }

  Chapter? getCurrentChapter() {
    if (_currentChapterId == null) return null;
    return _chapters.firstWhere(
      (chapter) => chapter.id == _currentChapterId,
      orElse: () => _chapters.isNotEmpty ? _chapters[0] : null as Chapter,
    );
  }
}
