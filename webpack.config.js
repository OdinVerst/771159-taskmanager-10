const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);
const path = require(`path`);

const OUTPUT_DIR = `public`;

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname, OUTPUT_DIR)
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.resolve(__dirname, OUTPUT_DIR),
    watchContentBase: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: [`es-us`],
    })
  ]
};
