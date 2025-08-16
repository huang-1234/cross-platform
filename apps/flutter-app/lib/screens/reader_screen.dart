import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:provider/provider.dart';
import 'package:uuid/uuid.dart';

import '../models/highlight.dart';
import '../providers/reader_provider.dart';
import '../widgets/comment_panel.dart';
import '../widgets/highlight_menu.dart';
import '../widgets/reader_bottom_menu.dart';
import '../utils/reader_utils.dart';

class ReaderScreen extends StatefulWidget {
  const ReaderScreen({Key? key}) : super(key: key);

  @override
  State<ReaderScreen> createState() => _ReaderScreenState();
}

class _ReaderScreenState extends State<ReaderScreen> {
  final ScrollController _scrollController = ScrollController();
  String? _bookId;
  String? _selectedText;
  int? _startOffset;
  int? _endOffset;
  bool _showMenu = false;
  String? _activeHighlightId;
  final GlobalKey _contentKey = GlobalKey();

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(_handleScroll);
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final args = ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>?;
    if (args != null && args.containsKey('bookId')) {
      _bookId = args['bookId'] as String;
      _loadBookContent();
    }
  }

  @override
  void dispose() {
    _scrollController.removeListener(_handleScroll);
    _scrollController.dispose();
    super.dispose();
  }

  Future<void> _loadBookContent() async {
    if (_bookId != null) {
      await Provider.of<ReaderProvider>(context, listen: false)
          .fetchBookContent(_bookId!);
    }
  }

  void _handleScroll() {
    if (_scrollController.hasClients) {
      final readerProvider = Provider.of<ReaderProvider>(context, listen: false);
      final scrollPosition = _scrollController.position;
      final progress = scrollPosition.pixels /
          (scrollPosition.maxScrollExtent - scrollPosition.minScrollExtent);
      readerProvider.updateReadingProgress(progress);
    }
  }

  void _toggleMenu() {
    setState(() {
      _showMenu = !_showMenu;
    });
  }

  void _handleTextSelection() {
    final selection = getTextSelection();
    if (selection != null) {
      setState(() {
        _selectedText = selection.text;
        _startOffset = selection.startOffset;
        _endOffset = selection.endOffset;
      });
      _showHighlightMenu();
    }
  }

  void _showHighlightMenu() {
    // 实际应用中应该根据选择位置显示菜单
    // 这里简化为在屏幕中间显示
    showDialog(
      context: context,
      builder: (context) => HighlightMenu(
        onHighlight: _handleCreateHighlight,
        onClose: () => Navigator.of(context).pop(),
      ),
    );
  }

  void _handleCreateHighlight([String color = '#ffeb3b']) {
    if (_selectedText != null && _startOffset != null && _endOffset != null && _bookId != null) {
      final readerProvider = Provider.of<ReaderProvider>(context, listen: false);
      final currentChapter = readerProvider.getCurrentChapter();

      if (currentChapter != null) {
        readerProvider.addHighlight(
          bookId: _bookId!,
          chapterId: currentChapter.id,
          text: _selectedText!,
          startOffset: _startOffset!,
          endOffset: _endOffset!,
          color: color,
        );
      }

      setState(() {
        _selectedText = null;
        _startOffset = null;
        _endOffset = null;
      });

      Navigator.of(context).pop(); // 关闭高亮菜单
    }
  }

  void _handleHighlightTap(String highlightId) {
    setState(() {
      _activeHighlightId = highlightId;
    });
  }

  void _closeCommentPanel() {
    setState(() {
      _activeHighlightId = null;
    });
  }

  String _applyHighlightsToContent(String content) {
    final readerProvider = Provider.of<ReaderProvider>(context);
    final currentChapter = readerProvider.getCurrentChapter();

    if (currentChapter == null) return content;

    final chapterHighlights = readerProvider.highlights.where(
      (h) => h.bookId == _bookId && h.chapterId == currentChapter.id
    ).toList();

    return applyHighlights(content, chapterHighlights);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Consumer<ReaderProvider>(
        builder: (context, readerProvider, child) {
          if (readerProvider.loading) {
            return const Center(child: CircularProgressIndicator());
          }

          if (readerProvider.error != null) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    '加载失败: ${readerProvider.error}',
                    style: const TextStyle(color: Colors.red),
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: _loadBookContent,
                    child: const Text('重试'),
                  ),
                ],
              ),
            );
          }

          final currentChapter = readerProvider.getCurrentChapter();
          if (currentChapter == null) {
            return const Center(
              child: Text('没有找到章节内容'),
            );
          }

          // 应用高亮到内容
          final contentWithHighlights = _applyHighlightsToContent(currentChapter.content);

          return GestureDetector(
            onTap: _toggleMenu,
            onLongPress: _handleTextSelection,
            child: SafeArea(
              child: Stack(
                children: [
                  // 内容区域
                  SingleChildScrollView(
                    controller: _scrollController,
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // 章节标题
                        Padding(
                          padding: const EdgeInsets.symmetric(vertical: 20),
                          child: Center(
                            child: Text(
                              currentChapter.title,
                              style: const TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),

                        // 章节内容
                        Html(
                          data: contentWithHighlights,
                          key: _contentKey,
                          style: {
                            'body': Style(
                              fontSize: FontSize(readerProvider.fontSize),
                              lineHeight: const LineHeight(1.8),
                              color: readerProvider.isDarkMode
                                  ? Colors.white
                                  : Colors.black87,
                            ),
                            '.highlight': Style(
                              backgroundColor: Colors.yellow.withOpacity(0.5),
                              padding: const EdgeInsets.symmetric(
                                horizontal: 2,
                              ),
                            ),
                          },
                          onLinkTap: (url, _, __, ___) {
                            if (url != null && url.startsWith('highlight://')) {
                              final highlightId = url.replaceFirst('highlight://', '');
                              _handleHighlightTap(highlightId);
                            }
                          },
                        ),

                        // 底部空白，防止内容被底部菜单遮挡
                        const SizedBox(height: 100),
                      ],
                    ),
                  ),

                  // 底部菜单
                  if (_showMenu)
                    Positioned(
                      left: 0,
                      right: 0,
                      bottom: 0,
                      child: ReaderBottomMenu(
                        onFontSizeChange: (type) {
                          if (type == 'increase') {
                            readerProvider.changeFontSize(readerProvider.fontSize + 2);
                          } else {
                            readerProvider.changeFontSize(readerProvider.fontSize - 2);
                          }
                        },
                        onThemeChange: readerProvider.toggleDarkMode,
                        onBackToBookshelf: () => Navigator.of(context).pop(),
                        onShowChapters: () {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text('目录功能开发中'),
                              duration: Duration(seconds: 1),
                            ),
                          );
                        },
                      ),
                    ),

                  // 评论面板
                  if (_activeHighlightId != null)
                    Positioned(
                      left: 0,
                      right: 0,
                      bottom: 0,
                      child: CommentPanel(
                        highlightId: _activeHighlightId!,
                        onClose: _closeCommentPanel,
                      ),
                    ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
