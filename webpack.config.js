const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
 
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  optimization:{
    minimizer:[
      new TerserPlugin({
        terserOptions:{
          format:{
            comments:false,
          },
        },
        extractComments:false,
      }),
    ],
  },
  mode: 'production',
  module: {
    rules: [
      // url loader
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // Ukuran berkas di bawah 8 KB akan di-inlined sebagai data URI
              name: 'images/[name].[ext]', // Menyimpan berkas di direktori 'images' dengan nama asli
            },
          },
        ],
      },
      // style and css loader
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      
      // babel loader 
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            },
          },
        ],
      },
    ],
  },
  plugins:[
    new HTMLWebpackPlugin({
      template: './src/template.html',
      filename: 'index.html'
    }),
  ],
}