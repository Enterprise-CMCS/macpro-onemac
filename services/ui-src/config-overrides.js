const { override } = require('customize-cra');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = override((config) => {
  // Ensure minification is set up in production
  if (config.optimization) {
    config.optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // Optional: Remove console logs
          },
        },
      }),
    ];
  }

  return config;
});