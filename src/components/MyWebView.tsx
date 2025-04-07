import { useEffect, useRef } from "react";
import { allowedDomains } from "../utils/allowed";

interface WebViewProps {
    aiData: { url: string };
    ai: number;
    index: number;
}

const MyWebView: React.FC<WebViewProps> = ({ aiData, ai, index }) => {
    const webviewRef = useRef<Electron.WebviewTag | null>(null);

    useEffect(() => {
        const webview = webviewRef.current;
        if (!webview) return;

        // Extract hostname from aiData.url
        let aiHostname: string | null = null;
        try {
            aiHostname = new URL(aiData.url).hostname;
        } catch (error) {
            console.error("Invalid URL:", aiData.url);
        }

        const handleNavigation = (event: Event) => {
            const url = (event as any).url as string;
            if (!url) return;

            const parsedUrl = new URL(url);
            const isAllowed = aiHostname === parsedUrl.hostname || allowedDomains.includes(parsedUrl.hostname);

            if (!isAllowed) {
                console.log("Blocked navigation, opening externally:", url);
                event.preventDefault();
                window.electronAPI.openExternal(url);
            } else if ((event as any).newGuest) {
                // Only for new-window event, load inside WebView if allowed
                webview?.loadURL(url);
            }
        };

        webview.addEventListener("will-navigate", handleNavigation);
        webview.addEventListener("did-navigate", handleNavigation);
        webview.addEventListener("did-navigate-in-page", handleNavigation);
        webview.addEventListener("new-window", handleNavigation);

        return () => {
            webview.removeEventListener("will-navigate", handleNavigation);
            webview.addEventListener("did-navigate", handleNavigation);
            webview.addEventListener("did-navigate-in-page", handleNavigation);
            webview.removeEventListener("new-window", handleNavigation);
        };
    }, [aiData.url, allowedDomains]);


    return (
        <webview
            ref={webviewRef}
            src={aiData.url}
            allowpopups={true}
            partition="persist:name"
            className={`${ai === index ? "w-full opacity-100" : "w-0 opacity-0"} transition-all duration-1000 ease-in-out h-full`}
            key={index}
            data-id={index}
        />
    );
};

export default MyWebView;


