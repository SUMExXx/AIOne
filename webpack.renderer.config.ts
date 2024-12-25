import type { Configuration } from 'webpack';
import path from 'path';
import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'postcss-loader' }],
});

export const rendererConfig: Configuration = {
  // entry: './src/renderer.ts',
  // target: 'electron-renderer',
  // output: {
  //   path: path.resolve(__dirname, '.webpack/renderer'),
  //   filename: 'renderer.js',
  // },
  module: {
    rules,
  },
  // mode: 'production',
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};
