const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { mainModule } = require('process');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const cssMinimizer = require("css-minimizer-webpack-plugin");
const terser = require("terser-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        clean: true,
        path: path.resolve(__dirname, './dist'),
        filename: 'main.[contenthash].js',
    },

    module: {
         rules: [
            {
                test: /\.html$/,
                loader: "html-loader",
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/i,
                exclude: /styles.css$/,
                use: ["style-loader", "css-loader"],
              },
              {
                test: /styles.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
              },
              {
                test: /\.(png|jpe?g|gif)$/  ,
                loader: 'file-loader',
              },
              {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              },
        ]
    },
    optimization: {
      minimize: true,
      minimizer: [
        new cssMinimizer(),
        new terser(),
      ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'Mi Webpack App',
            // filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css',
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [
              { from: "src/assets/", to: "assets/" },
            ],
          }),
    ],

}