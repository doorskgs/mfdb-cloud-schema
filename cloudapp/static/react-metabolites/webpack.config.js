const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
//const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    __dirname + "/src/index.js",
    __dirname + '/src/scss/app.scss'
  ],
  output: {
    filename: "js/index.min.js",
    path: path.resolve(__dirname, "public"),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/app.min.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(s(a|c)ss)$/i,
        use: [
         MiniCssExtractPlugin.loader,
          // {
          //   loader: 'style-loader'
          // },
          {
            loader: 'css-loader',
            options: {
              modules: false, // If this is true then I see the issue
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot|png|jpg|svg|gif)$/i,
        use: ['file-loader'],
        type: "asset",
      },
      {
        test: /\.txt$/,
        use: 'raw-loader',
        type: "asset",
      }
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
};
