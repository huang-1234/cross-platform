/**
 * 平台信息工具
 */

export type PlatformType =
  | 'electron'
  | 'android'
  | 'ios'
  | 'react-native'
  | 'wechat-miniapp'
  | 'taro'
  | 'flutter'
  | 'harmony-arkts'
  | 'web'
  | 'unknown';

export interface PlatformInfo {
  name: PlatformType;
  version: string;
  isNative: boolean;
  isMobile: boolean;
  isDesktop: boolean;
  isWeb: boolean;
}

/**
 * 获取当前平台信息
 */
export const getPlatformInfo = (): PlatformInfo => {
  // 默认平台信息
  const defaultInfo: PlatformInfo = {
    name: 'unknown',
    version: '0.0.0',
    isNative: false,
    isMobile: false,
    isDesktop: false,
    isWeb: false
  };

  // 在实际项目中，这里需要根据不同平台的特征进行检测
  // 这里只是一个示例实现

  // 浏览器环境
  if (typeof window !== 'undefined') {
    // 检测Electron
    if (window.navigator.userAgent.includes('Electron')) {
      return {
        name: 'electron',
        version: process.versions.electron || '0.0.0',
        isNative: false,
        isMobile: false,
        isDesktop: true,
        isWeb: false
      };
    }

    // 检测React Native
    if (window.navigator.product === 'ReactNative') {
      return {
        name: 'react-native',
        version: '0.0.0', // 需要从RN环境获取
        isNative: true,
        isMobile: true,
        isDesktop: false,
        isWeb: false
      };
    }

    // 检测微信小程序
    if (typeof wx !== 'undefined' && wx.getSystemInfo) {
      return {
        name: 'wechat-miniapp',
        version: '0.0.0', // 需要从wx.getSystemInfoSync获取
        isNative: false,
        isMobile: true,
        isDesktop: false,
        isWeb: false
      };
    }

    // 默认为Web
    return {
      name: 'web',
      version: '0.0.0',
      isNative: false,
      isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      isDesktop: !/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      isWeb: true
    };
  }

  // Node.js环境
  if (typeof process !== 'undefined' && process.versions && process.versions.node) {
    return {
      name: 'electron', // 假设Node.js环境是Electron的主进程
      version: process.versions.node,
      isNative: false,
      isMobile: false,
      isDesktop: true,
      isWeb: false
    };
  }

  return defaultInfo;
};

/**
 * 检查是否为特定平台
 */
export const isPlatform = (platform: PlatformType): boolean => {
  return getPlatformInfo().name === platform;
};
