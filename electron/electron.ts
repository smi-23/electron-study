import { app, BrowserWindow, ipcMain } from "electron";
import * as isDev from "electron-is-dev";
import path from "node:path";
import { createPostTbl, createUserTbl, pool } from "./db";
import signup from "./user/signup";
import login from "./user/login";
import { createPost, getAllPosts } from "./post/post";
// import * as path from "path";

function createWindow(loadPath: string) {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.webContents.openDevTools();

  win.loadURL(
    isDev
      ? `http://localhost:3000${loadPath}`
      : `file://${path.join(__dirname, "../build/index.html")}${loadPath}`
  );

  return win
}

/**
 * windows
 */
let loginWindow: BrowserWindow | null = null
let signupWindow: BrowserWindow | null = null
let mainWindow: BrowserWindow | null = null

app.whenReady().then(() => {
  // createWindow();
  createUserTbl();
  createPostTbl();
  loginWindow = createWindow("/")
});

/**
 * open signup window
 */
ipcMain.on('ipc-open-signup-window', () => {
  if (signupWindow && !signupWindow.isDestroyed()) {
    signupWindow.focus(); // 이미 열려 있다면 포커스만
    return;
  }
  signupWindow = createWindow('/signup')
})

/**
 * to login window && close signup window
 */
ipcMain.on('ipc-to-login-window', () => {
  // 중복 코드니까 다음에 sub, util 만들어서 모듈화/분리
  if(signupWindow && !signupWindow.isDestroyed()) {
    signupWindow.close()
  }
  signupWindow = null
  loginWindow?.focus()
})

/**
 * handle signup
 */
ipcMain.handle('ipc-signup', async (_, { username, password, passwordCheck }) => {
  const res = await signup(pool, username, password, passwordCheck)
  
  // close signup window && focus login window
  if (res.success) {
    if (signupWindow && !signupWindow.isDestroyed()) {
      signupWindow.close()
    }
    signupWindow = null
    loginWindow?.focus()
  }
  return res;
})

/**
 * handle login
 */
ipcMain.handle('ipc-login', async (_, { username, password }) => {
  const res = await login(username, password)

  // open main window
  if (res.success) {
    if (loginWindow && !loginWindow.isDestroyed()) {
      loginWindow.close()
    }
    loginWindow = null
    mainWindow = createWindow('/main');
  }
  return res;
})

/**
 * logout
 */
ipcMain.on('ipc-logout', () => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.close()
  }
  mainWindow = null
  loginWindow = createWindow('/')
})


/**
 * create post
 */
ipcMain.handle('ipc-create-post', async (_, user_id, username, title, content) =>{
  const res = await createPost(user_id, username, title, content)
  // 성공하면 최신화
  if(res.success) {
    
  }
})

/**
* get all posts
*/
ipcMain.handle('ipc-get-all-posts', async () => {
  const res = await getAllPosts()
  return res;
})
// 글 쓰기 했을 때 로컬스토리지에서 유저인포 못 찾는 에러 고쳐야 함