const state = {
  'isLoading': false,
  'routerList': []
};
const mutations = {
  setIsLoading (state, data) {
    state.isLoading = data;
  },
  setRouterList (state, data) {
    let idx = state.routerList.findIndex((e) => e == data);
    if (idx >= 0) {
      state.routerList.splice(idx + 1);
    } else {
      state.routerList.push(data);
    }
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