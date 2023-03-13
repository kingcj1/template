import { useUserStore } from './user';
import { useSystemStore } from './system';

// 统一导出useStore方法
export const useStore = () => {
  return {
    'user': useUserStore(),
    'system': useSystemStore()
  };
};
