const { defineConfig } = require('@vue/cli-service');
const autoprefixer = require('autoprefixer');
module.exports = defineConfig({
  'transpileDependencies': true,
  'css': {
    'loaderOptions': {
      'postcss': {
        'postcssOptions': {
          'plugins': [
            autoprefixer()
          ]
        }
      }
    }
  },
  'publicPath': './',
  'productionSourceMap': false,
  'lintOnSave': true,
  'devServer': {
    'proxy': {
      '/WebAPI': {
        'target': '',
        'ws': true, //代理websockets
        'changeOrigin': true, // 是否跨域，虚拟的站点需要更管origin
        'pathRewrite': {
          '^/WebAPI': '/WebAPI' // '^/WebAPI'是一个正则表达式，表示要匹配请求的url中
        }
      }
    }
  }
});