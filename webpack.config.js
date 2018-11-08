const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: __dirname + '/dist/index.html',
        hot: true,
        port: 9000
    },
    entry: {
        app:"./src/index.tsx",
        // vendor: ["react", "react-dom"]
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js"
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [{ 
            test: /\.tsx?$/,
            use: [{
                loader: 'ts-loader',
                options: { transpileOnly: true }
            }]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    externals: {
        // "react": "React",
        // "react-dom": "ReactDOM",
        // "redux": "Redux"
    }
}