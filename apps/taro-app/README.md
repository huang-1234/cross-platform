# 微阅读 - Taro阅读器应用

基于Taro框架开发的类微信读书应用，支持内容阅读、文本划线和评论功能。

## 功能特点

- 📚 书架管理：浏览、添加和管理您的图书
- 📖 阅读体验：流畅的阅读界面，支持进度保存
- 🖍️ 文本划线：支持选择文本并添加不同颜色的高亮
- 💬 评论功能：为划线添加评论和笔记
- 🔄 状态管理：使用zustand进行高效状态管理

## 技术栈

- Taro：多端统一开发框架
- React：UI构建
- Zustand：轻量级状态管理
- SCSS：样式处理

## 项目结构

```
src/
├── assets/         # 静态资源
├── components/     # 组件
│   ├── common/     # 通用组件
│   └── reader/     # 阅读器相关组件
├── pages/          # 页面
│   ├── bookshelf/  # 书架页面
│   ├── index/      # 首页
│   ├── reader/     # 阅读页面
│   └── mine/       # 我的页面
├── services/       # API服务
├── store/          # 状态管理
├── styles/         # 全局样式
└── utils/          # 工具函数
```

## 开发指南

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
# 微信小程序
npm run dev:weapp

# H5
npm run dev:h5

# React Native
npm run dev:rn
```

### 构建

```bash
# 微信小程序
npm run build:weapp

# H5
npm run build:h5

# React Native
npm run build:rn
```

## 核心功能实现

### 阅读器

阅读器组件(`ReaderContent`)是应用的核心，负责渲染书籍内容和处理用户交互。

### 划线功能

划线功能通过监听文本选择事件实现，用户可以选择文本并应用不同颜色的高亮。

### 评论功能

用户可以为高亮的文本添加评论，评论会与高亮一起保存。
