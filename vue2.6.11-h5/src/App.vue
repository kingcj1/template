<template>
  <div id="app">
    <template v-if="pageShow">
      <keep-alive :include="keepAliveRouters">
        <router-view v-if="$route.meta.keepAlive && isRouterAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive && isRouterAlive" />
    </template>
    <template v-else>
      <img src="@/assets/images/loading.gif" alt="" class="loading">
    </template>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import { corpIdApi, loginAdUser, userApi, userInfo } from '@/api/app.js';
import { getKeyworld } from '@/utils/tools';
export default {
  'components': {},
  provide () {
    return {
      'reload': this.reload
    };
  },
  data () {
    return {
      'isRouterAlive': true,
      'pageShow': false
    };
  },
  'computed': {
    keepAliveRouters () {
      return this.$store.state.system.routers;
    }
  },
  'watch': {
    $route (to, from) {
      if (to.meta.hasOwnProperty('keepAlive') && to.meta.keepAlive) {
        let router = to.name;
        this.$store.commit('setRouterList', router);
      }
    }
  },
  created () {
    this.init();
  },
  'methods': {
    init () {
      let params = getKeyworld(window.location.href);
      console.log(params);
      this.$store.commit('setSystemCode', params.systemCode);
      if (!params.token) {
        this.getCorpId();
      } else {
        if (dd && dd.env.platform !== 'notInDingTalk') { // 判断钉钉环境
          this.$store.commit('setUserInfo', { 'token': params.token });
          this.tokenGetUserInfo(params.token);
        } else {
          this.$dialog.confirm({ 'title': '提示', 'message': '进入方式错误，请在手机钉钉查看该系统！' }).then(() => {
            window.open('about:blank', '_self').close();
          }).catch(() => {
            window.open('about:blank', '_self').close();
          });
        }
      }
    },
    // 获取公司ID
    getCorpId () {
      corpIdApi().then(res => {
        if (process.env.NODE_ENV == 'development') {
          this.getLoginAdUser();
        } else {
          this.loadPage(res.data);
        }
      }).catch(() => {
        setTimeout(() => {
          this.pageShow = true;
        }, 300);
      });
    },
    // 开发环境 
    getLoginAdUser () {
      this.$store.commit('setAdUser', 'san.zhang');
      loginAdUser().then((res) => {
        let userInfo = res.data.login_user_info;
        this.$store.commit('setUserInfo', userInfo);
        if (!userInfo.permission) {
          this.$router.replace('/401');
        }
      }).finally(() => {
        setTimeout(() => {
          this.pageShow = true;
        }, 300);
      });
    },
    // 钉钉环境 build版本
    loadPage (corpId) {
      const that = this;
      if (dd && dd.env.platform !== 'notInDingTalk') { // 判断钉钉环境
        dd.runtime.permission.requestAuthCode({
          'corpId': corpId, // 公司id
          'onSuccess': function (res) {
            that.getUserInfo(res.code);
          },
          'onFail': function () {
            dd.device.notification.alert({
              'message': '获取code失败，请退出重试！',
              'title': '提示',
              'buttonName': '退出',
              'onSuccess': function () {
                dd.biz.navigation.close();
              }
            });
          }
        });
      } else {
        this.$dialog.confirm({ 'title': '提示', 'message': '进入方式错误，请在手机钉钉查看该系统！' }).then(() => {
          window.open('about:blank', '_self').close();
        }).catch(() => {
          window.open('about:blank', '_self').close();
        });
      }
    },
    // 获取用户信息
    tokenGetUserInfo () {
      userInfo().then((result) => {
        this.$store.commit('setAdUser', result.data.adUser);
        this.$store.commit('setUserInfo', { ...result.data, 'token': params.token });
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setTimeout(() => {
          this.pageShow = true;
        }, 300);
      });
    },
    getUserInfo (code) {
      // 用户信息
      userApi(code).then((result) => {
        let userInfo = result.data.data.login_user_info;
        this.$store.commit('setAdUser', userInfo.adUser);
        this.$store.commit('setUserInfo', userInfo);
        if (!userInfo.permission) {
          this.$router.replace('/401');
        }
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        setTimeout(() => {
          this.pageShow = true;
        }, 300);
      });
    },
    reload () {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style lang='less'>
#app {
  height: 100vh;
  width: 100vw;
  position: relative;

  .loading {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    height: 300px;
    object-fit: contain;
  }
}
</style>
