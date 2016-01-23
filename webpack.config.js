// webpack.config.js

const path = require('path');
const HtmlTemplatePlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATH = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

module.exports = {
  resolve: {
    extensions: ['', '.js', '.react.js']
  },

  entry: PATH.app,

  output: {
    path: PATH.build,
    publicPath: '/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'babel',
          'eslint'
        ],
        include: PATH.app
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', [
          'css',
          'autoprefixer?browsers=last 2 versions',
          'sass'
        ]),
        include: PATH.app
      }
    ]
  },

  devServer: {
    contentBase: PATH.build,
    iframe: true
  },

  plugins: [
    new HtmlTemplatePlugin({
      template: path.join(PATH.app, 'index.template.html'),
      inject: 'body'
    }),

    new ExtractTextPlugin('styles.css')
  ]
};
