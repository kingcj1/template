import axios from 'axios';
import config from '@/config';
import { useStore } from '@/store';
import router from '@/router';
import { ElMessage } from 'element-plus';
const instance = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  'baseURL': config.api.baseURL,
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
    const _errcode = `${res?.data?.errcode}` ?? '-1';
    const status = `${res?.status}` ?? '0';
    endLoading();
    if (status === '200') {
      if (_errcode === '0') return res.data;
    } else if (status === '502') {
      router.replace('/502');
    } else if (status === '401') {
      window.location.href = res?.data?.data;
    } else if (status === '403') {
      window.location.href = '/WebForms/error.html?type=403';
    }
    errorMsg({
      'message': res?.data?.errmsg ?? res?.data?.msginfo ?? '请求出错',
      'response': res
    });
    return Promise.reject(res.data);
  },
  (error) => {
    endLoading();
    let { response } = error;
    let _code = `${response?.status}` ?? 0;
    if (_code === '502') {
      router.replace('/502');
    } else if (_code === '401') {
      const src = response.data ?? '';
      let indexOf = src.indexOf('window.location = ');
      let href = src.substring((indexOf + 19), (src.length - 11));
      console.log(href);
      window.location.href = href;
    } else if (_code === '403') {
      window.location.href = '/WebForms/error.html?type=403';
    }
    errorMsg(error);
    return Promise.reject(error);
  }
);

let count = 0;
function startLoading() {
  const store = useStore();
  // 开始加载
  count++;
  if (count > 0) {
    if (!store.system.isLoading) {
      store.system.updateIsLoading(true);
    }
  }
}

function endLoading() {
  // 结束加载
  count--;
  if (count <= 0) {
    count = 0;
    setTimeout(() => {
      useStore().system.updateIsLoading(false);
    }, 1000 * 3);
  }
}

function errorMsg(error) {
  let { message, response } = error;
  if (message == 'Network Error') {
    message = '后端接口连接异常';
  } else if (message.includes('timeout')) {
    message = '系统接口请求超时';
  } else if (message.includes('Request failed with status code')) {
    message = '系统接口' + message?.substr(message?.length - 3) + '异常';
  }
  console.log(`${response?.request?.responseURL}-----${message}`);
  ElMessage({
    'message': message,
    'type': 'error',
    'duration': 3 * 1000
  });
}
// 创建axios实例
export default instance;