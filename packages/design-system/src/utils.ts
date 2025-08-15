/**
 * 设计系统工具函数
 */
import { Platform } from 'react-native';

/**
 * 判断当前平台
 */
export const isWeb = Platform.OS === 'web';
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isNative = isIOS || isAndroid;

/**
 * 根据平台返回不同的样式值
 */
export function platformSpecific<T>(options: {
  web?: T;
  ios?: T;
  android?: T;
  native?: T;
  default: T;
}): T {
  if (isWeb && options.web !== undefined) {
    return options.web;
  }

  if (isIOS && options.ios !== undefined) {
    return options.ios;
  }

  if (isAndroid && options.android !== undefined) {
    return options.android;
  }

  if (isNative && options.native !== undefined) {
    return options.native;
  }

  return options.default;
}

/**
 * 创建响应式尺寸
 */
export function responsiveSize(size: number, factor: number = 1): number {
  // 在实际项目中，这里可以根据屏幕尺寸进行调整
  return size * factor;
}

/**
 * 颜色透明度
 */
export function withOpacity(color: string, opacity: number): string {
  // 简单的颜色透明度处理
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  if (color.startsWith('rgb')) {
    return color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
  }

  return color;
}
