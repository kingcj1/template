/*
 * @Author: jingzhangjian
 * @Date: 2023-03-13 10:28:08
 * @LastEditors: jingzhangjian
 * @LastEditTime: 2023-03-13 11:36:57
 * Copyright (c) 2023 by ${git_name}, All Rights Reserved. 
 */
module.exports = {
  'presets': [
    '@vue/cli-plugin-babel/preset'
  ],
  'plugins': [
    '@babel/plugin-proposal-optional-chaining',
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      }
    ]
  ]
};
