import { useStore } from '@/store';
import config from '@/config';

export const handleMotamo = (params) => {
  let _matomo = {
    'url': config.md.url,
    'setSiteId': config.md.setSiteId,
    'setUserId': useStore().user.adUser,
    ...params
  };
  console.log(_matomo);
  if (import.meta.env.MODE === 'production') {
    window.MATOMO(_matomo);
  }
};
