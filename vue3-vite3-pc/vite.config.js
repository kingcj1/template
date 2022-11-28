import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import legacyPlugin from '@vitejs/plugin-legacy';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import eslint from 'vite-plugin-eslint'; //导入包

export default defineConfig({
  'css': {
    'preprocessorOptions': {
      'less': {
        'javascriptEnabled': true,
        'additionalData': `@import "${resolve(__dirname, 'src/assets/css/base.less')}";`
      }
    }
  },
  'plugins': [
    AutoImport({
      'eslintrc': {// eslint报错解决
        'enabled': true // Default `false`
      },
      'imports': ['vue', 'vue-router'], // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      'resolvers': [ // 自动导入 Element Plus 相关函数
        ElementPlusResolver(),
        IconsResolver({ // 自动导入图标组件
          'prefix': 'Icon'
        })
      ]
    }),
    Components({
      'resolvers': [
        IconsResolver({ // 自动注册图标组件
          'enabledCollections': ['ep'] // <i-ep-circle-check-filled />
        }),
        ElementPlusResolver() // 自动导入 Element Plus 组件
      ]
    }),
    Icons({
      'autoInstall': true
    }),
    legacyPlugin({
      'targets': ['defaults', 'not IE 11'], // 需要兼容的目标列表，可以设置多个
      'additionalLegacyPolyfills': ['regenerator-runtime/runtime'] // 面向IE11时需要此插件
    }),
    // 增加下面的配置项,这样在运行时就能检查eslint规范
    eslint(),
    vue()
  ],
  'resolve': {
    'alias': [
      { 'find': '@', 'replacement': resolve(__dirname, './src') } 
    ]
  },
  'build': {
    'cssCodeSplit': true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
    'sourcemap': false, // 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件
    // target: 'modules', // 设置最终构建的浏览器兼容目标。默认值是一个 Vite 特有的值——'modules'  还可设置为 'es2015' 'es2016'等
    'chunkSizeWarningLimit': 550, // 单位kb  打包后文件大小警告的限制 (文件大于此此值会出现警告)
    'assetsInlineLimit': 4096, // 单位字节（1024等于1kb） 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
    'minify': 'terser', // 'terser' 相对较慢，但大多数情况下构建后的文件体积更小。'esbuild' 最小化混淆更快但构建后的文件相对更大。
    'rollupOptions': { // node_modules 拆包
      'output': {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    },
    'terserOptions': {
      'compress': {
        'drop_console': true, // 生产环境去除console
        'drop_debugger': true // 生产环境去除debugger
      }
    }
  },
  'server': {
    'host': '10.0.25.104',
    'port': 8080, // 设置服务启动端口号
    'open': false, // 设置服务启动时是否自动打开浏览器
    'cors': true, // 允许跨域
    'proxy': {
      '/WebAPI': {
        'target': 'https://ehr_test.innoventbio.com:8001',
        'changeOrigin': true,
        'secure': false,
        'rewrite': (path) => path
      }
    }
  }
});