const CompressionWebpackPlugin = require('compression-webpack-plugin');
const DynamicAntdLess = require('ele-admin-pro/packages/style/dynamicTheme.js');

module.exports = {
  productionSourceMap: false,
  transpileDependencies: ['ele-admin-pro'],
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
    if (process.env.NODE_ENV !== 'development') {
      // 生产环境进行gzip压缩
      config.plugin('compression-webpack-plugin').use(new CompressionWebpackPlugin({
        test: /\.(js|css|html)$/,
        threshold: 10240
      }));
    }
    // 打包时生成新的HASH值，编译浏览器重新加载页面
    config.output.filename('js/[name].[hash].js').chunkFilename('js/[name].[hash].js').end()
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          // plugins: [new DynamicAntdLess()]
          plugins: [
            new DynamicAntdLess({
                replaces: {
                    'darken(@shadow-color, 5%)': '@shadow-color'
                }
            })
          ]
        }
      }
    }
  }
}
