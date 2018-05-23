const {
  CheckerPlugin
} = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const isAnalyze = process.env.ANALYZE;
const isDevelopment = process.env.NODE_ENV === 'development';
const htmlTemplatePath = isDevelopment ?
  "src/client/index.dev.ejs" :
  "src/client/index.ejs";


const plugins = [
  new CheckerPlugin(),
  new HtmlWebpackPlugin({
    template: htmlTemplatePath,
    minify: {
      removeComments: true
    },
    inject: true
  }),
  new webpack.DefinePlugin({
    VERSION: JSON.stringify("5fa3b9"),
    API_URL: JSON.stringify("http://localhost:3000"),
  })
];

if (isAnalyze) {
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8889,
      reportFilename: 'report.html',
      defaultSizes: 'parsed',
      openAnalyzer: true,
      generateStatsFile: false,
      statsFilename: 'stats.json',
      statsOptions: null,
      logLevel: 'info'
    })
  );
}

const entryPath = path.join(__dirname, "src/client/index.tsx");
const entry = {};
const output = {
  path: __dirname + "/dist/static",
  publicPath: '/',
  chunkFilename: '[name].[chunkhash:8].chunk.js',
};

if (isDevelopment) {
  entry.app = [
    'webpack-hot-middleware/client?reload=true',
    'react-hot-loader/patch',
    entryPath
  ];

  // dev 环境 chunkhash 报错， 只能用hash
  output.filename = '[name].[hash:8].js';
  plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
  entry.app = entryPath;
  output.filename = '[name].[chunkhash:8].js';
}

module.exports = {
  entry: entry,
  output: output,
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"]
  },

  module: {
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        exclude: [/vendors/, /node_modules/],
        loader: "babel-loader!awesome-typescript-loader?configFileName=tsconfig.client.json"
      },
      {
        test: /\.js?$/,
        exclude: [/node_modules/],
        loader: "babel-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        loader: "babel-loader"
      },
      {
        test: /\.css?$/,
        exclude: [/node_modules/],
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss?$/,
        exclude: [/node_modules/],
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ],
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "react-router": "ReactRouter",
    "react-router-dom": "ReactRouterDOM",
    "lodash": "_",
    "antd": "antd"
  },
  plugins: plugins
};