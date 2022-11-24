<template>
  <!-- 首页 -->
  <div class="culture-home">
    <van-swipe :autoplay="5000" class="my-swipe" indicator-color="white">
      <van-swipe-item :key="`banner_item${idx}`" v-for="(item, idx) in bannerList">
        <img v-lazy="item.banner" alt="">
      </van-swipe-item>
    </van-swipe>
    <div class="title">
      最近更新<img v-if="showNews" src="@/assets/images/icons/news.svg" alt="" class="title-img">
    </div>
    <van-list v-model="loading" :finished="finished" class="content" finished-text="没有更多了" @load="getIndexArticleList">
      <van-cell :key="`article_item_${idx}`" :class="{ 'box': true, 'last-box': articleList.length - 1 == idx }"
                v-for="(item, idx) in articleList">
        <div :style="setStyle(item, 'leftbgc')" class="left-bgc" />
        <div :style="setStyle(item, 'rightbgc')" class="right-box">
          <p :style="setStyle(item, 'boxtit')" class="right-box-tit" @click="handleClickDetails(item)">
            {{ item.headline }}
          </p>
          <p class="right-box-desc" @click="handleClickDetails(item)">
            {{ item.digest }}
          </p>
          <van-divider />
          <div class="right-box-footer">
            <div class="time">
              发布日期：{{ dateFormat(item.releaseTime, 'YYYY年mm月dd日') }}
            </div>
            <div class="read" @click="handleClickRead(item)">
              查看已读人数 ({{ item.readerCnt }})
            </div>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getIndexArticleList, banners } from '@/api/culture';
export default {
  data () {
    return {
      'showNews': false,
      'articleList': [],
      'bannerList': [],
      'loading': false,
      'finished': false,
      'error': {
        'show': false,
        'msg': ''
      }
    };
  },
  created () {
    this.init();
  },
  'methods': {
    init () {
      this.getBanners();
      this.getIndexArticleList(true);
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
    },
    getIndexArticleList (flag) {
      if (!flag) return;
      getIndexArticleList().then((result) => {
        this.articleList = result.data;
        const TIMESTR = result.data[0]?.releaseTime.replace(/\-/g, '/') || '',
          NEWtIME = new Date().getTime(),
          TARGTTIME = new Date(TIMESTR).getTime(),
          DAY = (NEWtIME - TARGTTIME) / 86400000;
        if (DAY <= 60) this.showNews = true;
        else this.showNews = false;
      }).catch((err) => {
        console.log(err);
        this.articleList = [];
      });
    },
    getBanners () {
      banners().then((result) => {
        this.bannerList = result.data;
        this.finished = true;
      }).catch((err) => {
        console.log(err);
        this.bannerList = [];
      }).finally(() => {
        this.loading = false;
      });
    },
    setStyle (item, type) {
      let styles = {};
      if (type == 'leftbgc') {
        if (item.materialCategory === '3') styles.background = 'linear-gradient(180deg, #595959 0%, #2D2D2D 100%)';
        else if (item.materialCategory === '4' || item.materialCategory === '5') styles.background = 'linear-gradient(180deg, #FF6D5E 0%, #FF3B30 100%)';
        else styles.background = 'linear-gradient(180deg, #00B2FF 0%, #007AFF 100%)';
      } else if (type == 'rightbgc') {
        if (item.materialCategory === '3') styles.background = 'rgba(249, 249, 249, 1)';
        else if (item.materialCategory === '4' || item.materialCategory === '5') styles.background = 'rgba(255, 238, 237, 1)';
        else styles.background = 'rgba(232, 239, 253, 1)';
      } else if (type == 'boxtit') {
        if (item.materialCategory === '3') styles.color = 'rgba(51, 51, 51, 1)';
        else if (item.materialCategory === '4' || item.materialCategory === '5') styles.color = 'rgba(255, 59, 48, 1)';
        else styles.color = 'rgba(0, 122, 255, 1)';
      }
      return styles;
    }
  }
};
</script>

<style lang="less" scoped src='./culture.less'>
</style>