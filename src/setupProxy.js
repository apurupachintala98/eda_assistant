const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // The path you want to proxy
    createProxyMiddleware({
      target: 'http://your-api-domain.com', // Always HTTP
      changeOrigin: true,
    })
  );
};