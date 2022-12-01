const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: [
    __dirname + "/src/index.js",
    __dirname + '/src/scss/app.scss'
  ],
  output: {
    filename: "js/index.js",
    path: path.resolve(__dirname, "public"),
  },
  plugins: [
    new MiniCssExtractPlugin()
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
          {
            loader: 'file-loader',
            options: { outputPath: 'css/', name: '[name].min.css'}
          },
          'sass-loader'
        ]
        //use: ['style-loader', 'css-loader', 'sass-loader']
        //use: [MiniCssExtractPlugin.loader,'css-loader']
      },
      {
        test: /\.(woff|woff2|ttf|eot|png|jpg|svg|gif)$/i,
        use: ['file-loader']
      },
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  }
};
