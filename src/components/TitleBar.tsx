import React, { useEffect, useState, useRef } from "react";
import { Subtract16Regular, Dismiss16Regular, ArrowDownload16Regular, ChevronLeft16Regular, ChevronRight16Regular } from "@fluentui/react-icons";
import { ais, mainLogo } from "../utils/ai";
import { useAIContext } from "../context/AIContext";
import MaximizeButton from "./MaximizeButton";
import { env } from "../utils/env";

const TitleBar: React.FC = () => {
    const { ai, setAI } = useAIContext();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [showRightButton, setShowRightButton] = useState(false);

    const handleMinimize = () => window.electronAPI.minimizeWindow();
    const handleClose = () => window.electronAPI.closeWindow();
    const handleAIClick = (index: number) => setAI(index);

    const handleRefresh = (index: number) => {
        const webview = document.querySelector(`webview[data-id="${index}"]`) as Electron.WebviewTag;
        if (webview) {
            webview.src = ais[index].url;
        }
    };

    const [updateStatus, setUpdateStatus] = useState<boolean>(false);
    const checkUpdate = () => {
        fetch("https://api.github.com/repos/SUMExXx/AIOne/releases/latest").then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    if (data.tag_name !== env.TAG) {
                        setUpdateStatus(true);
                    }
                });
            }
        });
    };

    const update = () => {};

    const [logo, setLogo] = useState<string | null>(null);
    const [refresh, setRefresh] = useState<string | null>(null);
    const [aiLogoData, setAILogoData] = useState<string[]>([]);

    const setAILogos = () => {
        ais.forEach((ai, index) => {
            window.electronAPI.getAssetImage(ai.logo).then((logo) => {
                if (logo) {
                    setAILogoData((prev) => {
                        const newLogos = [...prev];
                        newLogos.push(logo);
                        return newLogos;
                    });
                }
            });
        });
        window.electronAPI.getAssetImage(mainLogo).then((logo) => logo && setLogo(logo));
        window.electronAPI.getAssetImage(`/images/refresh.png`).then((logo) => logo && setRefresh(logo));
    };

    useEffect(() => {
        checkUpdate();
        setAILogos();
    }, []);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;

        const checkOverflow = () => {
            if (scrollContainer) {
                setShowLeftButton(scrollContainer.scrollLeft > 0);
                setShowRightButton(
                    scrollContainer.scrollLeft + scrollContainer.clientWidth < scrollContainer.scrollWidth
                );
            }
        };

        const handleResize = () => {
            setTimeout(checkOverflow, 50); // Delay check to ensure correct dimensions
        };

        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", checkOverflow);
            window.addEventListener("resize", handleResize);
            checkOverflow(); // Initial check
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener("scroll", checkOverflow);
            }
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -100, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 100, behavior: "smooth" });
        }
    };

    return (
        <div className="w-full h-[40px] min-h-[40px] bg-background dark:bg-background-dark flex justify-between items-center relative" style={{ WebkitAppRegion: "drag" } as React.CSSProperties}>
            <div className="flex gap-2 p-2 items-center justify-center">
                <img
                    src={logo ? logo : ""}
                    alt="logo"
                    className="h-6 w-6 min-h-6 min-w-6 max-h-6 max-w-6 p-[2px] bg-white rounded-full object-contain"
                    draggable="false"
                />
            </div>

            {showLeftButton && (
                <button type="button" title="Left" onClick={scrollLeft} className="z-10 h-full px-2 bg-gradient-to-r from-background via-background/90 to-transparent dark:from-background-dark dark:via-background-dark/90 text-ui dark:text-ui-dark">
                    <ChevronLeft16Regular />
                </button>
            )}

            <div ref={scrollContainerRef} className="flex gap-2 p-2 items-center flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide" style={{ WebkitAppRegion: "no-drag", overflowY: "hidden" } as React.CSSProperties}>
                {ais.map((aiData, index) => (
                    <button
                        onClick={() => (ai !== index ? handleAIClick(index) : handleRefresh(index))}
                        key={index}
                        className={`group h-full flex items-center px-2 py-1 justify-center text-sm font-semibold gap-2 rounded-full outline-none ${
                            index === ai
                                ? "bg-customBlue text-white"
                                : "bg-background dark:bg-background-dark text-text dark:text-text-dark hover:bg-uiHover dark:hover:bg-uiHover-dark shadow-inner ring-1 ring-inset ring-buttonRing dark:ring-buttonRing-dark"
                        }`}
                        style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
                    >
                        <img
                            src={aiLogoData[index] ? aiLogoData[index] : ""}
                            alt="logo"
                            className={`h-4 w-4 min-h-4 min-w-4 rounded-full object-contain bg-white ${ai === index ? "group-hover:hidden" : ""}`}
                            draggable="false"
                        />
                        <img
                            src={refresh ? refresh : ""}
                            alt="refresh"
                            className={`text-ui dark:text-ui-dark h-4 w-4 min-h-4 min-w-4 max-h-4 max-w-4 rounded-full object-contain invert hidden ${ai === index ? "flex items-center justify-center group-hover:block" : ""}`}
                            draggable="false"
                        />
                        <span className="leading-tight px-1">{aiData.name}</span>
                    </button>
                ))}
            </div>

            {showRightButton && (
                <button type="button" title="Right" onClick={scrollRight} className="z-10 h-full px-2 bg-gradient-to-l from-background via-background/90 to-transparent dark:from-background-dark dark:via-background-dark/90 text-ui dark:text-ui-dark">
                    <ChevronRight16Regular />
                </button>
            )}

            <div className="h-full flex justify-center items-center">
                {updateStatus && (
                    <button onClick={update} title="Update Available" className="text-ui dark:text-ui-dark dark:hover:bg-uiHover-dark h-full px-[16px] transition-colors duration-200 hover:bg-uiHover flex items-center justify-center" style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}>
                        <ArrowDownload16Regular />
                    </button>
                )}
                <button type="button" title="Minimize" onClick={handleMinimize} className="text-ui dark:text-ui-dark dark:hover:bg-uiHover-dark h-full px-[16px] transition-colors duration-200 hover:bg-uiHover flex items-center justify-center" style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}>
                    <Subtract16Regular />
                </button>
                <MaximizeButton />
                <button type="button" title="Close" onClick={handleClose} className="text-ui dark:text-ui-dark dark:hover:bg-uiHover-dark h-full px-[16px] transition-colors duration-200 hover:bg-uiHover flex items-center justify-center" style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}>
                    <Dismiss16Regular />
                </button>
            </div>
        </div>
    );
};

export default TitleBar;
