<template>
  <div :id="id" style="width: 100%; height: 100%; transform: translateZ(0)" />
</template>

<script>
export default {
  'props': {
    'id': {
      'type': String,
      'default': 'chart'
    },
    'options': {
      'type': Object,
      'delete': {}
    }
  },
  data () {
    return {
      'myChart': null,
      'baseConfig': {
        'tooltip': { 'trigger': 'axis', 'showContent': false },
        'dataZoom': [
          {
            'realtime': true,
            'type': 'inside',
            'xAxisIndex': 0,
            'show': false,
            'interval': 12
          }
        ],
        'grid': {
          'left': '0',
          'right': '0',
          'bottom': '0',
          'top': '20',
          'containLabel': true
        },
        'yAxis': [
          { 'type': 'value', 'show': false },
          { 'type': 'value', 'show': false }
        ]
      }
    };
  },
  'watch': {
    'options': {
      handler () {
        this.$nextTick(() => {
          this.update();
        });
      },
      'deep': true
    }
  },
  mounted () {
    this.init();
  },
  beforeDestroy () {
    this.destroyEchart();
  },
  'methods': {
    init () {
      this.destroyEchart();
      const _vm = this;
      const _id = document.getElementById(_vm.id);
      _vm.myChart = _vm.$echarts.init(_id, 'shine');
      _vm.myChart.getZr().on('mousemove', function (param) {
        const pointInPixel = [param.offsetX, param.offsetY];
        if (_vm.myChart.containPixel('grid', pointInPixel)) {
          _vm.myChart.dispatchAction({ 'type': 'downplay' });
          let xIndex = _vm.myChart.convertFromPixel(
            { 'seriesIndex': 0 },
            pointInPixel
          )[0];
          _vm.myChart.dispatchAction({ 'type': 'highlight', 'dataIndex': xIndex });
          let obj = { 'idx': xIndex };
          _vm.options.series.map((item, idx) => {
            if (item.data && item.data !== null) {
              obj[item.type + idx] = item.data[xIndex];
            }
          });
          _vm.$emit('on-change', obj);
        }
      });
      this.update();
    },
    update () {
      // console.log('chart----update');
      if (this.options.hasOwnProperty('series')) {
        let options = { ...this.baseConfig, ...this.options };
        let _data = options.series[0].data;
        let interval = options.dataZoom[0].interval || 12;
        if (_data.length < interval) {
          options.dataZoom[0].startValue = 0;
        } else {
          options.dataZoom[0].startValue = _data.length - interval;
        }
        options.dataZoom[0].endValue = _data.length - 1;
        delete options.dataZoom[0].interval;
        this.$nextTick(() => {
          // 清除画布
          this.myChart.clear();
          this.myChart.resize();
          this.myChart.setOption(options);
          this.myChart.dispatchAction({
            'type': 'highlight',
            'dataIndex': _data.length - 1
          });
          window.addEventListener('resize', () => {
            if (this.myChart) {
              this.myChart.clear();
              this.myChart.resize();
              this.myChart.setOption(options, true);
            }
          });
        });
      }
    },
    destroyEchart () {
      if (this.myChart) {
        this.myChart.clear();
        this.myChart.dispose();
        this.myChart = null;
      }
    }
  }
};
</script>

<style>
</style>