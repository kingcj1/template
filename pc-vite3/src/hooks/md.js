import { useStore } from '@/store';
import config from '@/config';

/**
 * @description: 埋点
 * @param {*} params
 * @return {*}
 */
export const handleMotamo = (params) => {
  let _matomo = {
    'url': config.md.url,
    'setSiteId': config.md.setSiteId,
    'setUserId': useStore().user.adUser,
    ...params
  };
  console.log(_matomo);
  if (import.meta.env.MODE === 'production') {
    try {
      window?.MATOMO(_matomo);
    } catch (error) {
      console.log(error);
    }
  }
};
