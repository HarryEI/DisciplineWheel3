const { app, BrowserWindow, ipcMain, dialog } = require('electron/main')
const path = require('path'); 
const fs = require('fs');


console.log('Loading:', path.join(__dirname, 'index.html'));

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      preload: path.resolve(app.getAppPath(), 'preload.js'),
      contextIsolation: true,    // Allow direct script access
      nodeIntegration: false,       // Enable Node.js in renderer    
      webSecurity: false,
      sandbox: false
    }
  })

  win.loadFile( path.join(__dirname, 'index.html'))
  win.webContents.openDevTools();
}

ipcMain.handle('get-user-data-path', async () => {
  return app.getPath('userData');
});

ipcMain.handle('get-files-from-directory', async (event, dirPath) => {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    return fs.readdirSync(dirPath);
  } catch (err) {
    console.error("Directory error:", err);
    return [];
  }
});

ipcMain.handle('read-file', async (event, filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error('Failed to read file:', err);
    return '';
  }
});

ipcMain.handle('save-file', async (event, content) => {
  const targetFolder = path.join(app.getPath('userData'), 'questions');
  const fileName = 'myfile.txt';
  const filePath = path.join(targetFolder, fileName);

  // Make sure the folder exists
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, { recursive: true });
  }

  try {
    fs.writeFileSync(filePath, content, 'utf-8');
    return { success: true, path: filePath };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})