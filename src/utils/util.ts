
type StorageType = "local"|"session"
/**
 * 设置 session local storage
 * @param {*} type 
 * @param {*} key 
 * @param {*} value 
 */
const setStorage = function(type:StorageType, key: any, value: any) {
  if (type === 'local') {
    localStorage.setItem(key, value);
  } else if (type === 'session') {
    sessionStorage.setItem(key, value);
  }
};
/**
 * 获取 session local storage
 * @param {*} type 
 * @param {*} key 
 * @returns 
 */
const getStorage = function(type:StorageType, key: any,) {
  if (type === 'local') {
    return localStorage.getItem(key);
  } else if (type === 'session') {
    return sessionStorage.getItem(key);
  }
};
/**
 * 删除 session local storage
 * @param {*} type 
 * @param {*} key 
 * @returns 
 */
const removeStorage = function(type:StorageType, key: any,) {
  if (type === 'local') {
    return localStorage.removeItem(key);
  } else if (type === 'session') {
    return sessionStorage.removeItem(key);
  }
};
/**
 * 清空session local storage
 * @param {*} type 
 * @returns 
 */
const clearStorage = function(type:StorageType,) {
  if (type === 'local') {
    return localStorage.clear();
  } else if (type === 'session') {
    return sessionStorage.clear();
  }
};
/**
 * 批量删除session local storage
 * @param {*} type 
 * @param {*} arr 
 */
const removeItem = function(type:StorageType, arr:any[]) {
  if (type === 'local') {
    arr.map(item => {
      localStorage.removeItem(item);
    });
  } else if (type === 'session') {
    arr.map(item => {
      sessionStorage.removeItem(item);
    });
  }
};



/**
 * 深度拷贝
 * @param target 
 * @returns 
 */
export function deepAssign(target:any) {
  target = toObject(target);

  for (let s = 1; s < arguments.length; s++) {
    assign(target, arguments[s]);
  }

  return target;
}

function isObj(x:any) {
  let type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

let hasOwnProperty = Object.prototype.hasOwnProperty;
let propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val:any) {
  if (val === null || val === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  return Object(val);
}

function assignKey(to:any, from:any, key:any) {
  let val = from[key];

  if (val === undefined || val === null) {
    return;
  }

  if (hasOwnProperty.call(to, key)) {
    if (to[key] === undefined || to[key] === null) {
      throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
    }
  }

  if (!hasOwnProperty.call(to, key) || !isObj(val)) {
    to[key] = val;
  } else {
    to[key] = assign(Object(to[key]), from[key]);
  }
}

function assign(to:any, from:any) {
  if (to === from) {
    return to;
  }

  from = Object(from);

  for (let key in from) {
    if (hasOwnProperty.call(from, key)) {
      assignKey(to, from, key);
    }
  }

  if (Object.getOwnPropertySymbols) {
    let symbols = Object.getOwnPropertySymbols(from);

    for (let i = 0; i < symbols.length; i++) {
      if (propIsEnumerable.call(from, symbols[i])) {
        assignKey(to, from, symbols[i]);
      }
    }
  }

  return to;
}

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

/**
 * 编码数组
 * @param strs 
 * @param fn 
 * @returns 
 */
export function encodeURIStrs(strs:string[], fn = encodeURIComponent) {
  if (Object.prototype.toString.call(strs) === "[object Array]")
    return strs.map((str) => fn(str));
  
}
/**
 * 
 * @param str 编码字符串
 * @param fn 
 * @returns 
 */
export function encodeURIStr(str:string, fn = encodeURIComponent) {
return fn(str)
  
}

/**
 * 格式化 url parmas
 * @param parmas 
 * @returns 
 */
export function formatParmas(parmas:ObjType) {
  if (Object.prototype.toString.call(parmas) !== "[object Object]") return "";
  return Object.keys(parmas)
    .filter((parma) => parmas[parma] !== null && parmas[parma] !== undefined)
    .map((parma) => `${parma}=${parmas[parma]}`)
    .join("&");
}

/**
 * 获取 url 参数
 * @param url 
 * @returns 
 */
export function getUrlParams(url:string) {
  if (!url) return {};
  const reg = /(\w+)=(\w+)/gi;
  const paramsArray = url.match(reg);
  if (!paramsArray) return {};
  const params = paramsArray.reduce((pre, str) => {
    const [key, value] = str.split("=");
    return { ...pre, [key]: decodeURIComponent(value) };
  }, {});
  return params;
}
/**
 * 一维数组转换为二维数组
 * @param num 
 * @param list 
 * @returns 
 */
export function arrTrans(num:number, list:any[]) {
  // 
  let arr2d:any = [];
  let arr:any = [];
  list.forEach((item, index) => {
    arr.push(item);
    if (list.length === index + 1) {
      arr2d.push(arr);
      arr = [];
    }
    if (arr.length === num) {
      arr2d.push(arr);
      arr = [];
    }
  });
  return arr2d;
}


export const IsNoExist = (path:string,arr:any[])=>{
  return true
}