/**
 * 跨平台按钮组件
 */
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Theme, lightTheme } from '../theme';
import { platformSpecific } from '../utils';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  theme?: Theme;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  theme = lightTheme,
  style,
  textStyle,
  ...rest
}) => {
  // 根据变体获取样式
  const getVariantStyle = () => {
    const { colors } = theme;

    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: colors.secondary,
          borderColor: colors.secondary,
        };
      case 'success':
        return {
          backgroundColor: colors.success,
          borderColor: colors.success,
        };
      case 'danger':
        return {
          backgroundColor: colors.danger,
          borderColor: colors.danger,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: colors.primary,
          borderWidth: 1,
        };
      case 'primary':
      default:
        return {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        };
    }
  };

  // 根据尺寸获取样式
  const getSizeStyle = () => {
    const { sizing } = theme;

    switch (size) {
      case 'small':
        return {
          paddingVertical: sizing.spacing.xs,
          paddingHorizontal: sizing.spacing.sm,
          borderRadius: sizing.borderRadius.small,
        };
      case 'large':
        return {
          paddingVertical: sizing.spacing.md,
          paddingHorizontal: sizing.spacing.lg,
          borderRadius: sizing.borderRadius.large,
        };
      case 'medium':
      default:
        return {
          paddingVertical: sizing.spacing.sm,
          paddingHorizontal: sizing.spacing.md,
          borderRadius: sizing.borderRadius.medium,
        };
    }
  };

  // 获取文本颜色
  const getTextColor = () => {
    const { colors } = theme;

    if (disabled) {
      return { color: colors.textSecondary };
    }

    if (variant === 'outline') {
      return { color: colors.primary };
    }

    return { color: colors.light };
  };

  // 获取文本尺寸
  const getTextSize = () => {
    const { typography } = theme;

    switch (size) {
      case 'small':
        return { fontSize: typography.fontSize.sm };
      case 'large':
        return { fontSize: typography.fontSize.lg };
      case 'medium':
      default:
        return { fontSize: typography.fontSize.md };
    }
  };

  // 合并样式
  const buttonStyle = [
    styles.button,
    getVariantStyle(),
    getSizeStyle(),
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyleMerged = [
    styles.text,
    getTextColor(),
    getTextSize(),
    textStyle,
  ];

  // 根据平台返回不同的样式
  const platformStyles = platformSpecific({
    web: {
      cursor: disabled ? 'not-allowed' : 'pointer',
      outline: 'none',
    },
    default: {},
  });

  return (
    <TouchableOpacity
      style={[buttonStyle, platformStyles]}
      disabled={disabled}
      activeOpacity={0.8}
      {...rest}
    >
      <Text style={textStyleMerged}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    textAlign: 'center',
    fontWeight: '500',
  },
});
