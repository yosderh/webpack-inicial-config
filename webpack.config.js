const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { mainModule } = require('process');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        clean: true,
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
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
         ]
    },
    optimization: {},

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'Mi Webpack App',
            // filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [
              { from: "src/assets/", to: "assets/" },
            ],
          }),
    ],

}