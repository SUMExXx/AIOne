import React, { useEffect, useState } from "react";
import { Subtract16Regular, Square16Regular, Dismiss16Regular } from '@fluentui/react-icons';
import { ais } from "../utils/ai";
import { useAIContext } from "../context/AIContext";
import MaximizeButton from "./MaximizeButton";

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

    const [logo, setLogo] = useState<string | null>(null);
    const [chatgptLogo, setChatGPTLogo] = useState<string | null>(null);
    const [geminiLogo, setGeminiLogo] = useState<string | null>(null);
    const [claudeLogo, setClaudeLogo] = useState<string | null>(null);

    useEffect(() => {
        window.electronAPI.getAssetImage('images/AIO.png').then(setLogo);
        window.electronAPI.getAssetImage('images/chatgpt.png').then(setChatGPTLogo);
        window.electronAPI.getAssetImage('images/gemini.png').then(setGeminiLogo);
        window.electronAPI.getAssetImage('images/claude.png').then(setClaudeLogo);
    }, []);

    const logoArray = [chatgptLogo, geminiLogo, claudeLogo];

    return (
        <div className="w-full h-[40px] min-h-[40px] bg-white flex justify-center items-center">
            <div className="w-full flex gap-2 p-2 items-center">
                <img src={logo? logo : ''} alt="logo" className="h-4 w-4 rounded-full object-contain"/>
                {
                    ais.map((aiData, index) => (
                        <button onClick={() => handleAIClick(index)} key={index} className={`h-full flex items-center px-2 py-1 justify-center text-sm font-semibold gap-2 rounded-full outline-none ${index === ai ? 'bg-customBlue text-white' : 'bg-white text-customDarkGrey hover:bg-[#E5E5E5] shadow-inner ring-1 ring-inset ring-customLightGrey'}`}>
                            <img src={logoArray[index]? logoArray[index] : ''} alt="logo" className="h-4 w-4 rounded-full object-contain bg-white"/>
                            <span className="leading-tight px-1">{aiData.name}</span>
                        </button>
                    ))
                }
            </div>
            <div className="h-full flex justify-center items-center">
                <button onClick={handleMinimize} className="text-customDarkGrey h-full px-[16px] transition-colors duration-200 hover:bg-[#E5E5E5] flex items-center justify-center">
                    {<Subtract16Regular />}
                </button>
                <MaximizeButton />
                <button onClick={handleClose} className="text-customDarkGrey h-full px-[16px] transition-colors duration-200 hover:bg-[#E5E5E5] flex items-center justify-center">
                    {<Dismiss16Regular />}
                </button>
            </div>
        </div>
    );
};

export default TitleBar;