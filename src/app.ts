import React from 'react';

import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';
// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: 'qiye' };
}

export const layout = ({
  initialState,
}: {
  // 类型自定义，由 `initialState` 插件提供
  initialState: { settings?: LayoutSettings; currentUser?: API.CurrentUser };
}): BasicLayoutProps => {
  return {
    // 常用属性
    title: 'Ant Design',
    layout:'side',
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    navTheme:'dark',
    headerTheme:'dark',
    fixedHeader:false,
    settings:{
      enableDarkTheme:true
    },
    contentStyle:{margin:'16px',backgroundColor:'#ddd',minHeight:'calc(100vh - 32px)'},
    // 默认布局调整
    rightContentRender:false,
    // footerRender: () =>false,
    // menuHeaderRender: undefined,
 
    // 其他属性见：https://procomponents.ant.design/components/layout#prolayout
  };
};