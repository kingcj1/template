import axios from 'axios';
import qs from 'qs';
import store from '@/store';
import router from '@/router/index';
import config from '@/config';

const responseFn = {
  '200': (res)=>{
    return res.data;
  },
  '502': ()=>{
    router.replace('/502');
  },
  '403': ()=>{
    window.location.href = '/WebForms/error.html?type=403';
  },
  '401': (url)=>{
    window.location.href = url;
  },
  'defult': (res) =>{
    errorMsg({'message': res?.data?.errmsg ?? res?.data?.msginfo ?? '请求出错', 'response': res});
    return Promise.reject(res.data);
  }
};
// 创建axios实例
const instance = axios.create({
  'baseURL': config.api.baseURL, // axios中请求配置有baseURL选项，表示请求URL公共部分
  'timeout': 60 * 1000 // 超时
});

instance.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
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
    const _code = `${res?.data?.errcode}` ?? '0';
    const status = `${res?.status}` ?? '0';
    endLoading();
    if (status === '200') {
      if (_code === '0') return responseFn[status](res);
      else {
        return responseFn['defult'](res);
      }
    } else if (_code == '401') {
      responseFn[_code](res?.data?.data);
    } else {
      try {
        responseFn[status](res);
      } catch (error) {
        return responseFn['defult'](res);
      }
    }
  },
  (error) => {
    endLoading();
    let {response} = error;
    let _code = `${response?.status}` ?? '0';
    if (_code == '401') {
      let indexOf = response.data.indexOf('window.location = ');
      let src = response.data.substring((indexOf + 19), (response.data.length - 11));
      responseFn[_code](src);
    } else {
      try {
        responseFn[_code](response);
      } catch (error) {
        return responseFn['defult'](response);
      }
    }
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
      // Toast.loading('正在加载', {
      //   'duration': 0
      // });
    }
  }
}

function endLoading () {
  // 结束加载
  count--;
  if (count <= 0) {
    count = 0;
    // Toast.hide();
    store.commit('setIsLoading', false);
  }
}

function errorMsg (error) {
  let { message } = error;
  if (message == 'Network Error') {
    message = '后端接口连接异常';
  } else if (message.includes('timeout')) {
    message = '系统接口请求超时';
  } else if (message.includes('Request failed with status code')) {
    message = '系统接口' + message?.substr(message?.length - 3) + '异常';
  }
  console.log(`${error?.config?.url}-----${message}`);
  // Toast.fail(message, {
  //   'duration': 3 * 1000
  // });
}

export default instance;
