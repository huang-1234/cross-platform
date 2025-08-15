/**
 * 设计系统主题
 */

export interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  danger: string;
  warning: string;
  info: string;
  light: string;
  dark: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
}

export interface ThemeSizing {
  baseUnit: number;
  borderRadius: {
    small: number;
    medium: number;
    large: number;
    pill: number;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

export interface ThemeTypography {
  fontFamily: {
    base: string;
    heading: string;
    monospace: string;
  };
  fontSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  fontWeight: {
    light: string;
    regular: string;
    medium: string;
    bold: string;
  };
  lineHeight: {
    tight: number;
    normal: number;
    loose: number;
  };
}

export interface Theme {
  colors: ThemeColors;
  sizing: ThemeSizing;
  typography: ThemeTypography;
  isDark: boolean;
}

// 默认亮色主题
export const lightTheme: Theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
    background: '#ffffff',
    surface: '#f8f9fa',
    text: '#212529',
    textSecondary: '#6c757d',
    border: '#dee2e6',
  },
  sizing: {
    baseUnit: 8,
    borderRadius: {
      small: 4,
      medium: 8,
      large: 16,
      pill: 9999,
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
  },
  typography: {
    fontFamily: {
      base: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      heading: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      monospace: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
    },
    fontWeight: {
      light: '300',
      regular: '400',
      medium: '500',
      bold: '700',
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      loose: 2,
    },
  },
  isDark: false,
};

// 默认暗色主题
export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: '#121212',
    surface: '#1e1e1e',
    text: '#e0e0e0',
    textSecondary: '#a0a0a0',
    border: '#333333',
  },
  isDark: true,
};
