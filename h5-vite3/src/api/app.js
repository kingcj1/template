import axios from '@/axios/server';
import config from '@/config';

// 是否需要设置 token
export function userInfo() {
  return axios.get('/Base/GetUserInfo', {
    'params': {
      'Rourse': config.api.Rourse
    }
    // 'unLoading': true
  });
}