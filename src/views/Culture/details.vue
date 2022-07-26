<template>
  <div class="page">
    <div class="culture-details">
      <NoPermissionDom :message="errorMsg" v-if="errorShow" />
      <template v-else>
        <div class="title">
          {{ info.headline }}
        </div>
        <div class="times">
          {{ info.releaseTime }}
        </div>
        <div class="digest">
          {{ info.digest }}
        </div>
        <div :class="{ 'content': true, 'm15': noImg }" v-if="htmlText" v-html="htmlText" />
        <iframe :src="filePath" :style="{ height: `calc(100% - ${contentHeight}px)` }" v-if="filePath" id="myDoc"
                frameborder="0" />
        <img :src="imgPath" v-if="imgPath" alt="">
      </template>
    </div>
    <ul v-if="!errorShow" class="fixd-box">
      <li @click="handleClickGoBack">
        <van-icon name="revoke" />
        返回
      </li>
      <li @click="handleClickShare">
        <van-icon :name="require(`@/assets/images/icons/share.svg`)" class="share" />分享
      </li>
    </ul>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import { detail } from '@/api/culture';
import NoPermissionDom from '@/views/NoPermission/NoPermission';
export default {
  'components': {
    NoPermissionDom
  },
  data () {
    return {
      'info': {
        'headline': null,
        'releaseTime': null,
        'digest': null
      },
      'htmlText': null,
      'filePath': null,
      'imgPath': null,
      'contentHeight': 0,
      'errorShow': false,
      'errorMsg': '',
      'noImg': false
    };
  },
  created () {
    this.init();
  },
  'methods': {
    init () {
      let params = {
        'uuid': this.$route.query.id,
        'visibleGroup': this.$route.query.visibleGroup
      };
      detail(params).then((result) => {
        let data = result.data;
        this.info = data;
        if (data.content) {
          this.noImg = new RegExp('[\\u4e00-\\u9fa5]', 'g').test(data.content) ? true : false;
          this.htmlText = data.content;
        } else if (data.filePath) {
          if (data.filePath.search('.pdf') >= 0) {
            this.filePath = data.filePath;
            this.imgPath = null;
          } else {
            this.filePath = null;
            this.imgPath = `${data.filePath}`;
          }
          this.$nextTick(() => {
            let digest = document.getElementsByClassName('digest');
            this.contentHeight = digest[0].offsetTop + digest[0].offsetHeight;
          });
        }
      }).catch((err) => {
        this.errorShow = true;
        this.errorMsg = err.msg || err.message;
      });
    },
    //  返回
    handleClickGoBack () {
      this.$router.go(-1);
    },
    // 分享
    handleClickShare () {
      let item = this.info;
      let url = '';
      if (process.env.NODE_ENV == 'production') {
        url = 'https://np.innoventbio.com:8443/article/index.html?showmenu=false&#/qywh/details?';
      } else {
        url = 'https://nptest.innoventbio.com:8444/article/index.html?showmenu=false#/qywh/details?';
      }
      if (dd && dd.env.platform !== 'notInDingTalk') { // 判断钉钉环境
        dd.biz.util.share({
          'type': 1, //分享类型，0:全部组件 默认；1:只能分享到钉钉；2:不能分享，只有刷新按钮
          'url': `${url}&id=${item.uuid}&visibleGroup=${item.visibleGroup}&systemCode=${this.$store.state.culture.systemCode}`,
          'title': item.headline,
          'content': item.digest,
          'image': item.mainPicture
        });
      } else {
        window.open(`${url}${item.id}`);
      }
    }
  }
};
</script>

<style lang="less" scoped src='./details.less'>
</style>