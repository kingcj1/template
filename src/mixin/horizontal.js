export const horizontal = {
  beforeRouteEnter (to, from, next) {
    // 进入当前页面，设置页面横屏显示，
    let Xwidth = document.documentElement.clientWidth,
      Xheight = document.documentElement.clientHeight,
      doc = window.document,
      docEl = doc.documentElement,
      equipmentUa = navigator.userAgent.toLowerCase();
    if (equipmentUa.search(/ipad/i) > -1) {
      console.log('ipad');
    } else {
      let page = document.getElementById('app');
      page.style.width = Xheight + 'px';
      page.style.height = Xwidth + 'px';
      page.style.top = '0';
      page.style.left = -((Xheight - Xwidth) / 2) + 'px';
      page.style.right = '0';
      page.style.bottom = '0';
      page.style.margin = 'auto';
      page.style.position = 'absolute';
      page.style.transform = 'rotate(90deg)';

      function refreshRem () {
        let rem = Xwidth * 1.75 / 10;
        docEl.style.fontSize = rem + 'px';
      }
      refreshRem();
    }
    next();
  },
  beforeRouteLeave (to, from, next) {
    // 离开当前页面，恢复竖屏状态
    let Xwidth = document.documentElement.clientWidth,
      doc = window.document,
      docEl = doc.documentElement,
      page = document.getElementById('app');
    page.style.width = '100vw';
    page.style.height = '100vh';
    page.style.top = '0';
    page.style.left = '0px';
    page.style.margin = 'auto';
    page.style.position = 'relative';
    page.style.transform = 'none';

    function refreshRem () {
      let rem = Xwidth / 10;
      docEl.style.fontSize = rem + 'px';
    }
    refreshRem();
    next();
  },
  mounted () {
    window.addEventListener('resize', () => {
      window.location.reload();
    });
  }
};