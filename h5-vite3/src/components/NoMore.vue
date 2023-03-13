<template>
  <div class="no-more">{{ description }}</div>
</template>
<script>
export default {
  'props': {
    'description': {
      'type': String,
      'default': '已经到底啦~'
    }
  },
  setup() { }
};
</script>
<style lang="less" scoped>
.no-more {
  text-align: center;
  padding: 10px 0 20px;
}
</style>