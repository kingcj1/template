import config from '@/config';

const state = {
  'dataAdUser': '',
  'adUser': '',
  'Rourse': config.api.Rourse,
  'userInfo': {}
};
const mutations = {
  setAdUser (state, data) {
    state.adUser = data;
  },
  setUserInfo (state, data) {
    state.userInfo = data;
  }
};
const actions = {};
const getters = {};

// 不要忘记把state, mutations等暴露出去。
export default {
  state,
  mutations,
  actions,
  getters
};
