import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('system', {
    getPlatform: () => ipcRenderer.invoke('getOs'),
    getVersions: () => ipcRenderer.invoke('system-versions')
    
})