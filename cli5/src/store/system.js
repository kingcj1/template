const state = {
  'isLoading': false,
  'routerList': [],
  'historyList': []
};
const mutations = {
  setIsLoading (state, data) {
    state.isLoading = data;
  },
  setRouterList (state, data) {
    let idx = state.routerList.findIndex(e => e == data);
    if (idx >= 0) {
      state.routerList.splice(idx + 1);
    } else {
      state.routerList.push(data);
    }
  },
  setSystemCode (state, data) {
    state.systemCode = data;
  },
  setHistoryList (state, data) {
    let idx = state.historyList.findIndex(e => e.id == data.id);
    if (idx >= 0) {
      const count = state.historyList[idx].count;
      state.historyList.splice(idx, 1, { ...data, 'count': count + 1 });
    } else {
      state.historyList.push({ ...data, 'count': 0 });
    }
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
