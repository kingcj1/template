<template>
  <div class="culture-index">
    <component :is="componentName" @on-read="onLoad" />
    <router-link to="/horizontal?name=全国&type=3">
      横屏展示
    </router-link>
    <!-- 底部筛选 -->
    <tabbarDom :data="clounms" v-show="0" ref="tabbar" @change="changeTabbar" />
    <!-- 已读人数 -->
    <van-popup v-model="read.show" :style="{ height: '65vh' }" round position="bottom" closeable>
      <div class="popup-tit">
        查看已读人数
      </div>
      <van-list v-model="read.loading" :finished="read.finished" finished-text="没有更多了">
        <van-cell :key="`read_list_item_${idx}`" :title="item.name" :value="item.createTime"
                  v-for="(item, idx) in read.list" class="popup-item" />
      </van-list>
    </van-popup>
  </div>
</template>

<script>
import culture from './culture.vue';
import policy from './policy.vue';
import wall from './wall.vue';
import tabbarDom from './components/tabbar.vue';
import { scroll } from '@/mixin/scroll';
import { articleReaderList } from '@/api/culture';
export default {
  'name': 'QYWH',
  'components': {
    tabbarDom,
    culture,
    policy,
    wall
  },
  'mixins': [scroll],
  data () {
    return {
      'tabbarActive': -1,
      'tabbarShow': true,
      'read': {
        'loading': true,
        'finished': false,
        'show': false,
        'list': []
      },
      'clounms': [
        { 'lable': '首页', 'name': '', 'src': 'home' },
        { 'lable': '政策', 'name': '', 'src': 'zc' },
        { 'lable': '文化墙', 'name': '', 'src': 'whq' }
      ]
    };
  },
  'computed': {
    componentName () {
      let dom = '';
      if (this.tabbarActive.lable == '首页') dom = culture;
      else if (this.tabbarActive.lable == '政策') dom = policy;
      else if (this.tabbarActive.lable == '文化墙') dom = wall;
      return dom;
    }
  },
  created () {
    this.init();
  },
  'methods': {
    init () {
      let idx = 0;
      let item = this.clounms[idx];
      this.tabbarActive = { ...item, 'idx': idx };
      this.$nextTick(() => {
        this.$refs.tabbar.setActive(idx);
      });
    },
    changeTabbar (item, idx) {
      this.tabbarActive = { ...item, idx };
    },
    onLoad (item) {
      articleReaderList(item.uuid).then((result) => {
        this.read.show = true;
        this.read.list = result.data;
      }).catch((err) => {
        console.log(err);
        this.read.show = false;
        this.read.list = [];
      }).finally(() => {
        this.read.loading = false;
        this.read.finished = true;
      });
    }
  }
};
</script>

<style lang="less" scoped src='./index.less'>
</style>