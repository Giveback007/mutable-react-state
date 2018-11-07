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
        rules: [
            { 
                test: /\.tsx?$/, 
                use: [{
                    loader: 'babel-loader',
                    options: {
                        // This is a feature of `babel-loader` for webpack (not Babel itself).
                        // It enables caching results in ./node_modules/.cache/babel-loader/
                        // directory for faster rebuilds.
                        cacheDirectory: true,
                        plugins: ['react-hot-loader/babel']
                    }
                },
                {
                    loader: 'ts-loader',
                    options: { transpileOnly: true }
                }], 
                
            }, {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader", // translates CSS into CommonJS
                    options: { sourceMaps: true }
                }, {
                    loader: "sass-loader", // compiles Sass to CSS
                    options: { sourceMaps: true }
                }]
            }, 
            // png files don't load, need fix
            {
                test: /\.(jpg|png||woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 100000
                    }
                }]
            },
            // Alternatively use file-loader
            // {
            //     test: /\.(jpg|png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            //     use: [{
            //         loader: "file-loader",
            //         options: {
            //             name: "assets/[name].[ext]",
            //         }
            //     }]
            // }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            favicon: 'src/favicon.png'
        }),
        // For HMR, makes it easier to see which dependencies are being patched
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],

    // TODO: Purge css // https://www.purgecss.com/#webpack
    // plugins: [
    //     new ExtractTextPlugin('[name].css?[hash]'),
    //     new PurgecssPlugin({
    //       paths: glob.sync(`${PATHS.src}/*`)
    //     })
    // ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        // "react": "React",
        // "react-dom": "ReactDOM",
        // "redux": "Redux"
    }
}