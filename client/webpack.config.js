// --- IMPORT --- //
// -------------- //
const HtmlWebpackPlugin = require('html-webpack-plugin');
  // create an HTML file for webpack bundle
const WebpackPwaManifest = require('webpack-pwa-manifest');
  // file references
const path = require('path');
  // node module for directory paths
const { InjectManifest } = require('workbox-webpack-plugin');
  // custom service worker

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

// --- EXPORT --- //
// webpack config //
// --- object --- //
// -------------- //
module.exports = () => {
  return {
    mode: 'development',
    entry: {
      // application entry points
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      // output bundles use entry point names
      // output directory name is 'dist'
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
    // webpack extensions
      new HtmlWebpackPlugin({
      // create HTML file to be included in bundle
        // uses specified template and title
        template: './index.html',
        title: 'J.A.T.E',
      }),
      new InjectManifest({
      // custom service worker
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
      new WebpackPwaManifest({
      // creates PWA Manifest file
        fingerprints: false,
          // ^ disable unique hashing of manifest filename
        inject: true,
          // ^ inject manifest link into created HTML file
          // ^ applies PWA config to HTML
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'Takes notes with JavaScript syntax highlighting!',
          // ^ app info
        background_color: '#225ca3',
        theme_color: '#225ca3',
          // ^ UI colors
        start_url: '/',
          // ^ user entry URL of app
          // ^ root
        publicPath: '/',
          // ^ relative path of assets
          // ^ root
        icons: [
          { // icon specs
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        { // process css files
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        { // process js files
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
                // ^ allows rest and merge of objects
                // ^ prevent duplication of functions in babel using runtime
            },
          },
        },
      ],
    },
  };
};
