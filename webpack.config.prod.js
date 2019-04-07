const webpack = require('webpack');
const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Copy assets to /dist
const HtmlWebpackTemplate = require('html-webpack-template');
const common = require('./webpack.config.common.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
    overlay: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{ from: './src/assets/images', to: 'assets/images' }]),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      inject: false,
      chunks: ['app'],
      template: HtmlWebpackTemplate,
      appMountId: 'content',
    }),
    new ExtractTextPlugin('styles.css'),
    new webpack.NamedModulesPlugin(),
    new Dotenv({
      path: './.env',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    }),
  ],
});
