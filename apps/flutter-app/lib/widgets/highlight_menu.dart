import 'package:flutter/material.dart';

class HighlightMenu extends StatelessWidget {
  final Function(String) onHighlight;
  final VoidCallback onClose;

  const HighlightMenu({
    Key? key,
    required this.onHighlight,
    required this.onClose,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final colors = [
      {'value': '#ffeb3b', 'label': '黄色'},
      {'value': '#a5d6a7', 'label': '绿色'},
      {'value': '#90caf9', 'label': '蓝色'},
      {'value': '#ef9a9a', 'label': '红色'},
    ];

    return Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // 颜色选项
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: colors.map((color) {
                return InkWell(
                  onTap: () => onHighlight(color['value'] as String),
                  child: Container(
                    width: 40,
                    height: 40,
                    decoration: BoxDecoration(
                      color: Color(int.parse(
                        (color['value'] as String).replaceFirst('#', '0xff'),
                      )),
                      shape: BoxShape.circle,
                      border: Border.all(color: Colors.grey[300]!),
                    ),
                  ),
                );
              }).toList(),
            ),
            const SizedBox(height: 16),

            // 操作按钮
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                Expanded(
                  child: ElevatedButton(
                    onPressed: () => onHighlight('#ffeb3b'),
                    child: const Text('高亮'),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: OutlinedButton(
                    onPressed: onClose,
                    child: const Text('取消'),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
