module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
    API_BASE: '"https://api.example.com"'
  },
  mini: {
    optimizeMainPackage: {
      enable: true
    }
  },
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考文档：https://github.com/webpack-contrib/webpack-bundle-analyzer
     */
    webpackChain(chain) {
      if (process.env.ANALYZE) {
        chain.plugin('analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
      }
    }
  }
}
