const path = require("path");
const HWP = require("html-webpack-plugin");
module.exports = {
    mode: "development",
    entry: [
        path.join(__dirname, "/src/index.js"),
        __dirname + "/src/styles/main.scss"
    ],
    output: {
        filename: "main.js",
        path: path.join(__dirname, "/dist")
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    plugins: ['transform-class-properties']
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: 'file-loader', 
                        options: {
                            name: "styles/[name].css"
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader?-url'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    }
}