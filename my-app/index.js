const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const ipc = ipcMain


const dataController =   require('./src/BLL/data-service.js');


function createWindow () {
    const win = new BrowserWindow({
    width: 1200,
    height: 680,
    minWidth: 1250,
    minHeight: 700,
    frame: false,
    webPreferences: {

      /*
        nodeIntegration: true,
        contextIsolation: false,
        devTools: true,
      */
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      
      devTools: true,
        preload: path.resolve(app.getAppPath(), 'preload.js')
    }
})

    win.loadFile('src/frontend/main-page/main-page.html')
    win.setBackgroundColor('#343B48')

    //// CLOSE APP
    ipc.handle('minimizeApp',async ()=>{
        console.log('Clicked on Minimize Btn')
        win.minimize()
    })

    ipc.handle('get-bugs:call', async () => {
    const isDarkMode = await dataController.getAllBugs();
console.log(isDarkMode);
      return isDarkMode;
    })

    //// MAXIMIZE RESTORE APP
    ipc.handle('maximizeRestoreApp',async ()=>{
        if(win.isMaximized()){
            console.log('Clicked on Restore')
            win.restore()
        } else {
            console.log('Clicked on Maximize')
            win.maximize()
        }
    })
    // Check if is Maximized
    win.on('maximize', ()=>{
        win.webContents.send('isMaximized')
    })
    // Check if is Restored
    win.on('unmaximize', ()=>{
        win.webContents.send('isRestored')
    })

    //// CLOSE APP
    ipc.handle('closeApp',async ()=>{
        console.log('Clicked on Close Btn')
        win.close()
    })
}

app.whenReady().then(() => {
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