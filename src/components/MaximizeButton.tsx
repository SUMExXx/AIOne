import React, { useState } from "react";
import { Subtract16Regular, Square16Regular, Dismiss16Regular, ArrowMinimize16Regular } from '@fluentui/react-icons';

const MaximizeButton: React.FC = () => {

    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

    const handleMaximize = () => {
        window.electronAPI.maximizeWindow();
        setIsFullscreen(!isFullscreen);
    };

    return (
        <button onClick={handleMaximize} className="text-customDarkGrey h-full px-[16px] transition-colors duration-200 hover:bg-[#E5E5E5] flex items-center justify-center">
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