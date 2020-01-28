const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')


const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCSSAssetsPlugin(),
            new TerserJSPlugin()
        ]
    }

    return config
}

const cssLoaders = addition => {
    const loaders = [MiniCssExtractPlugin.loader, 'css-loader']

    if (addition) {
        loaders.push(addition)
    }

    return loaders
}

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]

    if (isDev) {
        loaders.push('eslint-loader')
    }

    return loaders
}

const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env'
        ]
    }

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
}

const plugins = () => {
    const base = [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            minify: {
                collapseWhitespace: isProd,
                removeComments: isProd,
                removeRedundantAttributes: isProd,
                removeScriptTypeAttributes: isProd,
                removeStyleLinkTypeAttributes: isProd,
                useShortDoctype: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'src/icons/favicon.ico'),
            to: path.resolve(__dirname, 'dist')
        }]),
        new ScriptExtHtmlWebpackPlugin({
            sync: 'important',
            defaultAttribute: 'defer'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        })
    ]

    if (isProd) {
        base.push(new BundleAnalyzerPlugin())
    }

    return base
} 

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: ['@babel/polyfill', './index.js'],
    },

    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },

    optimization: optimization(),

    devtool: isDev ? 'source-map' : '',

    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 4200
    },

    plugins: plugins(),

    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
        ]
    }
}