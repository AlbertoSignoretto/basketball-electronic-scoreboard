const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getInfo: () => ipcRenderer.invoke('get-info'),
    setInfo: (data) => ipcRenderer.send('set-info', data),
    updateInfo: (callback) => ipcRenderer.on('update-info', (event, data) => callback(data)),
    setFullScreen: () => ipcRenderer.send('set-fullscreen'),
    startGame: (info) => ipcRenderer.send('start-game', info)
});
