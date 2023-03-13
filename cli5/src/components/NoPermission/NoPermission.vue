<template>
  <div class="noPermission">
    <img src="@/assets/images/onpower.png" alt="">
    <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  'name': 'NoPermission',
  'props': {
    'message': {
      'type': String,
      'default': '抱歉，您暂无查看权限'
    }
  }
};
</script>

<style scoped lang="less" src="./noPermission.less">

</style>
