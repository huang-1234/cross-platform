/**
 * 统一日志系统
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogOptions {
  platform: string;
  tags?: Record<string, string>;
}

/**
 * 统一日志记录函数
 */
export const log = (
  level: LogLevel,
  message: string,
  options: LogOptions
): void => {
  const { platform, tags = {} } = options;
  const timestamp = new Date().toISOString();
  const formattedMessage = `[${timestamp}] [${level.toUpperCase()}] [${platform}] ${message}`;

  // 开发环境直接输出到控制台
  if (process.env.NODE_ENV === 'development') {
    switch (level) {
      case 'debug':
        console.debug(formattedMessage, tags);
        break;
      case 'info':
        console.info(formattedMessage, tags);
        break;
      case 'warn':
        console.warn(formattedMessage, tags);
        break;
      case 'error':
        console.error(formattedMessage, tags);
        break;
    }
  } else {
    // 生产环境可以集成Sentry或其他日志服务
    // 这里只是示例，实际项目中需要替换为真实的日志服务
    console.log(formattedMessage, tags);

    // Sentry集成示例
    // Sentry.captureMessage(message, {
    //   level,
    //   tags: { platform, ...tags }
    // });
  }
};

// 便捷方法
export const debug = (message: string, options: LogOptions): void => log('debug', message, options);
export const info = (message: string, options: LogOptions): void => log('info', message, options);
export const warn = (message: string, options: LogOptions): void => log('warn', message, options);
export const error = (message: string, options: LogOptions): void => log('error', message, options);
