import Vconsole from 'vconsole';
/**
 * @description: 埋点
 * @param {*} app
 * @return {*}
 */
export const handleVconsole = app => {
  if (import.meta.env.MODE === 'beta') {
    let log = new Vconsole();
    app.use(log);
  }
};
