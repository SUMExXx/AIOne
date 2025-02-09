import React, { useState, useEffect } from "react";
import { Square16Regular, ArrowMinimize16Regular } from '@fluentui/react-icons';

const MaximizeButton: React.FC = () => {

    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

    const handleMaximize = () => {
        window.electronAPI.maximizeWindow();
        // setIsFullscreen(!isFullscreen);
    };

    const windowStatus = async () => {
        return await window.electronAPI.getFullscreenStatus();
    }

    useEffect(() => {
        windowStatus().then((status) => {
            setIsFullscreen(status);
        });
        window.electronAPI.onFullscreenChange((isFullscreen: boolean) => {
            setIsFullscreen(isFullscreen);
        });
    }, []);

    return (
        <button onClick={handleMaximize} className="text-ui dark:text-ui-dark dark:hover:bg-uiHover-dark h-full px-[16px] transition-colors duration-200 hover:bg-uiHover flex items-center justify-center" style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}>
            {
                isFullscreen ? (
                    <ArrowMinimize16Regular />
                ) : (
                    <Square16Regular />
                )
            }
        </button>
    );
};

export default MaximizeButton;