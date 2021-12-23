const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const ipc = ipcMain


const dataController = require('./src/BLL/data-service.js');

// Import the functions you need from the SDKs you need
const firebaseAPP = require('firebase/app');

const auth =require('firebase/auth');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
firebaseAPP.initializeApp
({
  apiKey: "AIzaSyAkPpZpO0NLHTQbO0zGSZVqybtyIvg_2x8",
  authDomain: "bug-b-gone.firebaseapp.com",
  databaseURL: "https://bug-b-gone-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bug-b-gone",
  storageBucket: "bug-b-gone.appspot.com",
  messagingSenderId: "531503281471",
  appId: "1:531503281471:web:63354aa776fc06317fcf8a"
});

let user = {};

function createWindow () {
    const win = new BrowserWindow({
    width: 1350,
    height: 750,
    minWidth: 1350,
    minHeight: 750,
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
    ipc.handle('minimizeApp', async () => {
        console.log('Clicked on Minimize Btn')
        win.minimize()
    })
  
      // Login Call
    ipc.handle('login:call', async (event, ...args) =>{

        var userCredential = await auth.signInWithEmailAndPassword(auth.getAuth(),args[0]['username'], args[0]['password'])
          .catch((error) => {
            console.log(error.message)
          });
        if (auth.getAuth().currentUser == null) {
          return { error: 'wrong user credentials' };
        } else {
          user = { id: auth.getAuth().currentUser.uid, email: auth.getAuth().currentUser.email };
          return user;

        }
    })
  
    ipc.handle('logout:call', async (event) =>{
      user = {};
      return True;
    })
  
    ipc.handle('getAuthUser:call', async (event) =>{
      return user;
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
    ipc.handle('create-bug:call', async (event, ...args) => {
      const allBugs = await dataController.createBug(...args);
      return allBugs;
    })
    ipc.handle('update-bug:call', async (event, ...args) => {
      const allBugs = await dataController.updateBug(...args);
      return allBugs;
    })
    ipc.handle('delete-bug:call', async (event, ...args) => {
      const allBugs = await dataController.deleteBug(...args);
      return allBugs;
    })

    //Project calls
    ipc.handle('get-projects:call', async () => {
      const allProjects = await dataController.getAllProjects();
      return allProjects;
    })
    ipc.handle('get-project-ID:call', async (event, ...args) => {
      console.log(...args)
      const projectWithID = await dataController.getProjectWithID(...args);
      return projectWithID;
    })
    ipc.handle('create-project:call', async (event, ...args) => {
      const createdProject = await dataController.createProject(...args);
      return createdProject;
    })
    ipc.handle('update-project:call', async (event, ...args) => {
      const updatedProject = await dataController.updateProject(...args);
      return updatedProject;
    })
    ipc.handle('delete-project:call', async (event, ...args) => {
      const deletedProject = await dataController.deleteProject(...args);
      return deletedProject;
    })

    //User calls
    ipc.handle('get-users:call', async () => {
      const allUsers = await dataController.getAllUsers();
      return allUsers;
    })
    ipc.handle('get-user-ID:call', async (event, ...args) => {
      const userWithID = await dataController.getUserWithID(...args);
      return userWithID;
    })
    ipc.handle('create-user:call', async (event, ...args) => {
      const createdUser = await dataController.createUser(...args);
      return createdUser;
    })
    ipc.handle('update-user:call', async (event, ...args) => {
      const updatedUser = await dataController.updateUser(...args);
      return updatedUser;
    })
    ipc.handle('delete-user:call', async (event, ...args) => {
      const deletedUser = await dataController.deleteUser(...args);
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