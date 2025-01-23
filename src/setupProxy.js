const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    'http://localhost:8000', // The path you want to proxy
    createProxyMiddleware({
      target: 'http://localhost:8000', // Always HTTP
      changeOrigin: true,
    })
  );
};