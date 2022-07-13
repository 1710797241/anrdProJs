export default {
  dev: {
    '/qa/manage': {
      target: 'http://192.168.3.35:8081/',
      changeOrigin: true,
    },
    '/qa/security': {
      target: 'http://192.168.3.35:8083/',
      changeOrigin: true,
      pathRewrite: { '^/qa/security': '' },
    },
  },
  test: {
    '/qa/manage': {
      target: 'http://192.168.3.227:18080/',
      changeOrigin: true,
    },
    '/qa/security': {
      target: 'http://192.168.3.227:18080/',
      changeOrigin: true,
    },
  },
};
