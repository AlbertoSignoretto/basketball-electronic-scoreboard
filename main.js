const { app, BrowserWindow, ipcMain } = require('electron');
let tabelloneWindow, startWindow;
let debug = false;
let reload = false;
let infoPartita={};
if (reload) {
  require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
  });
}

app.whenReady().then(() => {
  startWindow = new BrowserWindow({
    width: 600,
    height: 800,
    icon: __dirname + '/icon.ico',
    webPreferences: {
      preload: __dirname + '/preload.js',
      contextIsolation: true,
    }
  });

  startWindow.loadFile('avvio.html');

  if (debug) {
    startWindow.webContents.openDevTools();
  }
  ipcMain.on('start-game', (event, info) => {
    startWindow.close();
    infoPartita=info
    tabelloneWindow = new BrowserWindow({
      x: infoPartita.posizioneX,
      y: infoPartita.posizioneY,
      width: infoPartita.larghezza,
      height: infoPartita.altezza,
      fullscreen: true,
      frame: true,
      icon: __dirname + '/favicon.ico',
      webPreferences: {
        preload: __dirname + '/preload.js',
      },
    });

    tabelloneWindow.loadFile('tabellone.html');


    if (debug) {
      tabelloneWindow.webContents.openDevTools();
    }

    tabelloneWindow.webContents.on('before-input-event', (event, input) => {
      if (input.key === 'Escape') {
        tabelloneWindow.setFullScreen(false);
        tabelloneWindow.setResizable(true);
      }
    });
  });


  ipcMain.handle('get-info', () => {
    return infoPartita;
  });

  ipcMain.on('set-info', (event, newData) => {
    Object.assign(infoPartita, newData);
    BrowserWindow.getAllWindows().forEach(win => {
      win.webContents.send('update-info', infoPartita);
    });
  });

  ipcMain.on('set-fullscreen', () => {
    if (tabelloneWindow) {
      tabelloneWindow.setFullScreen(true);
    }
  });
});
