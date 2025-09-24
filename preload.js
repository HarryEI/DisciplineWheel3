const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

contextBridge.exposeInMainWorld('electronAPI', {
  saveFile: (content) => ipcRenderer.invoke('save-file', content),
  getUserDataPath: () => ipcRenderer.invoke('get-user-data-path'),
  getFilesFromDirectory: (dirPath) => ipcRenderer.invoke('get-files-from-directory', dirPath),
  joinPath: (base, folder) => path.join(base, folder),
  readFile: (filePath) => ipcRenderer.invoke('read-file', filePath)
});
