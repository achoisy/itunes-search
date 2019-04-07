const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  publicPath: '/itunes-search/',
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin(),
    ],
  },
};
