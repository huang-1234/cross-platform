/**
 * 模拟API服务器
 */
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import jsonServer from 'json-server';
import path from 'path';
import { platformMiddleware } from './middleware/platform';
import { authMiddleware } from './middleware/auth';

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(platformMiddleware);
app.use(authMiddleware);

// JSON Server路由
const router = jsonServer.router(path.join(__dirname, '../data/db.json'));
const middlewares = jsonServer.defaults();

// 自定义路由
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 平台特定API
app.post('/api/login', (req, res) => {
  const { platform, params } = req.body;
  const { username, password } = params || {};

  if (!username || !password) {
    return res.status(400).json({ error: '用户名和密码不能为空' });
  }

  // 模拟不同平台的登录逻辑
  switch (platform) {
    case 'electron':
      // Electron特定逻辑
      return res.json({
        token: 'electron_mock_token',
        user: { id: 1, username, platform }
      });

    case 'react-native':
      // React Native特定逻辑
      return res.json({
        token: 'rn_mock_token',
        user: { id: 2, username, platform }
      });

    case 'flutter':
      // Flutter特定逻辑
      return res.json({
        token: 'flutter_mock_token',
        user: { id: 3, username, platform }
      });

    case 'harmony-arkts':
      // 鸿蒙特定逻辑
      return res.json({
        token: 'harmony_mock_token',
        user: { id: 4, username, platform }
      });

    default:
      // 默认逻辑
      return res.json({
        token: 'default_mock_token',
        user: { id: 0, username, platform: platform || 'unknown' }
      });
  }
});

// 使用JSON Server
app.use('/api', middlewares, router);

// 启动服务器
app.listen(PORT, () => {
  console.log(`模拟API服务器运行在 http://localhost:${PORT}`);
});
