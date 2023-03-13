import * as dd from 'dingtalk-jsapi'; // 此方式为整体加载，也可按需进行加载
import { showDialog } from '@nutui/nutui';
import '@nutui/nutui/dist/packages/dialog/style';
export const handleDD = () => {
  /**
   * @description: 关闭钉钉页面
   * @return {*}
   */
  function ClosePage() {
    if (dd && dd.env.platform !== 'notInDingTalk') {
      dd.device.notification.alert({
        'message': '未查询到您的绩效等级结果！',
        'title': '提示',
        'buttonName': '退出',
        'onSuccess': function() { dd.biz.navigation.close(); },
        'onFail': function(err) { console.log(err); }
      });
    } else {
      showDialog({
        'title': '提示',
        'content': '未查询到您的绩效等级结果！',
        'noCancelBtn': true,
        'okText': '退出',
        'onOk': function() { window.open('about:blank', '_self').close(); }
      });
    }
  }
  return {
    ClosePage
  };
};
