import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

export const pinia = createPinia();
pinia.use(
  createPersistedState({
    'serializer': {
      // 指定参数序列化器
      'serialize': JSON.stringify,
      'deserialize': JSON.parse
    }
  })
);

/**
 * @description: 注册给app
 * @param {*} app
 * @return {*}
 */
export const usePiniaStore = app => {
  app.use(pinia);
};
