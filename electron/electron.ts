import { app, BrowserWindow, ipcMain } from "electron";
import * as isDev from "electron-is-dev";
import path from "node:path";
import { createUserTbl, pool } from "./db";
import { signup } from "./user/signup";
import { RowDataPacket } from "mysql2";
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
let mainWindow: BrowserWindow | null = null

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

/**
 * handle signup
 */
ipcMain.handle('ipc-signup', async (_, { username, password, passwordCheck }) => {
  const res = await signup(pool, username, password, passwordCheck)
  if (res.success) {
    signupWindow?.close();
    loginWindow?.focus();
    signupWindow = null
  }
})

/**
 * handle login
 */
interface User extends RowDataPacket {
  username: string;
  password: string;
}

ipcMain.handle('ipc-login', async (_, { username, password }) => {
  const connection = await pool.getConnection()
  try {
    const [rows] = await connection.execute<User[]>(`select username, password from users where username = ?`, [username])
    
    // check if user exists
    if (!Array.isArray(rows) || rows.length === 0) {
      console.log("user not found")
      return { success: false }
    }

    // check password match
    if(password !== rows[0].password) {
      console.log('password incorrect')
      return {success: false}
    }

    // open main window
    loginWindow?.close()
    loginWindow = null
    mainWindow = createWindow('/main');

    console.log('login has successed')
    return {success: true}
  } catch (error) {
    console.error(error)
  } finally {
    connection.release()
  }
})

/**
 * logout
 */
ipcMain.on('ipc-logout', ()=>{
  mainWindow?.close()
  mainWindow = null
  loginWindow = createWindow('/')
})