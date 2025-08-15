/**
 * 跨平台卡片组件
 */
import React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Theme, lightTheme } from '../theme';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: boolean;
  theme?: Theme;
  style?: StyleProp<ViewStyle>;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = true,
  theme = lightTheme,
  style,
}) => {
  // 根据变体获取样式
  const getVariantStyle = () => {
    const { colors, sizing } = theme;

    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: colors.background,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: sizing.borderRadius.medium,
        };
      case 'elevated':
        return {
          backgroundColor: colors.background,
          borderRadius: sizing.borderRadius.medium,
          shadowColor: colors.dark,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        };
      case 'default':
      default:
        return {
          backgroundColor: colors.surface,
          borderRadius: sizing.borderRadius.medium,
        };
    }
  };

  // 获取内边距样式
  const getPaddingStyle = () => {
    const { sizing } = theme;

    return padding ? {
      padding: sizing.spacing.md,
    } : {};
  };

  // 合并样式
  const cardStyle = [
    styles.card,
    getVariantStyle(),
    getPaddingStyle(),
    style,
  ];

  return (
    <View style={cardStyle}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    overflow: 'hidden',
  },
});
