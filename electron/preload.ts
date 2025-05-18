import { contextBridge, ipcRenderer } from "electron";
// const { contextBridge, ipcRenderer } = require('electron')

/**
 * user
 * loginm signup
 */
contextBridge.exposeInMainWorld('user', {
    login: (username: string, password: string) => ipcRenderer.invoke('ipc-login', { username, password }),
    signup: (username: string, password: string, passwordCheck: string) => ipcRenderer.invoke('ipc-signup', { username, password, passwordCheck }),
    toSignup: () => ipcRenderer.send('ipc-open-window-signup')
})