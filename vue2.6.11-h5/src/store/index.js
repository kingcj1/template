import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import userInfo from './userInfo.js';
import system from './system.js';
import culture from './culture.js';
Vue.use(Vuex);

export default new Vuex.Store({
  //配置将vuex的状态储存到sessionStorage中（默认储存到localStorage中）
  'plugins': [createPersistedState({
    'storage': window.sessionStorage
  })],
  'state': {},
  'mutations': {},
  'actions': {},
  'modules': {
    userInfo,
    system,
    culture
  }
});