import 'package:uuid/uuid.dart';
import '../models/highlight.dart';

class SelectionInfo {
  final String text;
  final int startOffset;
  final int endOffset;

  SelectionInfo({
    required this.text,
    required this.startOffset,
    required this.endOffset,
  });
}

// 模拟获取文本选择信息
// 在实际的Flutter应用中，这需要使用更复杂的方法来获取选择的文本
SelectionInfo? getTextSelection() {
  // 这里只是一个模拟实现
  // 实际应用中，需要使用Flutter的TextSelection或自定义的文本选择机制
  return null;
}

// 应用高亮到文本
String applyHighlights(String content, List<Highlight> highlights) {
  if (highlights.isEmpty) return content;

  // 按照结束位置倒序排列，以避免位置偏移问题
  final sortedHighlights = [...highlights]..sort((a, b) => b.endOffset.compareTo(a.endOffset));

  String highlightedContent = content;

  for (final highlight in sortedHighlights) {
    final before = highlightedContent.substring(0, highlight.startOffset);
    final selected = highlightedContent.substring(highlight.startOffset, highlight.endOffset);
    final after = highlightedContent.substring(highlight.endOffset);

    highlightedContent = '$before<span class="highlight" data-id="${highlight.id}" style="background-color: ${highlight.color}" onclick="window.location.href=\'highlight://${highlight.id}\'">$selected</span>$after';
  }

  return highlightedContent;
}

// 计算阅读进度
double calculateReadingProgress(double scrollPosition, double contentHeight, double viewportHeight) {
  if (contentHeight <= viewportHeight) return 1.0;

  final progress = scrollPosition / (contentHeight - viewportHeight);
  return progress.clamp(0.0, 1.0);
}

// 格式化时间
String formatTime(int timestamp) {
  final date = DateTime.fromMillisecondsSinceEpoch(timestamp);
  return '${date.year}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')} ${date.hour.toString().padLeft(2, '0')}:${date.minute.toString().padLeft(2, '0')}';
}
