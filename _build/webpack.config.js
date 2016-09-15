var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var dirs = {
  theme:'../',
  assets:'assets/',
  css:'css/',
  js:'js/',
  scss:'./scss/'
};

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry:  ["bootstrap-loader", "./js/main.js"],
  output: {
    path: dirs.theme + dirs.assets + "/js",
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /.js$/,
      loader: "babel-loader",
      exclude: /node_modules/,
      query:{
        presets: ['es2015']
      }
    },{
      test: /\.s?css$/,
      loaders: ["style", "css", "sass"],
      exclude: /node_modules/,
      includes: __dirname
    },{
      test: /\.(woff|woff2|eot|ttf|svg)$/,
      loader: 'url'
    },
    { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports?jQuery=jquery' },
    { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' } 
  ]
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],

};
