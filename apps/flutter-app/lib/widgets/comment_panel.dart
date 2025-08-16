import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../models/highlight.dart';
import '../providers/reader_provider.dart';
import '../utils/reader_utils.dart';

class CommentPanel extends StatefulWidget {
  final String highlightId;
  final VoidCallback onClose;

  const CommentPanel({
    Key? key,
    required this.highlightId,
    required this.onClose,
  }) : super(key: key);

  @override
  State<CommentPanel> createState() => _CommentPanelState();
}

class _CommentPanelState extends State<CommentPanel> {
  final TextEditingController _commentController = TextEditingController();

  @override
  void dispose() {
    _commentController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<ReaderProvider>(
      builder: (context, readerProvider, child) {
        final currentHighlight = readerProvider.highlights
            .firstWhere((h) => h.id == widget.highlightId);
        final highlightComments = readerProvider.comments
            .where((c) => c.highlightId == widget.highlightId)
            .toList();

        return Container(
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: const BorderRadius.only(
              topLeft: Radius.circular(16),
              topRight: Radius.circular(16),
            ),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.1),
                blurRadius: 10,
                offset: const Offset(0, -2),
              ),
            ],
          ),
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // 标题栏
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    '笔记与评论',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.close),
                    onPressed: widget.onClose,
                  ),
                ],
              ),

              // 高亮内容
              Container(
                padding: const EdgeInsets.all(16),
                margin: const EdgeInsets.symmetric(vertical: 16),
                decoration: BoxDecoration(
                  color: Colors.grey[100],
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 4),
                      decoration: BoxDecoration(
                        color: Color(int.parse(
                          currentHighlight.color.replaceFirst('#', '0xff'),
                        )),
                        borderRadius: BorderRadius.circular(2),
                      ),
                      child: Text(currentHighlight.text),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      formatTime(currentHighlight.createdAt),
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.grey[600],
                      ),
                    ),
                    const SizedBox(height: 8),
                    Align(
                      alignment: Alignment.centerRight,
                      child: TextButton(
                        onPressed: () {
                          readerProvider.removeHighlight(widget.highlightId);
                          widget.onClose();
                        },
                        child: const Text(
                          '删除划线',
                          style: TextStyle(color: Colors.red),
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              // 评论列表
              ConstrainedBox(
                constraints: BoxConstraints(
                  maxHeight: MediaQuery.of(context).size.height * 0.3,
                ),
                child: highlightComments.isEmpty
                    ? const Center(
                        child: Padding(
                          padding: EdgeInsets.all(16),
                          child: Text('暂无评论'),
                        ),
                      )
                    : ListView.builder(
                        shrinkWrap: true,
                        itemCount: highlightComments.length,
                        itemBuilder: (context, index) {
                          final comment = highlightComments[index];
                          return Container(
                            padding: const EdgeInsets.all(12),
                            margin: const EdgeInsets.only(bottom: 8),
                            decoration: BoxDecoration(
                              border: Border(
                                bottom: BorderSide(
                                  color: Colors.grey[200]!,
                                ),
                              ),
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(comment.content),
                                const SizedBox(height: 8),
                                Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Text(
                                      formatTime(comment.createdAt),
                                      style: TextStyle(
                                        fontSize: 12,
                                        color: Colors.grey[600],
                                      ),
                                    ),
                                    TextButton(
                                      onPressed: () => readerProvider
                                          .removeComment(comment.id),
                                      child: const Text(
                                        '删除',
                                        style: TextStyle(color: Colors.red),
                                      ),
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          );
                        },
                      ),
              ),

              // 评论输入框
              Padding(
                padding: EdgeInsets.only(
                  bottom: MediaQuery.of(context).viewInsets.bottom,
                  top: 16,
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _commentController,
                        decoration: const InputDecoration(
                          hintText: '写下你的评论...',
                          border: OutlineInputBorder(),
                          contentPadding: EdgeInsets.symmetric(
                            horizontal: 12,
                            vertical: 8,
                          ),
                        ),
                        maxLines: 3,
                        minLines: 1,
                      ),
                    ),
                    const SizedBox(width: 12),
                    ElevatedButton(
                      onPressed: _commentController.text.trim().isEmpty
                          ? null
                          : () {
                              readerProvider.addComment(
                                highlightId: widget.highlightId,
                                content: _commentController.text.trim(),
                              );
                              _commentController.clear();
                            },
                      child: const Text('发表'),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
