import path from 'path'
import { Configuration } from 'webpack'
// import { Configuration as WebpackConfiguration } from 'webpack'
// import { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import nodeExternals from 'webpack-node-externals'

// interface Configuration extends WebpackConfiguration {
//   devServer?: DevServerConfiguration
// }

const config: Configuration = {
  target: 'node', // use require() & use NodeJs CommonJS style
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  externalsPresets: {
    node: true, // in order to ignore built-in modules like path, fs, etc.
  },
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'api-server.js',
  },
}

export default config
