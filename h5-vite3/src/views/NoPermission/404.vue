<template>
  <div class="noPermission">
    <img src="@/assets/images/onpower.png" alt="">
    <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  'name': 'NoPage',
  'props': {
    'message': {
      'type': String,
      'default': '页面丢失'
    }
  }
};
</script>

<style scoped lang="less" src="./index.less">

</style>
