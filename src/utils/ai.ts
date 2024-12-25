export interface AI {
    id: string;
    name: string;
    logo: string;
    url: string;
}

export const ais: AI[] = [
    {
        "id": "0",
        "name": "ChatGPT",
        "logo": "/images/chatgpt.png",
        "url": "https://chatgpt.com/",
    },
    {
        "id": "1",
        "name": "Gemini",
        "logo": "/images/gemini.png",
        "url": "https://gemini.google.com/",
    },
    {
        "id": "2",
        "name": "Claude",
        "logo": "/images/claude.png",
        "url": "https://claude.ai/",
    }
];