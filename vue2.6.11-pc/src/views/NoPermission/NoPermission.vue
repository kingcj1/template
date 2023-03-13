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
      'default': '抱歉，您暂无查看权限'
    },
    'imgUrl': {
      'type': String,
      'default': '/images/onpower.png'
    }
  }
};
</script>

<style scoped lang="less" src="./noPermission.less"></style>
