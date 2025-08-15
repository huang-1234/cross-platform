/**
 * 认证中间件
 */
import { Request, Response, NextFunction } from 'express';

// 需要认证的路径
const protectedPaths = [
  '/api/users/profile',
  '/api/orders',
  '/api/payments'
];

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // 检查是否为需要认证的路径
  const isProtectedPath = protectedPaths.some(path => req.path.startsWith(path));

  if (!isProtectedPath) {
    return next();
  }

  // 获取认证令牌
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: '未提供认证令牌' });
  }

  // 在实际项目中，这里应该验证令牌
  // 这里只是简单示例，任何非空令牌都视为有效
  if (token === 'invalid_token') {
    return res.status(403).json({ error: '无效的认证令牌' });
  }

  // 添加用户信息到请求
  req.app.locals.user = {
    id: 1,
    username: 'test_user',
    platform: req.app.locals.platform
  };

  next();
};
