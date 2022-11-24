import axios from '@/axios/server';
import store from '@/store';

export function corpIdApi () {
  return axios.get('/v1/auth/getCorpId', {
    'unLoading': true
  });
}

export function loginAdUser () {
  return axios.get(
    '/v1/auth/loginAdUser', {
      'params': {
        'adUser': store.state.userInfo.adUser
      },
      'unLoading': true
    }
  );
}

export function userApi (code) {
  return axios.get(
    `/v1/auth/getUser/${code}`, {
      'params': {
        'adUser': store.state.userInfo.adUser
      },
      'unLoading': true
    }
  );
}

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