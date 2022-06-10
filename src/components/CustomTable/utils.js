import moment from 'moment';
/**
 *
 * @param {*} val
 * @description null undefined ==>true
 */
export const isEmpty = val => {
  return val == null || val == undefined;
};

export const formatTime = (val, format) => {
  return moment(val).format(format);
};
