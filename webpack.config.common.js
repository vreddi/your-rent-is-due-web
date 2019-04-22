const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch',
      './src/index.jsx',
    ],
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        })),
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000,
              name: 'images/[hash]-[name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              webp: {
                quality: 60,
                lossless: true,
              },
              svgo: {
                enabled: false,
              },
            },
          },
        ],
      },
    ],
  },

  resolve: {
    alias: {
      root: path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src/components'),
      state: path.resolve(__dirname, 'src/state'),
      mutations: path.resolve(__dirname, 'src/mutations'),
      assets: path.resolve(__dirname, 'src/assets'),
      images: path.resolve(__dirname, 'src/assets/images'),
      utils: path.resolve(__dirname, 'src/utils'),
      queries: path.resolve(__dirname, 'src/queries'),
    },
    extensions: ['.js', '.jsx'],
  },
};
