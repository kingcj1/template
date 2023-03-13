/*
 * @Author: kingcj 
 * @Date: 2022-11-29 16:23:27
 * @LastEditors: kingcj
 * @LastEditTime: 2023-03-07 17:44:43
 * @Description: 
 * Copyright (c) 2022 by kingcj , All Rights Reserved. 
 */
import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';
import NutUIResolver from '@nutui/nutui/dist/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import legacyPlugin from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import eslint from 'vite-plugin-eslint';
import auto2remvw from 'postcss-auto2remvw';
import autoprefixer from 'autoprefixer';
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    'base': './',
    'css': {
      'postcss': {
        'plugins': [
          autoprefixer({ // 自动添加前缀
            'overrideBrowserslist': [
              'Android 4.1',
              'iOS 7.1',
              'Chrome > 31',
              'ff > 31',
              'ie >= 8',
              'last 2 versions' // 所有主流浏览器最近2个版本
            ],
            'grid': true
          }),
          auto2remvw({
            'baseSize': { 'rem': 375, 'vw': 3.75 }
          })
        ]
      },
      'preprocessorOptions': {
        'scss': {
          'additionalData': '@import "@nutui/nutui/dist/styles/variables.scss";'
        },
        'less': {
          'javascriptEnabled': true,
          'additionalData': `@import "${resolve(
            __dirname,
            'src/assets/css/base.less'
          )}";`
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
        'resolvers': [NutUIResolver()]
      }),
      Components({
        'resolvers': [NutUIResolver()]
      }),
      legacyPlugin({
        'targets': ['defaults', 'not IE 11'],
        'additionalLegacyPolyfills': ['regenerator-runtime/runtime']
      }),
      eslint(),
      vueJsx(),
      vue()
    ],
    'resolve': {
      'alias': [{ 'find': '@', 'replacement': resolve(__dirname, './src') }]
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
          'rewrite': path => path
        }
      }
    }
  };
});
