import axios from '@/axios/server';
import store from '@/store';

//首页-文章列表
export function getIndexArticleList () {
  return axios.get(
    '/v1/article/getIndexArticleList', {
      'params': {
        'adUser': store.state.userInfo.adUser,
        'systemCode': store.state.culture.systemCode
      }
    }
  );
}

//首页-获取banner
export function banners () {
  return axios.get(
    '/v1/article/banners', {
      'params': {
        'adUser': store.state.userInfo.adUser,
        'systemCode': store.state.culture.systemCode
      }
    }
  );
}

//政策-列表
export function policyArticleList () {
  return axios.get(
    '/v1/article/getPolicyArticleList', {
      'params': {
        'adUser': store.state.userInfo.adUser,
        'systemCode': store.state.culture.systemCode
      }
    }
  );
}

//文化墙Tab-枚举
export function articleWallTabEnum () {
  return axios.get(
    '/v1/article/getArticleWallTabEnum', {
      'params': {
        'adUser': store.state.userInfo.adUser,
        'systemCode': store.state.culture.systemCode
      }
    }
  );
}

//文化墙列表
export function articleListByMaterialCategory (type) {
  return axios.get(
    '/v1/article/getArticleListByMaterialCategory', {
      'params': {
        'adUser': store.state.userInfo.adUser,
        'materialCategory': type,
        'systemCode': store.state.culture.systemCode
      }
    }
  );
}

//文章详细信息
export function detail (data) {
  return axios.get(
    '/v1/article/detail/uuid', {
      'params': {
        'adUser': store.state.userInfo.adUser,
        ...data
      }
    }
  );
}

//已读人员列表
export function articleReaderList (id) {
  return axios.get(
    '/v1/article/articleReaderList', {
      'params': {
        'adUser': store.state.userInfo.adUser,
        'uuid': id
      }
    }
  );
}


//置顶操作
export function upTop (id) {
  return axios.get(
    '/v1/article/upTop', {
      'params': {
        'adUser': store.state.userInfo.adUser,
        'id': id
      }
    }
  );
}