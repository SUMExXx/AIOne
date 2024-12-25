// import os from "os";

// const isWindows = os.platform() === "win32";

interface ENV{
    API_BASE_URL: string,
    ROOT_PATH: string,
    USER_ID: string,
    STORAGE_PATH: string,
    EXPRESS_PORT: number,
}

export const env:ENV = {
    API_BASE_URL: "http://localhost:8080",
    ROOT_PATH: "D://ShareHub/",
    STORAGE_PATH: "D://ShareHub/storage/",
    // USER_ID: "dbfebdf7-17e2-458a-87cd-6e1e1fb5cb6d"
    USER_ID: "26e00960-c938-4861-a2ff-b4403158b689",
    EXPRESS_PORT: 8000
}