class Book {
  final String id;
  final String title;
  final String author;
  final String cover;
  final String description;
  double progress;
  int? lastReadTime;

  Book({
    required this.id,
    required this.title,
    required this.author,
    required this.cover,
    required this.description,
    this.progress = 0.0,
    this.lastReadTime,
  });

  factory Book.fromJson(Map<String, dynamic> json) {
    return Book(
      id: json['id'],
      title: json['title'],
      author: json['author'],
      cover: json['cover'],
      description: json['description'],
      progress: json['progress'] ?? 0.0,
      lastReadTime: json['lastReadTime'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'author': author,
      'cover': cover,
      'description': description,
      'progress': progress,
      'lastReadTime': lastReadTime,
    };
  }
}
