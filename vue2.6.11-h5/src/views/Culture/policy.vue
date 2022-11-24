<template>
  <!-- 政策 -->
  <div class="culture-policy">
    <van-collapse v-model="activeNames">
      <van-collapse-item :key="`collapse_item_${idx}`" :title="item.catalogueName" :name="item.id"
                         :icon="require(`@/assets/images/culture/radio${activeNames.includes(item.id) ? '-active' : ''}.svg`)"
                         v-for="(item, idx) in collapseList">
        <ul class="box">
          <li :key="`collapse_item_${childIdx}`" v-for="(child, childIdx) in item.list"
              @click="handleClickDetails(child)">
            <div class="left-box">
              <img :src="child.mainPicture || require(`@/assets/images/culture/zhece.png`)" class="left-img" alt="">
            </div>
            <div class="right-box">
              <div class="right-box-tit">
                {{ child.headline }}
              </div>
              <div class="right-box-time">
                发布日期：{{ dateFormat(child.releaseTime, 'YYYY年mm月dd日') }}
              </div>
            </div>
          </li>
        </ul>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import { policyArticleList } from '@/api/culture';
export default {
  data () {
    return {
      'activeNames': [],
      'collapseList': []
    };
  },
  created () {
    this.init();
  },
  'methods': {
    init () {
      this.getPolicyArticleList();
    },
    handleClickDetails (item) {
      let obj = {
        'id': item.uuid,
        'visibleGroup': item.visibleGroup
      };
      this.$router.push({ 'name': 'QYWHDetails', 'query': obj });
    },
    getPolicyArticleList () {
      policyArticleList().then((result) => {
        let resultArr = result.data;
        resultArr.sort((a, b) => {
          return a.sort - b.sort;
        });
        this.activeNames = resultArr.map(item => item.id);
        this.collapseList = resultArr;
      }).catch((err) => {
        console.log(err);
        this.collapseList = [];
      });
    }
  }
};
</script>

<style lang="less" scoped src='./policy.less'>
</style>