import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import userInfo from './userInfo.js';
import system from './system.js';

export default createStore({
  'plugins': [createPersistedState({ 'storage': window.sessionStorage })],
  'state': {
    'prove': 0
  },
  'getters': {},
  'mutations': {
    'state': (state, prove) => {
      state.prove = prove;
    }
  },
  'actions': {},
  'modules': {
    userInfo,
    system
  }
});
