<template>
  <ul class="tabDate">
    <li :key="`tabitem_${index}`" :class="{ 'active': active == index }"
        :style="{ 'color': item.isDisable ? 'rgba(204, 204, 204, 1)' : '#333' }" v-for="(item, index) in data"
        @click="tabfn(item, index)">
      {{ item.lable }}
    </li>
  </ul>
</template>

<script>
export default {
  'props': {
    'data': {
      'type': Array,
      'default': []
    }
  },
  data () {
    return {
      'active': 0
    };
  },
  'methods': {
    tabfn (item, idx) {
      if (item.isDisable) return;
      this.active = idx;
      this.$emit('onchange', item, idx);
    },
    setIdx (newVal) {
      this.active = newVal || 0;
    }
  }
};
</script>

<style scoped lang='less'>
.tabDate {
  width: 100%;
  border-radius: 6px;
  display: flex;
  background-color: #EEEEEE;
  margin: 0px auto 0;
  align-items: center;
  padding: 0 2.5px;
  box-sizing: border-box;

  li {
    text-align: center;
    align-items: center;
    border-radius: 6px;
    color: #333;
    flex: 1;
    font-size: 14px;
    height: 26px;
    line-height: 26px;
  }

  .active {
    background: #ffffff;
    font-weight: 600;
    margin: 2.5px 0px;
  }
}
</style>