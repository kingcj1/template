<template>
  <!-- 文化墙 -->
  <div class="culture-wall">
    <van-tabs v-model="tabsActive" color="rgba(0, 122, 255, 1)" title-active-color="rgba(0, 122, 255, 1)"
              title-inactive-color="rgba(153, 153, 153, 1)" line-width="22%" @change="handlerChaneTabs">
      <van-tab :key="`tabs_list${index}`" :title="item.label" :name="item.value" v-for="(item, index) in tabsList" />
    </van-tabs>
    <van-list v-model="loading" :finished="finished" ref="scroll" class="content" finished-text="没有更多了"
              @load="getArticleListByMaterialCategory">
      <van-cell :key="`wall_item_${idx}`" :class="{ 'box': true, 'last-box': dataList.length - 1 == idx }"
                v-for="(item, idx) in dataList">
        <p class="box-tit">
          {{ item.headline }} <span v-if="item.isTop" class="is-top">置顶</span>
        </p>
        <p class="box-desc">
          {{ item.digest }}
        </p>
        <img :src="item.mainPicture" class="box-img" alt="">
        <div class="box-footer">
          <p class="time">
            发布日期：{{ dateFormat(item.releaseTime, 'YYYY年mm月dd日') }}
          </p>
          <p class="read">
            <span @click="handleClickRead(item)">查看已读人数 ({{ item.readerCnt }})</span>
          </p>
          <van-icon :name="require(`@/assets/images/icons/top.svg`)" v-if="0" class="top"
                    @click="handleClickTop(item)" />
          <van-icon :name="require(`@/assets/images/icons/share.svg`)" v-if="0" class="share"
                    @click="handleClickShare(item)" />
        </div>
        <van-divider />
        <p class="box-btn" @click="handleClickDetails(item)">
          <van-icon :name="require(`@/assets/images/culture/success.svg`)" v-if="0" class="top" />点击查看全文
        </p>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import * as dd from 'dingtalk-jsapi';
import { articleWallTabEnum, articleListByMaterialCategory, upTop } from '@/api/culture';
import { scroll } from '@/mixin/scroll';
export default {
  'mixins': [scroll],
  data () {
    return {
      'tabsActive': -1,
      'loading': false,
      'finished': false,
      'tabsList': [],
      'dataList': [],
      'scorllTop': 0,
      'timeId': null
    };
  },
  activated () {
    setTimeout(() => {
      this.$refs.scroll.$el.scrollTo(0, this.scorllTop);
    }, 16.7);
  },
  mounted () {
    let that = this;
    this.$refs.scroll.$el.addEventListener('scroll', function (e) {
      if (!that.timeId) {
        clearTimeout(that.timeId);
        that.timeId = setTimeout(function () {
          that.scorllTop = e.target.scrollTop;
          that.timeId = null;
        }, 300);
      }
    });
  },
  created () {
    this.getArticleWallTabEnum();
  },
  'methods': {
    getArticleWallTabEnum () {
      articleWallTabEnum().then((result) => {
        this.tabsList = result.data;
        this.tabsActive = result.data[0].value;
        this.getArticleListByMaterialCategory();
      }).catch((err) => {
        console.log(err);
        this.tabsList = [];
      });
    },
    getArticleListByMaterialCategory () {
      if (this.tabsActive == -1) return;
      this.loading = true;
      articleListByMaterialCategory(this.tabsActive).then((result) => {
        this.dataList = result.data;
        this.finished = true;
      }).catch((err) => {
        console.log(err);
        this.dataList = [];
      }).finally(() => {
        this.loading = false;
      });
    },
    handlerChaneTabs (name, title) {
      this.finished = false;
      this.dataList = [];
      this.getArticleListByMaterialCategory();
    },
    // 置顶
    handleClickTop (item) {
      upTop(item.id).then((result) => {
        console.log(result);
        this.$toast({
          'type': 'success',
          'message': '置顶成功'
        });
      }).catch((err) => {
        console.log(err);
        this.$toast({
          'type': 'fail',
          'message': '置顶失败'
        });
      });
    },
    // 分享
    handleClickShare (item) {
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
          'image': item.mainPicture,
          'onSuccess': function () {
            console.log('onSuccess');
          },
          'onFail': function (err) {
            console.log('onFail');
          }
        });
      } else {
        window.open(`${url}${item.id}`);
      }
    },
    handleClickDetails (item) {
      let obj = {
        'id': item.uuid,
        'visibleGroup': item.visibleGroup
      };
      this.$router.push({ 'name': 'QYWHDetails', 'query': obj });
    },
    handleClickRead (item) {
      this.$emit('on-read', item);
    }
  }
};
</script>

<style lang="less" scoped src='./wall.less'>
</style>