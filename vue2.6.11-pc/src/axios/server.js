import axios from 'axios';
import qs from 'qs';
import store from '@/store';
import router from '@/router/index';
import { Message } from 'element-ui';
const instance = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  'baseURL': '/innovent-article-service',
  'timeout': 60 * 1000 // 超时
});

instance.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
    const TOKEN = store?.state?.userInfo?.userInfo?.token || '';
    if (TOKEN !== null || TOKEN) {
      config.headers.Authorization = 'Bearer ' + TOKEN;
    } else {

    }
    if (config.unLoading == undefined || config.unLoading == false) startLoading();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    const _code = res?.data?.code || 0;
    endLoading();
    if (_code === 200) {
      return res.data;
    } else {
      if (_code == 502) {
        router.replace('/502');
      } else if (_code == 401) {
        router.replace('/401');
      }
      // errorMsg({'message': message});
      return Promise.reject(res.data);
    }
  },
  (error) => {
    let {
      message,
      response
    } = error;
    let _code = response?.status || 0;
    if (_code == 502) {
      router.replace('/502');
    } else if (_code == 401) {
      router.replace('/401');
    }
    endLoading();
    // errorMsg(error);
    return Promise.reject(error);
  }
);

//序列化
instance.QSPost = (url, data, config) => {
  return instance.post(url, qs.stringify(data), config);
};

let count = 0;

function startLoading () {
  // 开始加载
  count++;
  if (count > 0) {
    if (!store.state.system.isLoading) {
      store.commit('setIsLoading', true);
    }
  }
}

function endLoading () {
  // 结束加载
  count--;
  if (count <= 0) {
    count = 0;
    store.commit('setIsLoading', false);
  }
}

function errorMsg (error) {
  let {
    message,
    response
  } = error;
  console.log(`${response.data.path}-----接口${message.substr(message.length - 3)}异常`);
  if (message == 'Network Error') {
    message = '后端接口连接异常';
  } else if (message.includes('timeout')) {
    message = '系统接口请求超时';
  } else if (message.includes('Request failed with status code')) {
    message = '系统接口' + message.substr(message.length - 3) + '异常';
  }
  Message({
    'message': message,
    'type': 'error',
    'duration': 3 * 1000
  });
}

// 创建axios实例
export default instance;