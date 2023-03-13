/*
 * @Author: kingcj
 * @Date: 2023-01-05 17:35:44
 * @LastEditors: kingcj
 * @LastEditTime: 2023-01-05 17:41:45
 * Copyright (c) 2023 by kingcj, All Rights Reserved. 
 */
module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/essential'
  ],
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
    'parser': '@babel/eslint-parser'
  },
  'plugins': [
    'vue'
  ],
  'rules': {
    'quotes': [2, 'single'], //引号类型 `` "" ''
    'space-infix-ops': 2, // 确保运算符周围有空格
    'curly': [2, 'multi-line'], // 单行可忽略大括号，多行不可忽略
    'no-dupe-keys': 2, //在创建对象字面量时不允许键重复
    'no-multi-spaces': 2, //不允许出现多余的空格
    'no-extra-semi': 2, //不允许出现不必要的分号
    'no-var': 1, //使用let和const代替var
    'no-plusplus': 0, //允许使用++ --运算符
    'indent': [2, 2], //强制一致的缩进风格
    'keyword-spacing': 2, //关键字前后的空格
    'linebreak-style': [0, 'error', 'windows'], //强制执行统一的行结尾
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, //是否允许debugger
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0, //允许出现console语句
    'no-eval': 1, //不允许使用eval()
    'no-implied-eval': 2, //不允许使用隐式eval()
    'no-new-wrappers': 2, //不允许使用new String，Number和Boolean对象
    'no-self-compare': 2, //不允许自己和自己比较
    'no-sequences': 2, //不允许使用逗号表达式
    'no-shadow-restricted-names': 2, //js关键字和保留字不能作为函数名或者变量名
    'no-use-before-define': [2, 'nofunc'], //不允许在未定义之前就使用变量
    'quote-props': 2, //对象中的属性名是否需要用引号引起来
    'no-eq-null': 1, //禁止对null使用==或!=运算符
    'radix': 1, //使用parseInt时强制使用基数来指定是十进制还是其他进制
    'semi': 2, //强制语句不用分号结尾
    'space-before-function-paren': [2, 'always'], //函数定义时括号前的空格
    'key-spacing': [2, {
      'beforeColon': false,
      'afterColon': true
    }], //对象字面量中冒号的前后空格
    'comma-spacing': 2, //逗号前后的空格
    'object-curly-spacing': [0, 'never'], //大括号内是否允许不必要的空格
    'comma-dangle': [2, 'never'] //对象字面量项尾不能有逗号
  }
};
