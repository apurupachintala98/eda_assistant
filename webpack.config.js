const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'eda_chatassistant',
    libraryTarget: 'umd',
    assetModuleFilename: 'images/[name][ext]', // Ensures images are saved in the 'images' folder in dist
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'file-loader',
        options: {
           name: '[name].[hash].[ext]',
           outputPath: 'images',
           publicPath: 'images',
        },
     },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
};
