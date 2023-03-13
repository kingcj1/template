<template>
  <div class="noPermission">
    <img src='@/assets/images/systemUpgrade.svg' alt="">
    <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  'name': 'NoPermission',
  'props': {
    'message': {
      'type': String,
      'default': '系统升级中，请耐心等待'
    }
  }
};
</script>

<style scoped lang="less" src="./index.less">

</style>
