import 'package:flutter/material.dart';

class ReaderBottomMenu extends StatelessWidget {
  final Function(String) onFontSizeChange;
  final VoidCallback onThemeChange;
  final VoidCallback onBackToBookshelf;
  final VoidCallback onShowChapters;

  const ReaderBottomMenu({
    Key? key,
    required this.onFontSizeChange,
    required this.onThemeChange,
    required this.onBackToBookshelf,
    required this.onShowChapters,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 80,
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 10,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: [
          _buildMenuItem(
            icon: Icons.book,
            label: '书架',
            onTap: onBackToBookshelf,
          ),
          _buildMenuItem(
            icon: Icons.list,
            label: '目录',
            onTap: onShowChapters,
          ),
          _buildMenuItem(
            icon: Icons.text_decrease,
            label: '缩小',
            onTap: () => onFontSizeChange('decrease'),
          ),
          _buildMenuItem(
            icon: Icons.text_increase,
            label: '放大',
            onTap: () => onFontSizeChange('increase'),
          ),
          _buildMenuItem(
            icon: Icons.brightness_6,
            label: '主题',
            onTap: onThemeChange,
          ),
        ],
      ),
    );
  }

  Widget _buildMenuItem({
    required IconData icon,
    required String label,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon),
          const SizedBox(height: 4),
          Text(
            label,
            style: TextStyle(
              fontSize: 12,
              color: Colors.grey[600],
            ),
          ),
        ],
      ),
    );
  }
}
