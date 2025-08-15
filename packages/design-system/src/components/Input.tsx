/**
 * 跨平台输入框组件
 */
import React from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Theme, lightTheme } from '../theme';
import { platformSpecific } from '../utils';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helper?: string;
  variant?: 'outlined' | 'filled' | 'underlined';
  fullWidth?: boolean;
  theme?: Theme;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  helperStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helper,
  variant = 'outlined',
  fullWidth = false,
  disabled = false,
  theme = lightTheme,
  containerStyle,
  labelStyle,
  inputStyle,
  helperStyle,
  errorStyle,
  ...rest
}) => {
  // 根据变体获取样式
  const getVariantStyle = () => {
    const { colors, sizing } = theme;

    switch (variant) {
      case 'filled':
        return {
          backgroundColor: theme.isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
          borderWidth: 0,
          borderRadius: sizing.borderRadius.small,
        };
      case 'underlined':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
          borderBottomWidth: 1,
          borderRadius: 0,
          borderColor: error ? colors.danger : colors.border,
        };
      case 'outlined':
      default:
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderRadius: sizing.borderRadius.small,
          borderColor: error ? colors.danger : colors.border,
        };
    }
  };

  // 合并样式
  const containerStyleMerged = [
    styles.container,
    fullWidth && styles.fullWidth,
    containerStyle,
  ];

  const inputStyleMerged = [
    styles.input,
    getVariantStyle(),
    disabled && styles.disabled,
    { color: theme.colors.text },
    inputStyle,
  ];

  const labelStyleMerged = [
    styles.label,
    { color: error ? theme.colors.danger : theme.colors.textSecondary },
    labelStyle,
  ];

  const helperStyleMerged = [
    styles.helper,
    { color: theme.colors.textSecondary },
    helperStyle,
  ];

  const errorStyleMerged = [
    styles.error,
    { color: theme.colors.danger },
    errorStyle,
  ];

  // 平台特定样式
  const platformInputStyles = platformSpecific({
    web: {
      outlineStyle: 'none',
      cursor: disabled ? 'not-allowed' : 'text',
    },
    default: {},
  });

  return (
    <View style={containerStyleMerged}>
      {label && <Text style={labelStyleMerged}>{label}</Text>}
      <TextInput
        style={[inputStyleMerged, platformInputStyles]}
        placeholderTextColor={theme.colors.textSecondary}
        editable={!disabled}
        {...rest}
      />
      {helper && !error && <Text style={helperStyleMerged}>{helper}</Text>}
      {error && <Text style={errorStyleMerged}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  fullWidth: {
    width: '100%',
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    minHeight: 40,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  disabled: {
    opacity: 0.5,
  },
  helper: {
    marginTop: 4,
    fontSize: 12,
  },
  error: {
    marginTop: 4,
    fontSize: 12,
  },
});
