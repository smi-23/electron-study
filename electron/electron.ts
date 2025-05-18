import { app, BrowserWindow, ipcMain } from "electron";
import * as isDev from "electron-is-dev";
import path from "node:path";
import { createUserTbl, pool } from "./db";
import {signup} from "./user/signup";
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

let loginWindow: BrowserWindow | null = null
let signupWindow: BrowserWindow | null = null

app.whenReady().then(() => {
  // createWindow();
  createUserTbl();
  loginWindow = createWindow("/")
  // signup(pool)
});

/**
 * open signup window
 */
ipcMain.on('ipc-open-window-signup', () => {
  if (signupWindow && !signupWindow.isDestroyed()) {
    signupWindow.focus(); // 이미 열려 있다면 포커스만
    return;
  }
  signupWindow = createWindow("/signup")
})

ipcMain.handle('ipc-signup', async (_, { username, password, passwordCheck }) => {
  const res = await signup(pool, username, password, passwordCheck)
  if (res.success) {
    signupWindow?.close();
    loginWindow?.focus();
    signupWindow = null
  }
})

// 내일은 db연결, 회원가입 로그인 관련 비즈니스 로직 완성하기