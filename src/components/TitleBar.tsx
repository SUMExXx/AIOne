import React, { useEffect, useState } from "react";
import { Subtract16Regular, Dismiss16Regular, ArrowDownload16Regular } from '@fluentui/react-icons';
import { ais, mainLogo } from "../utils/ai";
import { useAIContext } from "../context/AIContext";
import MaximizeButton from "./MaximizeButton";
import { env } from "../utils/env";

const TitleBar: React.FC = () => {

    const {ai, setAI} = useAIContext();

    const handleMinimize = () => {
        window.electronAPI.minimizeWindow();
    };

    const handleClose = () => {
        window.electronAPI.closeWindow();
    };

    const handleAIClick = (index: number) => {
        setAI(index);
    };

    const handleRefresh = (index: number) => {
        const webview = document.querySelector(`webview[data-id="${index}"]`) as Electron.WebviewTag;
        if (webview) {
            webview.src = ais[index].url;
            // webview.reload();
        }
    };

    const [updateStatus, setUpdateStatus] = useState<boolean>(false);

    const checkUpdate = () => {
        fetch('https://api.github.com/repos/SUMExXx/AIOne/releases/latest').then((response) => {
            if(response.ok){
                response.json().then((data) => {
                    if(data.tag_name != env.TAG){
                        setUpdateStatus(true);
                    }
                });
            }
        });
    }

    const update = () => {
        
    }

    const [logo, setLogo] = useState<string | null>(null);
    const [refresh, setRefresh] = useState<string | null>(null);
    const [aiLogoData, setAILogoData] = useState<string[]>([]);
    
    const setAILogos = () => {
        ais.forEach((ai, index) => {
            window.electronAPI.getAssetImage(ai.logo).then((logo) => {
                if(logo){
                    setAILogoData((prev) => {
                        const newLogos = [...prev];
                        newLogos.push(logo);
                        return newLogos;
                    })
                }
            });
        });
        window.electronAPI.getAssetImage(mainLogo).then((logo) => {
            if(logo){
                setLogo(logo)
            }
        });
        window.electronAPI.getAssetImage(`/images/refresh.png`).then((logo) => {
            if(logo){
                setRefresh(logo)
            }
        });
    }

    useEffect(() => {
        checkUpdate();
        setAILogos();
    }, []);

    return (
        <div className="w-full h-[40px] min-h-[40px] bg-background dark:bg-background-dark flex justify-center items-center" style={{ WebkitAppRegion: "drag" } as React.CSSProperties}>
            <div className="w-full flex gap-2 p-2 items-center">
                <img src={logo? logo : ''} alt="logo" className="h-6 w-6 min-h-6 min-w-6 max-h-6 max-w-6 p-[2px] bg-white rounded-full object-contain" draggable="false"/>
                {
                    ais.map((aiData, index) => (
                        <button onClick={() => ai != index? handleAIClick(index): handleRefresh(index)} key={index} className={`group h-full flex items-center px-2 py-1 justify-center text-sm font-semibold gap-2 rounded-full outline-none ${index === ai ? 'bg-customBlue text-white' : 'bg-background dark:bg-background-dark text-text dark:text-text-dark hover:bg-uiHover dark:hover:bg-uiHover-dark shadow-inner ring-1 ring-inset ring-buttonRing dark:ring-buttonRing-dark'}`} style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}>
                            <img src={aiLogoData[index]? aiLogoData[index] : ''} alt="logo" className={`h-4 w-4 min-h-4 min-w-4 rounded-full object-contain bg-white ${ai == index? 'group-hover:hidden' : ''}`} draggable="false"/>
                            <img src={refresh? refresh : ''} alt="refresh" className={`text-ui dark:text-ui-dark h-4 w-4 min-h-4 min-w-4 max-h-4 max-w-4 rounded-full object-contain invert hidden ${ai == index? 'flex items-center justify-center group-hover:block' : ''}`} draggable="false"/>
                            <span className="leading-tight px-1">{aiData.name}</span>
                        </button>
                    ))
                }
            </div>
            <div className="h-full flex justify-center items-center">
                {updateStatus &&
                <button onClick={update} title="Update Available" className="text-ui dark:text-ui-dark dark:hover:bg-uiHover-dark h-full px-[16px] transition-colors duration-200 hover:bg-uiHover flex items-center justify-center" style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}>
                    {<ArrowDownload16Regular/>}
                </button>}
                <button onClick={handleMinimize} className="text-ui dark:text-ui-dark dark:hover:bg-uiHover-dark h-full px-[16px] transition-colors duration-200 hover:bg-uiHover flex items-center justify-center" style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}>
                    {<Subtract16Regular />}
                </button>
                <MaximizeButton />
                <button onClick={handleClose} className="text-ui dark:text-ui-dark dark:hover:bg-uiHover-dark h-full px-[16px] transition-colors duration-200 hover:bg-uiHover flex items-center justify-center" style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}>
                    {<Dismiss16Regular />}
                </button>
            </div>
        </div>
    );
};

export default TitleBar;