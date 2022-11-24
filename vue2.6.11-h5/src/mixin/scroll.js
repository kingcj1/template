/* 
ref.scroll 定义滚动的元素
默认为当前页面
 */
export const scroll = {
  data () {
    return {
      'scorll': 0
    };
  },
  beforeRouteEnter (to, from, next) {
    next((_vm) => {
      setTimeout(() => {
        let $dom = _vm.$refs.scroll;
        if ($dom) {
          $dom.scrollTo(0, _vm.scorll);
        } else window.scrollTo(0, _vm.scorll);
      }, 16.7);
      console.log('进入前H', _vm.scorll);
    });
  },
  beforeRouteLeave (to, from, next) {
    let $dom = this.$refs.scroll,
      scorll = null;
    if ($dom) {
      scorll = $dom.scrollTop;
    } else scorll = document.documentElement.scrollTop || document.body.scrollTop;
    this.scorll = scorll;
    console.log('离开前H', this.scorll);
    next();
  }
};