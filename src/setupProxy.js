const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://ec2-13-126-233-244.ap-south-1.compute.amazonaws.com:8080',
      changeOrigin: true,
    })
  );
};
