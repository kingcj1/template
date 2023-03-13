/*
 * @Author: jingzhangjian
 * @Date: 2023-03-13 10:28:08
 * @LastEditors: jingzhangjian
 * @LastEditTime: 2023-03-13 10:49:35
 * Copyright (c) 2023 by ${git_name}, All Rights Reserved. 
 */
import axios from '@/axios/server';
import store from '@/store';

export function userInfo () {
  return axios.get(
    '/v1/account/getUserInfo', {
      'params': {
        'adUser': store.state.userInfo.adUser
      },
      'unLoading': true
    }
  );
}