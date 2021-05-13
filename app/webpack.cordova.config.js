var path = require('path');
var autoprefixer = require('autoprefixer');
var nodeModules = path.resolve(__dirname, './node_modules');
var AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    app: 'cordova.js'
  },
  output: {
    path: path.join(__dirname, 'dist/cordova'),
    filename: '[name].[hash].js',
    publicPath: 'https://fitnation.planningpoker.by/cordova/'
  },
  plugins: [
    new AssetsPlugin({
      path: path.join(__dirname, 'dist/cordova'),
      filename: 'assets.json'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: "style!css!postcss!sass"
      },
      {
        test: /\.(jpe?g|png|gif|svg|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: "url"
      },
      {
        test: /\.html$/,
        loader: 'ngtemplate?relativeTo=' +
          (path.resolve(__dirname, './src')) +
          '/!html'
      }
    ]
  },
  sassLoader: {
    includePaths: [
      nodeModules,
      path.resolve(nodeModules, './bootstrap-sass/assets/stylesheets')
    ]
  },
  postcss: function() {
    return {
      defaults: [autoprefixer],
      cleaner: [autoprefixer({
        browsers: [
          'Android 2.3',
          'Android >= 4',
          'Chrome >= 20',
          'Firefox >= 24', // Firefox 24 is the latest ESR
          'Explorer >= 9',
          'iOS >= 6',
          'Opera >= 12',
          'Safari >= 6'
        ]
      })]
    };
  },
  devtool: 'source-map',
  resolve: {
    root: [
      path.resolve('./src'),
      __dirname,
      path.resolve(nodeModules, './bootstrap-sass/assets/stylesheets')
    ]
  }
};
