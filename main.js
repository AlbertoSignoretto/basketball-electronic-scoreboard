const { app, BrowserWindow, ipcMain } = require('electron');
require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
})

let tabelloneWindow
let debug=true
let infoPartita={
    squadraCasa:'HQ',
    squadraOspiti:'DECIMA',
    punteggioCasa:0,
    punteggioOspiti:0,
    falliCasa:0,
    falliOspiti:0,
    timeoutCasa:0,
    timeoutOspiti:0,
    quartoGioco:1,
    tempo:10*60,
    freccia:''
}



app.whenReady().then(() => {
  tabelloneWindow=new BrowserWindow({
      width: 1024,
      height: 768,
      x: 100,
      y: 100,
      webPreferences: {
        preload: __dirname + '/preload.js',
      },
  });
  tabelloneWindow.loadFile('tabellone.html');
  if(debug){
    tabelloneWindow.webContents.openDevTools();
  }

  ipcMain.handle('get-info', () => {
    return infoPartita;
  });
  ipcMain.on('set-info', (event, newData) => {
    Object.assign(infoPartita, newData);
    BrowserWindow.getAllWindows().forEach(win => {
        win.webContents.send('update-info', infoPartita);
    });
  })

});
