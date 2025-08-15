/**
 * React Native多入口配置
 */
const path = require('path');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    extraNodeModules: {
      '@core-utils': path.resolve(__dirname, '../packages/core-utils'),
      '@api-mock': path.resolve(__dirname, '../packages/api-mock'),
      '@design-system': path.resolve(__dirname, '../packages/design-system'),
    },
  },
  watchFolders: [
    path.resolve(__dirname, '../packages/core-utils'),
    path.resolve(__dirname, '../packages/api-mock'),
    path.resolve(__dirname, '../packages/design-system'),
  ],
};
