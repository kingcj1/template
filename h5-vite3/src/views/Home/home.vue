<template>
  <div class="home-page">
    <nut-action-sheet
      v-model:visible="isVisible"
      :menu-items="menuItems"
      @choose="chooseItem"
    >
    </nut-action-sheet>
  </div>
</template>
<script>
import hooks from '@/hooks';
export default {
  'name': 'home-page',
  setup() {
    const _this = reactive({
      'isVisible': false,
      'menuItems': []
    });
    function chooseItem(itemParams){
      console.log(itemParams);
    }
    hooks.md({ 'pageEvent': { 'trackPageView': '', 'setDocumentTitle': '' } });
    return {
      chooseItem,
      ...toRefs(_this)
    };
  }
};
</script>
<style lang="less">
.home-page {
  padding: 10px 20px;
}
</style>