/*
 * @Author: kingcj
 * @Date: 2023-01-05 16:17:53
 * @LastEditors: kingcj
 * @LastEditTime: 2023-02-21 09:47:42
 * Copyright (c) 2023 by kingcj, All Rights Reserved. 
 */
import { handleMotamo } from './md';
import { usePiniaStore } from './pinia';
import './cookie';
import './shuiyin';
// 统一导出hooks方法
const hooks = {
  'md': handleMotamo,
  'pinia': usePiniaStore
};
export default hooks;