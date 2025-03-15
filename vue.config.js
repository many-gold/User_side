module.exports = {
    devServer: {
      proxy: {
        '/static': {
          target: 'http://localhost:3001',  // Your backend IP
          changeOrigin: true,
          pathRewrite: {
            '^/static': '',  // Remove '/static' prefix in the URL
          },
        },
      },
    },
  };
  