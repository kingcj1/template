<template>
  <transition name="tabbar">
    <van-tabbar v-model="itemActive" safe-area-inset-bottom class="tabbar">
      <van-tabbar-item :key="`${_uid}_${index}`" v-for="(item, index) in data" @click="handleClick(item, index)">
        <span>{{ item.lable }}</span>
        <template slot="icon" slot-scope="props">
          <img :src="require(`@/assets/images/culture/${item.src}${props.active ? '-active' : ''}.svg`)">
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </transition>
</template>

<script>
export default {
  'props': {
    'data': {
      'type': Array,
      'default': () => ([])
    },
    'show': {
      'type': Boolean,
      'default': true
    }
  },
  data () {
    return {
      'itemActive': -1,
      'lastActive': null
    };
  },
  'computed': {

  },
  'methods': {
    handleClick (item, idx) {
      this.itemActive = idx;
      this.$emit('change', item, idx);
    },
    setActive (idx) {
      this.itemActive = idx;
    }
  }
};
</script>

<style lang="less" scoped>
.tabbar-enter-active,
.tabbar-leave-active {
  transition: all 1s;
}

.tabbar-enter,
.tabbar-leave-to {
  bottom: -100%;
}

.tabbar-enter-to,
.tabbar-leave {
  bottom: 0;
}
</style>