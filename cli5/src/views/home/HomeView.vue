<template>
  <div class="home">
    <el-input :value="query.userid" placeholder="Please input your userid" />
    <PowerBIReportEmbed :embedConfig=config.embedConfig :cssClassName=config.cssClassName
      :phasedEmbedding=config.phasedEmbedding :eventHandlers=config.eventHandlers></PowerBIReportEmbed>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { PowerBIReportEmbed } from 'powerbi-client-vue-js';
export default {
  'components': {
    PowerBIReportEmbed
  },
  setup () {
    const data = reactive({
      'query': {
        'userid': null
      },
      'config': {
        'embedConfig': {
          'type': 'report',
          'id': 'id',
          'embedUrl': '',
          'accessToken': 'Token',
          'tokenType': 1,
          'settings': {
            'panes': {
              'filters': {
                'expanded': false,
                'visible': false
              }
            },
            'background': 1
          }
        }
      }
    });
    data.query.userid = '';
    return {
      ...toRefs(data)
    };
  }
};
</script>
<style lang="less" scoped src="./home.less">

</style>