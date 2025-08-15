/**
 * 跨平台存储工具
 */
import { getPlatformInfo, PlatformType } from './platform';

/**
 * 存储适配器接口
 */
interface StorageAdapter {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}

/**
 * 浏览器localStorage适配器
 */
class WebStorageAdapter implements StorageAdapter {
  async getItem(key: string): Promise<string | null> {
    return localStorage.getItem(key);
  }

  async setItem(key: string, value: string): Promise<void> {
    localStorage.setItem(key, value);
  }

  async removeItem(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  async clear(): Promise<void> {
    localStorage.clear();
  }
}

/**
 * 内存存储适配器（用于不支持持久化存储的环境）
 */
class MemoryStorageAdapter implements StorageAdapter {
  private storage: Map<string, string> = new Map();

  async getItem(key: string): Promise<string | null> {
    return this.storage.get(key) || null;
  }

  async setItem(key: string, value: string): Promise<void> {
    this.storage.set(key, value);
  }

  async removeItem(key: string): Promise<void> {
    this.storage.delete(key);
  }

  async clear(): Promise<void> {
    this.storage.clear();
  }
}

/**
 * 获取当前平台的存储适配器
 */
const getStorageAdapter = (): StorageAdapter => {
  const platform = getPlatformInfo().name;

  // 根据平台返回对应的适配器
  switch (platform) {
    case 'web':
    case 'electron':
      // 浏览器和Electron使用localStorage
      if (typeof window !== 'undefined' && window.localStorage) {
        return new WebStorageAdapter();
      }
      break;

    // 其他平台的适配器需要在具体平台实现
    // 这里只是一个示例框架
  }

  // 默认使用内存存储
  return new MemoryStorageAdapter();
};

// 获取存储适配器实例
const storageAdapter = getStorageAdapter();

/**
 * 存储API
 */
export const storage = {
  /**
   * 获取存储项
   */
  async get<T = any>(key: string): Promise<T | null> {
    const value = await storageAdapter.getItem(key);
    if (value === null) {
      return null;
    }

    try {
      return JSON.parse(value) as T;
    } catch (e) {
      return value as unknown as T;
    }
  },

  /**
   * 设置存储项
   */
  async set<T = any>(key: string, value: T): Promise<void> {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    return storageAdapter.setItem(key, stringValue);
  },

  /**
   * 移除存储项
   */
  async remove(key: string): Promise<void> {
    return storageAdapter.removeItem(key);
  },

  /**
   * 清空存储
   */
  async clear(): Promise<void> {
    return storageAdapter.clear();
  }
};
