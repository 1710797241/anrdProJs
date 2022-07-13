
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
export function formatParmas(parmas:Record<string,any>) {
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