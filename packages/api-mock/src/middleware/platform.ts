/**
 * 平台检测中间件
 */
import { Request, Response, NextFunction } from 'express';

export const platformMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // 从请求头获取平台信息
  const platform = req.headers['x-platform'] as string || 'unknown';
  const platformVersion = req.headers['x-platform-version'] as string || '0.0.0';

  // 添加到请求对象，方便后续处理
  req.app.locals.platform = platform;
  req.app.locals.platformVersion = platformVersion;

  // 记录平台访问信息
  console.log(`[${new Date().toISOString()}] 平台访问: ${platform} ${platformVersion}`);

  next();
};
