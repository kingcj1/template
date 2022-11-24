const state = {
  'systemCode': '' //系统code
};
const mutations = {
  setSystemCode (state, data) {
    state.systemCode = data;
  }
};
const actions = {

};
const getters = {

};

// 不要忘记把state, mutations等暴露出去。
export default {
  state,
  mutations,
  actions,
  getters
};