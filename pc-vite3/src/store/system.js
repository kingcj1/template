import { defineStore } from 'pinia';

export const useSystemStore = defineStore('system', {
  'state': () => ({
    'isLoading': false,
    'routerList': []
  }),
  'actions': {
    updateIsLoading(data) {
      this.isLoading = data;
    },
    updateRouterList(data) {
      let idx = this.routerList.findIndex(e => e == data);
      if (idx >= 0) {
        this.routerList.splice(idx + 1);
      } else {
        this.routerList.push(data);
      }
    }
  },
  'persist': {
    'enabled': true,
    'storage': sessionStorage
  }
});
