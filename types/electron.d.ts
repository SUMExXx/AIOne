export {};

declare global {
    interface Window {
        electronAPI: {
            minimizeWindow: () => void;
            maximizeWindow: () => void;
            closeWindow: () => void;
            getAssetImage: (relativePath: string) => Promise<string | null>;
            onFullscreenChange: (callback: (isFullscreen: boolean) => void) => void;
            getFullscreenStatus: () => Promise<boolean>;
            openExternal: (url: string) => void;
        };
    }
}
