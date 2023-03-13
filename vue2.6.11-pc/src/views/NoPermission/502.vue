<template>
  <div class="noPermission">
    <img :src="require(`@/assets${imgUrl}`)" alt="">
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
    },
    'imgUrl': {
      'type': String,
      'default': '/images/systemUpgrade.svg'
    }
  }
};
</script>

<style scoped lang="less" src="./noPermission.less">
</style>
