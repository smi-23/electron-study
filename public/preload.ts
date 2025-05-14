import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('api', {
    getPlatform: ()=>ipcRenderer.invoke('getOs')
})