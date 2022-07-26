const version = new Date().getTime();
module.exports = {
  'css': {
    'loaderOptions': {
      'css': {},
      'postcss': {
        'plugins': [
          require('postcss-px2rem')({
            'remUnit': 37.5, //216, //TODO:改横竖版本此处必须改 横版用384  竖版用216
            'unitPrecision': 5, // 最小精度，小数点位数
            'minPixelValue': 2 // 替换的最小像素值
          })
        ]
      }
    }
  },
  'publicPath': './',
  'productionSourceMap': false,
  'lintOnSave': true,
  'devServer': {
    'proxy': {
      '/innovent-article-service': {
        'target': 'http://172.16.2.50:9326/innovent-article-service',
        'ws': true,
        'changeOrigin': true,
        'pathRewrite': {
          '^/innovent-article-service': ''
        }
      }
    }
  },
  'configureWebpack': config => {
    if (process.env.NODE_ENV === 'production') {
      config.output.filename = `js/[name].${version}.js`;
      config.output.chunkFilename = `js/[name].${version}.js`;
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true;
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log'];
    }
  }
};
