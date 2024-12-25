import { webpack, type Configuration } from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin'
import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';
import path from 'path';

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/index.ts',
  // mode: 'production',
  // Put your normal webpack config below here
  // target: "electron-main",
  // output: {
  //   path: path.resolve(__dirname, '.webpack/main'),  // Output to .webpack/main
  //   filename: 'main.js',
  // },
  module: {
    rules,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: 'public' }
      ]
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
  node: {
    __dirname: false,
  },
  watch: false
};