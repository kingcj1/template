import { useStore } from '@/store';

if (import.meta.env.MODE === 'production') {
  try {
    window?.SHUIYIN({
      'name': useStore().user.adUser,
      'opacity': '0.15'
    });
  } catch (error) {
    console.log(error);
  }
}
