class Highlight {
  final String id;
  final String bookId;
  final String chapterId;
  final String text;
  final int startOffset;
  final int endOffset;
  final String color;
  final int createdAt;

  Highlight({
    required this.id,
    required this.bookId,
    required this.chapterId,
    required this.text,
    required this.startOffset,
    required this.endOffset,
    required this.color,
    required this.createdAt,
  });

  factory Highlight.fromJson(Map<String, dynamic> json) {
    return Highlight(
      id: json['id'],
      bookId: json['bookId'],
      chapterId: json['chapterId'],
      text: json['text'],
      startOffset: json['startOffset'],
      endOffset: json['endOffset'],
      color: json['color'],
      createdAt: json['createdAt'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'bookId': bookId,
      'chapterId': chapterId,
      'text': text,
      'startOffset': startOffset,
      'endOffset': endOffset,
      'color': color,
      'createdAt': createdAt,
    };
  }
}

class Comment {
  final String id;
  final String highlightId;
  final String content;
  final int createdAt;

  Comment({
    required this.id,
    required this.highlightId,
    required this.content,
    required this.createdAt,
  });

  factory Comment.fromJson(Map<String, dynamic> json) {
    return Comment(
      id: json['id'],
      highlightId: json['highlightId'],
      content: json['content'],
      createdAt: json['createdAt'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'highlightId': highlightId,
      'content': content,
      'createdAt': createdAt,
    };
  }
}

class Chapter {
  final String id;
  final String title;
  final String content;

  Chapter({
    required this.id,
    required this.title,
    required this.content,
  });

  factory Chapter.fromJson(Map<String, dynamic> json) {
    return Chapter(
      id: json['id'],
      title: json['title'],
      content: json['content'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'content': content,
    };
  }
}
