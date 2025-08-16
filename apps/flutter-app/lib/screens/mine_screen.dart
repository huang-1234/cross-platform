import 'package:flutter/material.dart';

class MineScreen extends StatelessWidget {
  const MineScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // 用户信息（实际应用中应该从服务器获取或本地存储）
    final user = {
      'avatar': 'https://joeschmoe.io/api/v1/random',
      'nickname': '读书爱好者',
      'readingDays': 30,
      'booksCount': 5
    };

    // 功能列表
    final features = [
      {'id': 'notes', 'title': '我的笔记', 'icon': Icons.note},
      {'id': 'highlights', 'title': '我的划线', 'icon': Icons.highlight},
      {'id': 'favorites', 'title': '我的收藏', 'icon': Icons.star},
      {'id': 'history', 'title': '阅读历史', 'icon': Icons.history},
      {'id': 'settings', 'title': '设置', 'icon': Icons.settings},
      {'id': 'help', 'title': '帮助与反馈', 'icon': Icons.help},
    ];

    return Scaffold(
      appBar: AppBar(
        title: const Text('我的'),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // 用户信息卡片
            Container(
              margin: const EdgeInsets.all(16),
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(8),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.05),
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: Row(
                children: [
                  CircleAvatar(
                    radius: 40,
                    backgroundImage: NetworkImage(user['avatar'] as String),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          user['nickname'] as String,
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Row(
                          children: [
                            _buildStatItem(
                              user['readingDays'].toString(),
                              '阅读天数',
                            ),
                            const SizedBox(width: 16),
                            _buildStatItem(
                              user['booksCount'].toString(),
                              '藏书',
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            // 功能列表
            Container(
              margin: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(8),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.05),
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              child: ListView.separated(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: features.length,
                separatorBuilder: (context, index) => const Divider(height: 1),
                itemBuilder: (context, index) {
                  final feature = features[index];
                  return ListTile(
                    leading: Icon(feature['icon'] as IconData),
                    title: Text(feature['title'] as String),
                    trailing: const Icon(Icons.chevron_right),
                    onTap: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text('点击了${feature['title']}功能'),
                          duration: const Duration(seconds: 1),
                        ),
                      );
                    },
                  );
                },
              ),
            ),

            // 版本信息
            Padding(
              padding: const EdgeInsets.all(16),
              child: Text(
                '微阅读 v1.0.0',
                style: TextStyle(
                  fontSize: 12,
                  color: Colors.grey[600],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatItem(String value, String label) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          value,
          style: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: Colors.blue,
          ),
        ),
        Text(
          label,
          style: TextStyle(
            fontSize: 12,
            color: Colors.grey[600],
          ),
        ),
      ],
    );
  }
}
