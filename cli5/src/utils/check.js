/**
 * @description: 手机号校验
 * @param {*} mobile 手机号
 * @return {*}
 */
export const isMobile = mobile => {
  return /^1\d{10}$/.test(mobile);
};
