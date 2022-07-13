import CryptoJS from 'crypto-js';

/**
 * @description md5 加密
 */

export function md5(value: string) {
  return CryptoJS.MD5(value).toString();
}
