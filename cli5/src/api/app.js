import axios from '@/axios/server';
import store from '@/store';

// 是否需要设置 token
export function userInfo () {
  return axios.get('/Base/GetUserInfo', {
    'params': {
      'Rourse': store.state.userInfo.Rourse
    },
    'unLoading': true
  });
}
