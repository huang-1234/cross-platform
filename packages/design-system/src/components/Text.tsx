/**
 * 跨平台文本组件
 */
import React from 'react';
import {
  Text as RNText,
  StyleSheet,
  TextProps as RNTextProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import { Theme, lightTheme } from '../theme';

export interface TextProps extends RNTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'button';
  weight?: 'light' | 'regular' | 'medium' | 'bold';
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  theme?: Theme;
  style?: StyleProp<TextStyle>;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body1',
  weight,
  color,
  align,
  theme = lightTheme,
  style,
  ...rest
}) => {
  // 根据变体获取样式
  const getVariantStyle = () => {
    const { typography } = theme;

    switch (variant) {
      case 'h1':
        return {
          fontSize: typography.fontSize.xxl * 1.5,
          fontWeight: typography.fontWeight.bold,
          lineHeight: typography.lineHeight.tight,
        };
      case 'h2':
        return {
          fontSize: typography.fontSize.xxl,
          fontWeight: typography.fontWeight.bold,
          lineHeight: typography.lineHeight.tight,
        };
      case 'h3':
        return {
          fontSize: typography.fontSize.xl,
          fontWeight: typography.fontWeight.bold,
          lineHeight: typography.lineHeight.tight,
        };
      case 'h4':
        return {
          fontSize: typography.fontSize.lg,
          fontWeight: typography.fontWeight.medium,
          lineHeight: typography.lineHeight.tight,
        };
      case 'h5':
        return {
          fontSize: typography.fontSize.md,
          fontWeight: typography.fontWeight.medium,
          lineHeight: typography.lineHeight.tight,
        };
      case 'h6':
        return {
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
          lineHeight: typography.lineHeight.tight,
        };
      case 'body2':
        return {
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.regular,
          lineHeight: typography.lineHeight.normal,
        };
      case 'caption':
        return {
          fontSize: typography.fontSize.xs,
          fontWeight: typography.fontWeight.regular,
          lineHeight: typography.lineHeight.normal,
        };
      case 'button':
        return {
          fontSize: typography.fontSize.md,
          fontWeight: typography.fontWeight.medium,
          lineHeight: typography.lineHeight.tight,
        };
      case 'body1':
      default:
        return {
          fontSize: typography.fontSize.md,
          fontWeight: typography.fontWeight.regular,
          lineHeight: typography.lineHeight.normal,
        };
    }
  };

  // 获取字重样式
  const getWeightStyle = () => {
    if (!weight) return {};

    const { typography } = theme;
    return { fontWeight: typography.fontWeight[weight] };
  };

  // 获取颜色样式
  const getColorStyle = () => {
    const { colors } = theme;
    return { color: color || colors.text };
  };

  // 获取对齐样式
  const getAlignStyle = () => {
    if (!align) return {};
    return { textAlign: align };
  };

  // 合并样式
  const textStyle = [
    styles.text,
    { fontFamily: theme.typography.fontFamily.base },
    getVariantStyle(),
    getWeightStyle(),
    getColorStyle(),
    getAlignStyle(),
    style,
  ];

  return (
    <RNText style={textStyle} {...rest}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {},
});
