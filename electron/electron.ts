import { app, BrowserWindow, ipcMain } from "electron";
import * as isDev from "electron-is-dev";
import path from "node:path";
// import * as path from "path";

ipcMain.handle("getOs", () => {
  return process.platform;
});

ipcMain.handle('system-versions', () => {
    return {
        node: process.versions.node,
        chrome: process.versions.chrome
    }
})

function createWindow() {
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
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
}

app.whenReady().then(() => {
  createWindow();
});
