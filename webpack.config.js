const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/app/index.js')
    // dashboard: path.resolve(__dirname, 'src/app/dashboard.js')
  },
    
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
    publicPath: '/'
  },

  resolve: {
    extensions: [ '.js', '.json', '.scss', '.css' ],
    alias: {
      components: path.resolve(__dirname, 'src/app/components'),
      images: path.resolve(__dirname, 'src/images'),
      styles: path.resolve(__dirname, 'src/styles')
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loaders: [ 'html-loader' ]
      },
      {
        test: /\.scss$/,
        loaders: [ 'style-loader', 'css-loader', 'sass-loader', 'postcss-loader' ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/views/index.html'),
      filename: 'index.html',
      chunks: ['index'],
      inject: true,
      minify: false,
      hash: true
    }),

    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, 'src/views/dashboard.html'),
    //   filename: 'dashboard.html',
    //   chunks: ['dashboard'],
    //   inject: true,
    //   minify: false,
    //   hash: true
    // }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin()
  ],

  devtool: 'eval-cheap-module-source-map'
}
