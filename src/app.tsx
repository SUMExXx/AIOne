import React, { useEffect } from "react";
import { FluentProvider, webLightTheme} from "@fluentui/react-components";
import TitleBar from "./components/TitleBar";
import { useAIContext } from "./context/AIContext";
import { env } from "./utils/env";
import { ais } from "./utils/ai";
import MyWebView from "./components/MyWebView";

const App: React.FC = () => {

    const {ai, setAI} = useAIContext();

    return (
        <div className="flex w-full max-h-screen overflow-hidden">
            <FluentProvider theme={webLightTheme} className="w-full min-h-screen">
                <div className="flex flex-col w-full h-full">
                    <TitleBar/>
                    <div className="flex h-full w-full justify-center items-center">
                        {
                            ais.map((aiData, index) => 
                                // <webview
                                //     src={aiData.url}  // Replace with the website you want to embed
                                //     // style={{ width: '100%', height: '100%' }}
                                //     preload=""  // Optional: If you want to load custom scripts
                                //     allowpopups={true}  // Allows popups (optional)
                                //     partition="persist:name" // Keeps session data (optional)
                                //     className={`${ai === index? 'w-full opacity-100' : 'w-0 opacity-0'} transition-all duration-1000 ease-in-out h-full`}
                                //     key={index}
                                //     data-id={index}
                                // />
                                <MyWebView key={index} aiData={aiData} ai={ai} index={index}/>
                            )
                        }
                    </div>
                </div>
            </FluentProvider>
        </div>
    );
};

export default App;