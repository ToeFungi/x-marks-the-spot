const path = require('path')

module.exports = {
  entry: './src/server.js',
  mode: 'production',
  resolve: {
    extensions: [
      '.js',
      '.json',
      '*'
    ]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'babel-loader'
      }
    ]
  },
  target: 'node',
  externals: {
    uws: "uws"
  },
  output: {
    filename: 'index.js',
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, './build')
  }
}
