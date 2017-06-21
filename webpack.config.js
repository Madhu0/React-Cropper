var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './root.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-2'],
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      fileName: "source.js",
    })
  ]
};
