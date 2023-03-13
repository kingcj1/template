import axios from '@/axios/server';
import store from '@/store';

// 获取下一条语录
export function GetImageAll (params = {}) {
  return axios.post(
    '/user/image/all',
    {
      'Rourse': store.state.userInfo.Rourse,
      'LoginName': store.state.userInfo.adUser,
      ...params
    },
    {
      'unLoading': true
    }
  );
}
