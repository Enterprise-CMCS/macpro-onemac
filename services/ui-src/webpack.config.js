const ie11BabeLoader = {
    loader: 'babel-loader',
    options: {
        presets: [
            [
                '@babel/preset-env',
                {
                    modules: 'false',
                    targets: {
                        browsers: '> 1%, IE 11, not dead',
                    },
                }
            ]
        ]
    }
};

module.exports = [
    {
        mode: 'development',
        entry: {
            'index': [
                'regenerator-runtime/runtime',
                'whatwg-fetch',
                './src/index.js'
            ],
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'build'),
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [extractCSS ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader']
                },
                {
                    test: /\.less$/,
                    use: [extractCSS ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'less-loader'],
                },
                {
                    test: /\.l3ss$/,
                    use: [
                        ie11BabeLoader,
                        {
                            loader: 'lit-scss-loader',
                            options: {
                                minify: true, // defaults to false
                            },
                        }, 'extract-loader', 'css-loader', 'less-loader'],
                },
                {
                    test: /\.(ttf|eot|woff|woff2|svg)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]',
                        },
                    },
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules\/(?!(lit-html|lit-element))/,
                    use: [ie11BabeLoader]
                }
            ]
        },
        resolve: {
            extensions: ['.js']
        },
        plugins: [
            new MiniCssExtractPlugin(),
            new CopyPlugin([
                { from: 'src/index.html', to: '', toType: 'dir' },
                { from: 'src/foo.json', to: '', toType: 'dir' },
                { from: 'node_modules/css-vars-ponyfill/dist/css-vars-ponyfill.min.js', to: '', toType: 'dir' },
                { from: 'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js', to: '', toType: 'dir' },
                { from: 'node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js', to: '', toType: 'dir' },
                { from: 'node_modules/@webcomponents/webcomponentsjs/bundles', to: 'bundles', toType: 'dir' }
            ]),
            new CopyWebpackPlugin([{ from: '_warmup', to: '_warmup' }])
            ],
        ]
    },
}
