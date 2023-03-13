<template>
  <nut-image :src="src" :fit="fit" show-error>
    <template #loading>
      <nut-icon name="loading"></nut-icon>
    </template>
  </nut-image>
</template>
<script>
export default {
  'props': {
    'src': {
      'type': String
    },
    'fit': {
      'type': String,
      'default': 'contain'
    }
  }
};
</script>
<style lang="less"></style>