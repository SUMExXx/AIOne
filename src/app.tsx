import React, { useEffect } from "react";
import { FluentProvider, webLightTheme} from "@fluentui/react-components";
import TitleBar from "./components/TitleBar";
import { useAIContext } from "./context/AIContext";
import { env } from "./utils/env";
import { ais } from "./utils/ai";

const App: React.FC = () => {

    const {ai, setAI} = useAIContext();

    const userId = env.USER_ID

    return (
        <div className="flex w-full max-h-screen overflow-hidden">
            <FluentProvider theme={webLightTheme} className="w-full min-h-screen">
                <div className="flex flex-col w-full h-full">
                    <TitleBar/>
                    <div className="flex h-full w-full justify-center items-center">
                        {
                            ais.map((aiData, index) => 
                                <webview
                                    src={aiData.url}  // Replace with the website you want to embed
                                    style={{ width: '100%', height: '100%' }}
                                    preload=""  // Optional: If you want to load custom scripts
                                    allowpopups={true}  // Allows popups (optional)
                                    partition="persist:name" // Keeps session data (optional)
                                    className={`${ai === index? 'flex' : 'hidden'}`}
                                    key={index}
                                />
                            )
                        }
                    </div>
                </div>
            </FluentProvider>
        </div>
    );
};

export default App;