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

    //Bug calls
    ipc.handle('get-bugs:call', async () => {
      const allBugs = await dataController.getAllBugs();
      return allBugs;
    })
    ipc.handle('get-bug-ID:call', async (event, ...args) =>{
      const bugWithID = await dataController.getBugWithID(...args);
      return bugWithID;
    })
    ipc.handle('create-bug:call', async (data) => {
      const allBugs = await dataController.createBug(data);
      return allBugs;
    })
    ipc.handle('update-bug:call', async (data) => {
      const allBugs = await dataController.updateBug(data);
      return allBugs;
    })
    ipc.handle('delete-bug:call', async (data) => {
      const allBugs = await dataController.deleteBug(data);
      return allBugs;
    })

    //Project calls
    ipc.handle('get-projects:call', async () => {
      const allProjects = await dataController.getAllProjects();
      return allProjects;
    })
    ipc.handle('get-project-ID:call', async (data) => {
      const projectWithID = await dataController.getProjectWithID(data);
      return projectWithID;
    })
    ipc.handle('create-project:call', async (data) => {
      const createdProject = await dataController.createProject(data);
      return createdProject;
    })
    ipc.handle('update-project:call', async (data) => {
      const updatedProject = await dataController.updateProject(data);
      return updatedProject;
    })
    ipc.handle('delete-project:call', async (data) => {
      const deletedProject = await dataController.deleteProject(data);
      return deletedProject;
    })

    //User calls
    ipc.handle('get-users:call', async () => {
      const allUsers = await dataController.getAllUsers();
      return allUsers;
    })
    ipc.handle('get-user-ID:call', async (data) => {
      const userWithID = await dataController.getUserWithID(data);
      return userWithID;
    })
    ipc.handle('create-user:call', async (event, ...args) => {
      const createdUser = await dataController.createUser(...args);
      return createdUser;
    })
    ipc.handle('update-user:call', async (data) => {
      const updatedUser = await dataController.updateUser(data);
      return updatedUser;
    })
    ipc.handle('delete-user:call', async (data) => {
      const deletedUser = await dataController.deleteUser(data);
      return deletedUser;
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