import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';
import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    icon: './public/AIO.ico',
    name: 'AIOne',
    appBundleId: 'com.sumexxx.aione',
    executableName: 'AIOne',
    overwrite: true, 
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      setupIcon: './public/AIO.ico',
      name: 'AIOne',
      title: 'AIOne',
      noMsi: false,
      description: 'AIOne - All-in-one AI Desktop App',
      authors: 'Suman Debnath',
      exe: 'AIOne.exe',
      setupExe: 'AIOneInstaller.exe',
      setupMsi: 'AIOneInstaller.msi',
      iconUrl: 'https://sumexxx.github.io/AIOne/AIO.ico'
    }),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({
      options: {
        description: 'AIOne - All-in-one AI Desktop App',
        homepage: 'https://sumexxx.github.io/AIOne/', 
        license: 'MIT',
        icon: './public/AIO.ico',
      },

    }),
    new MakerDeb({
      options: {
        icon: './public/AIO.ico',
        homepage: 'https://sumexxx.github.io/AIOne/',
        description: 'AIOne - All-in-one AI Desktop App',
        maintainer: 'Suman Debnath <email@example.com>',                                    
        section: 'utils',                         
        depends: ['libgtk-3-0', 'libnotify4'],
      }
    })
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      devContentSecurityPolicy: "connect-src 'self' * 'unsafe-eval'",
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/index.html',
            js: './src/renderer.ts',
            name: 'main_window',
            preload: {
              js: './src/preload.ts',
            },
          },
        ],
      },
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
