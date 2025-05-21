import { contextBridge, ipcRenderer } from "electron";
// const { contextBridge, ipcRenderer } = require('electron')

/**
 * user
 */
contextBridge.exposeInMainWorld('user', {
    login: (username: string, password: string) => ipcRenderer.invoke('ipc-login', { username, password }),
    logout: () => ipcRenderer.send('ipc-logout'),
    toLogin: () => ipcRenderer.send('ipc-to-login-window'),
    signup: (username: string, password: string, passwordCheck: string) => ipcRenderer.invoke('ipc-signup', { username, password, passwordCheck }),
    toSignup: () => ipcRenderer.send('ipc-open-signup-window')
})

/**
 * post
 */
contextBridge.exposeInMainWorld('post', {
    createPost: (user_id: string, username: string, title: string, content: string) => ipcRenderer.invoke('ipc-create-post', { user_id, username, title, content }
    ),
    getAllPosts: () => ipcRenderer.invoke('ipc-get-all-posts')
})