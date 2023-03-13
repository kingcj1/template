import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  'state': () => ({
    'dataAdUser': '',
    'adUser': '',
    'userInfo': {}
  }),
  'actions': {
    updateDataAdUser(data) {
      this.dataAdUser = data;
    },
    updateAdUser(data) {
      this.adUser = data;
    },
    updateUserInfo(data) {
      this.userInfo = data;
    }
  },
  'persist': {
    'enabled': true,
    'storage': sessionStorage
  }
});
