const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const babelConfig = {
  babelrc: false,
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: [
    'babel-plugin-styled-components',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-regenerator',
    [
      '@babel/plugin-transform-runtime',
      {
        helpers: false,
        regenerator: true,
      },
    ],
    '@babel/plugin-transform-react-constant-elements',
  ],
}

module.exports = {
  mode: 'production',
  entry: './src/app/index.tsx',

  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
    new HtmlWebpackPlugin({
      template: './src/app/layout.html',
    }),
  ],

  module: {
    rules: [
      {
        test: /.(ts|tsx)?$/,
        loader: 'babel-loader',
        options: babelConfig,
        include: [path.resolve(__dirname, 'src/app')],
        exclude: [/node_modules/],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },

  optimization: {
    minimizer: [new UglifyJsPlugin()],
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
        },
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true,
    },
  },
  node: false,

  devServer: {
    open: true,
  },

  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
}
