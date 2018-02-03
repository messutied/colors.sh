const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

// Absolute path from relative path
const aPath = relativePath => path.resolve(__dirname, relativePath);

const getHtml = (hash) => {
  const contents = fs.readFileSync(aPath('www/index.html'), 'utf8');
  return contents.replace('{{hash}}', hash);
};

const dist = aPath('dist');
const production = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3002;

const config = {
  entry: ['./src/index.js'],
  output: {
    filename: 'bundle.[hash].js',
    path: dist,
    publicPath: production ? '/' : `http://localhost:${PORT}/`,
  },
  devServer: {
    port: PORT,
    contentBase: dist,
    // host: '0.0.0.0', // allow external connections
    historyApiFallback: true,
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|gif|ttf|otf|jpe?g|svg|eot|woff|woff2)$/i, loader: 'url-loader?limit=10000&publicPath=assets/' },
    ],
    noParse: /node_modules\/json-schema\/lib\/validate\.js/,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new CleanWebpackPlugin([aPath('dist/*')]),
    new AssetsPlugin({
      path: dist,
      filename: 'index.html',
      processOutput: assets => getHtml(assets.main.js),
    }),
    // This plugins optimizes chunks and modules by
    // how much they are used in your app
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
};

if (!production) {
  config.entry = ['react-hot-loader/patch'].concat(config.entry);
  config.plugins = config.plugins.concat([
    // This plugin will cause the relative path of the module to be displayed
    // when HMR is enabled. Suggested for use in development.
    new webpack.NamedModulesPlugin(),
  ]);
} else {
  config.plugins = config.plugins.concat([
    // This plugin prevents Webpack from creating chunks
    // that would be too small to be worth loading separately
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 51200, // ~50kb
    }),

    // This plugin minifies all the Javascript code of the final bundle
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
      },
    }),
    // Generate .gzip version of the bundle
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ]);
}

if (process.env.DEBUG) {
  config.module.rules = config.module.rules.concat([
    { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
  ]);
  config.devtool = 'source-map';
}

module.exports = config;
