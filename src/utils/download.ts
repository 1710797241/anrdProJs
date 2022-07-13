// 下载
const downloadFile = (url: string, download: string = ''): void => {
  if (!url) return;
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', download);
  a.setAttribute('target', '_blank');
  a.click();
};

export default downloadFile;
