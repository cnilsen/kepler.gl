// SPDX-License-Identifier: MIT
// Copyright contributors to the kepler.gl project

// avoid destructuring for older Node version support
const resolve = require('path').resolve;
const join = require('path').join;
const webpack = require('webpack');

const CONFIG = {
  entry: {
    app: resolve('./src/main.js'),
  },
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        loader: 'babel-loader',
        include: join(__dirname, 'src'),
        exclude: /node_modules\/(?!@loaders.gl)/, // Include @loaders.gl for Babel processing
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-class-properties'], // Handle class fields
        },
      },
      // Fix for .mjs files (common in modern libraries)
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'], // Ensure Webpack resolves all supported extensions
  },

  node: {
    fs: 'empty',
  },

  plugins: [
    // Optional: Enables reading mapbox and dropbox client token from environment variables
    new webpack.EnvironmentPlugin(['MapboxAccessToken']),
  ],
};

// This line enables bundling against src in this repo rather than installed deck.gl module
module.exports = CONFIG