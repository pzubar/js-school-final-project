const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/index.js'),
    // output: {
    //     path: path.resolve(__dirname, './src/server/public'),
    //     filename: "bundle.js",
    //     sourceMapFilename: 'bundle.map'
    // },
    devServer: {
        contentBase: '.',
    },
    devtool: '#source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    // options: {
                    //     name: '[name].[ext]',
                    //     outputPath: 'fonts/'
                    // }
                }]
            },            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [{
                    loader: 'file-loader',
                    // options: {
                    //     name: '[name].[ext]',
                    //     outputPath: 'img/'
                    // }
                }]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: 'index.html'
        })
    ],
};

// const path = require('path');
//
// module.exports = {
//     entry: path.resolve(__dirname, './src/index.js'),
//     devServer: {
//         contentBase: '.',
//         compress: true,
//         port: 9000
//     }
// };