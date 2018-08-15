/* eslint-env node */
const { resolve } = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const buildDir = 'docs';
const path = resolve(__dirname, buildDir);

module.exports = {
  entry: './src/index.js',
  output: {
    path,
    filename: 'bundle.[hash].js',
    publicPath: ''
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './docs',
  },
  plugins: [
    new CleanPlugin(`${path}/bundle.*.js`),
    new HtmlPlugin({ template: './src/index.html' })
  ],
  module: {
    rules: [
      // js
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                targets: {
                  browsers: 'Chrome 65'
                  // browsers: ['last 2 versions', 'safari >= 7', 'chrome 60']
                },
              }],
              'react'
            ],
            plugins: [
              require('babel-plugin-transform-object-rest-spread'),
              require('babel-plugin-transform-class-properties'),
            ],
            cacheDirectory: true
          }
        }
      },

      // css
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'css-loader',
            options: { 
              sourceMap: true,
              importLoaders: 1 
            }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true }
          }
        ]
      },
      // images
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: { limit: 500 },
        },
      }
    ]
  }
};
