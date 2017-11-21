const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    rules: [
      // Vue-loader is needed to process .vue files.
      // We then tell it that any js code should be transpiled with babel.    
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader?presets[]=es2015'
          }
        }
      },
      // Any other JS files should be also transpiled      
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] },
        }],
      },
      // Simply copy .json and .png files from src to dist      
      {
        test: /\.(json|png)$/,
        use: 'file-loader?name=[name].[ext]'
      },
      // Compile and copy any css files      
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ title: "New Tab | Zenotes" })
  ]
};

module.exports = config;