const { override, addWebpackAlias, addWebpackPlugin, adjustStyleLoaders, addBabelPlugin } = require('customize-cra');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Custom Webpack configuration
module.exports = override(
  // Add Webpack alias
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src')
  }),

  // Add custom Webpack plugins
  addWebpackPlugin(new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'public', 'index.html'),
    inject: 'body'
  })),

  // Adjust style loaders for CSS and other style files
  adjustStyleLoaders(({ use: [ , , postcss ] }) => {
    if (postcss) {
      postcss.options = {
        ...postcss.options,
        postcss: {
          ...postcss.options.postcss,
          plugins: [
            require('autoprefixer')(),
            // Other PostCSS plugins
          ]
        }
      }
    }
  }),

  // Add Babel plugins
  addBabelPlugin(['@babel/plugin-proposal-class-properties'])
);
