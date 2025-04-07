// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    // env: {
    //     REACT_APP_API_BASE_URL: process.env.API_BASE_URL,
    // },
    minimizeWindow: () => ipcRenderer.send('minimize-window'),
    maximizeWindow: () => ipcRenderer.send('maximize-window'),
    closeWindow: () => ipcRenderer.send('close-window'),
    getAssetImage: (relativePath: string) => ipcRenderer.invoke('get-asset-image', relativePath),
    onFullscreenChange: (callback: (isFullscreen: boolean) => void) => {
        ipcRenderer.on('fullscreen-change', (_, isFullscreen) => {callback(isFullscreen);});
    },
    getFullscreenStatus: () => ipcRenderer.invoke('get-fullscreen'),
    openExternal: (url: string) => ipcRenderer.send('open-external', url)
});
