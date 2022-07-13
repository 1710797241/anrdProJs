/**
 * 字符串校验
 * 
 * */


/* 合法uri */
export const urlRegex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
export function validateURL(textval:string) {
  return urlRegex.test(textval);
}

/* 小写字母 */
export const lowerCaseRegex = /^[a-z]+$/;
export function validateLowerCase(str:string) {
  return lowerCaseRegex.test(str);
}

/* 大写字母 */
export const upperCaseRegex = /^[A-Z]+$/;
export function validateUpperCase(str:string) {
  return upperCaseRegex.test(str);
}

/* 大小写字母 */
export const alphabetsRegex = /^[A-Za-z]+$/;
export function validateAlphabets(str:string) {
  return alphabetsRegex.test(str);
}

/* 邮箱 */
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export function validateEmail(email:string) {
  return emailRegex.test(email);
}

/* 金额数字 */
export const moneyRegex = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
export function validateMoney(str:string) {
  return moneyRegex.test(str);
}

/* 正整数 */
export const integerRegex = /(^[1-9]\d*$)/;
export function validateInteger(num:string) {
  return integerRegex.test(num);
}

/* 自然数 */
export const naturalNumRegex = /(^[0-9]\d*$)/;
export function validateNaturalNum(num: string) {
  return naturalNumRegex.test(num);
}

/* 固定电话 */
export const telRegex = /^0\d{2,3}-?\d{7,8}$/;
export function validateTel(tel: string) {
  return telRegex.test(tel);
}

/* 手机号 */
export const phoneRegex = /^[1][3,4,5,7,8][0-9]{9}$/;
export function validatePhone(phone: string) {
  return phoneRegex.test(phone);
}
// 去除对象中的 null undefined
type ObjType = {[key:string|number]:any}
export const removeEmptyValues = (obj:ObjType) => {
  if (typeof obj !== "object") return obj;
  let _obj:ObjType = {};
  for (const key of Object.keys(obj))
    if (obj[key] !== undefined && obj[key] !== null) _obj[key] = obj[key];
  return _obj;
};