import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue';
import legacyPlugin from '@vitejs/plugin-legacy';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import eslint from 'vite-plugin-eslint';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd());
  return {
    'css': {
      'preprocessorOptions': {
        'less': {
          'javascriptEnabled': true,
          'additionalData': `@import "${resolve(__dirname, 'src/assets/css/base.less')}";`
        }
      }
    },
    'plugins': [
      createHtmlPlugin({
        'inject': {
          'data': {
            ...env
          }
        }
      }),
      AutoImport({
        'eslintrc': { 'enabled': true },
        'imports': ['vue', 'vue-router'],
        'resolvers': [
          ElementPlusResolver(),
          IconsResolver({ 'prefix': 'Icon' })
        ]
      }),
      Components({
        'resolvers': [
          IconsResolver({ 'enabledCollections': ['ep'] }), // <i-ep-circle-check-filled />
          ElementPlusResolver()
        ]
      }),
      Icons({ 'autoInstall': true }),
      legacyPlugin({
        'targets': ['defaults', 'not IE 11'],
        'additionalLegacyPolyfills': ['regenerator-runtime/runtime']
      }),
      eslint(),
      vueJsx(),
      vue()
    ],
    'resolve': {
      'alias': [ { 'find': '@', 'replacement': resolve(__dirname, './src') } ]
    },
    'build': {
      'sourcemap': false,
      'chunkSizeWarningLimit': 550,
      'assetsInlineLimit': 4096,
      'minify': 'terser',
      'terserOptions': {
        'compress': {
          'drop_console': mode === 'production' ? true : false,
          'drop_debugger': mode === 'production' ? true : false
        }
      }
    },
    'server': {
      'host': '0.0.0.0',
      'port': 8080, // 设置服务启动端口号
      'open': false, // 设置服务启动时是否自动打开浏览器
      'cors': true, // 允许跨域
      'proxy': {
        '/WebAPI': {
          'target': '',
          'changeOrigin': true,
          'secure': false,
          'rewrite': (path) => path
        }
      }
    }
  };
});