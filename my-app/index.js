const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const ipc = ipcMain

function createWindow () {
    const win = new BrowserWindow({
    width: 1200,
    height: 680,
    minWidth: 940,
    minHeight: 560,
    frame: false,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        devTools: true,
        preload: path.join(__dirname, 'preload.js')
    }
})

    win.loadFile('src/main-page.html')
    win.setBackgroundColor('#343B48')

    //// CLOSE APP
    ipc.on('minimizeApp', ()=>{
        console.log('Clicked on Minimize Btn')
        win.minimize()
    })

    //// MAXIMIZE RESTORE APP
    ipc.on('maximizeRestoreApp', ()=>{
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
    ipc.on('closeApp', ()=>{
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