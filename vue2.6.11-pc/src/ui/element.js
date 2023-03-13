/*
 * @Author: jingzhangjian
 * @Date: 2023-03-13 11:43:12
 * @LastEditors: jingzhangjian
 * @LastEditTime: 2023-03-13 11:51:15
 * Copyright (c) 2023 by ${git_name}, All Rights Reserved. 
 */
import { Button, Loading } from 'element-ui';

export const register = (app)=>{
  app.prototype.$ELEMENT = { 'size': 'small' };
  app.use(Button);
  app.use(Loading.directive);
};