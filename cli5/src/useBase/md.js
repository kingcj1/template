import store from '@/store';
import config from '@/config';

export const handleMotamo = params => {
  let _matomo = {
    'url': config.md.url,
    'setSiteId': config.md.setSiteId,
    'setUserId': store.state.userInfo.adUser,
    ...params
  };
  console.log(_matomo);
  if (process.env.NODE_ENV === 'production') {
    window.MATOMO(_matomo);
  }
};
