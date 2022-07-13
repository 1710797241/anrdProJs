/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { RequestConfig,ResponseInterceptor } from '@umijs/max';
import { notification } from 'antd';

import { IsNoExist } from './util';
const isDev = process.env.NODE_ENV === 'development';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新增或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新增或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/** 异常处理程序 */

// @ts-ignore
const errorHandler = (error) => {
  console.log('errorHandler',error);
  
  return Promise.resolve(error);
};
// @ts-ignore
const requestInterceptors = (url: string, options: RequestConfig) => {
  // 自定义携带用户信息
  // if (userInfo && userInfo.token) {
  // options.headers['token'] = userInfo.token;
  // }
  // if(url.indexOf(''))
  // options.headers['authorization'] = token;

  console.log('interceptors request===>url', url, 'options', options);
  return { url, options };
}
// @ts-ignore
const responseInterceptors:ResponseInterceptor = async (response) => {
  const { url } = response;
  console.log('interceptors response===>', 'response', response);
  const IgnoreJSON:string[] = [];
  let data:Object={};
  if (IsNoExist(response.url, IgnoreJSON)) {
    data =  response.data;
    console.log('response', data);
  }
  const token = window.sessionStorage.getItem('token');

  // if (data.code !== -1 && !token) {
  //   //拦截未登录
  //   window.location.href = Apis.Auth;
  // }
  if (
    data &&
    data &&
    data.code !== undefined &&
    data.code !== 1 &&
    data.code !== 2 &&
    data.code !== 2211
  ) {
    //return manual status;
    const errorText = codeMessage[data.code] || '';
    const errorCode = data.code;
    // if (isDev) {
    //   notification.error({
    //     message: `请求错误：${url}`,
    //     description: `错误码：${errorCode || ''}`,
    //     key: 'errorCode',
    //   });
    // }

    throw new Error(data.msg || errorText || 'Error');
  }
  if (data && data.error) {
    //return system status;
    console.log('systemresponse,', data);
    const { url } = response;
    const errorText = codeMessage[data] || '';

    const errorCode = data;

    notification.error({
      message: `请求错误：${url}`,
      description: `错误码：${errorCode || ''}`,
      key: 'errorCode',
    });
    throw new Error(data.error || errorText || 'Error');
  }
  return response;
}

 const request: RequestConfig = {
  timeout: 1000,
  // other axios options you want
  errorConfig: {
    errorHandler,
   
  },
  requestInterceptors: [
    requestInterceptors
   
  ],
  responseInterceptors: [responseInterceptors]
};
export default request