const { app, BrowserWindow } = require("electron");
require("electron-reload")(__dirname);

function createWindow() {
  const win = new BrowserWindow({
    width: 252,
    height: 252,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    frame: false, 
    transparent: false,
    webPreferences: {
      contextIsolation: true
    }
  });

  win.loadFile("index.html");
  //win.webContents.openDevTools({ mode: "detach" });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});