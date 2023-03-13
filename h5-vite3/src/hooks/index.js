import { handleMotamo } from './md';
import { usePiniaStore } from './pinia';
import { handleVconsole } from './vconsole';
import { handleDD } from './dd';
import '@/assets/js/flexible';
import './shuiyin';
// 统一导出hooks方法
const hooks = {
  'md': handleMotamo,
  'pinia': usePiniaStore,
  'vconsole': handleVconsole,
  'dd': handleDD
};
export default hooks;
