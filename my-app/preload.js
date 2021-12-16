const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'api', {
    //Core App Functionalities
    maximizeRestoreApp: () => { 
      ipcRenderer.invoke('maximizeRestoreApp');
    },
    closeApp: () => { 
      ipcRenderer.invoke('closeApp');
    },
    minimizeApp: () => { 
      ipcRenderer.invoke('minimizeApp');
    },

    login: async function (data) { 
      const loginInfo = await ipcRenderer.invoke('login:call', data);
      return loginInfo;
     },

    //Bug calls
    getAllBugs: async () => { 
      const allBugs = await ipcRenderer.invoke('get-bugs:call');
      return allBugs;
     },
     getBugWithID: async function (data) { 
      const bugWithID = await ipcRenderer.invoke('get-bug-ID:call', data);
      return bugWithID;
     },
     createBug: async (data) => { 
      const newBug = ipcRenderer.invoke('create-bug:call', data);
      return newBug;
     },
     updateBug: async (data) => { 
      const updatedBug = ipcRenderer.invoke('update-bug:call', data);
      return updatedBug;
     },
     deleteBug: async (data) => { 
      const deletedBug = ipcRenderer.invoke('delete-bug:call', data);
      return deletedBug;
     },

     //User calls
     getAllUsers: async () => { 
      const allUsers = await ipcRenderer.invoke('get-users:call');
      return allUsers;
     },
     getUserWithID: async (data) => { 
      const userWithID = await ipcRenderer.invoke('get-user-ID:call', data);
      return userWithID;
     },
     createUser: async (data) => { 
      const newUser = ipcRenderer.invoke('create-user:call', data);
      return newUser;
     },
     updateUser: async (data) => { 
      const updatedUser = ipcRenderer.invoke('update-user:call', data);
      return updatedUser;
     },
     deleteUser: async (data) => { 
      const deletedUser = ipcRenderer.invoke('delete-user:call', data);
      return deletedUser;
     },
     
     //Project calls
     getAllProjects: async () => { 
      const allProjects = await ipcRenderer.invoke('get-projects:call');
      return allProjects;
     },
     getProjectWithID: async (data) => { 
      const projectWithID = await ipcRenderer.invoke('get-project-ID:call', data);
      return projectWithID;
     },
     createProject: async (data) => { 
      const newProject = ipcRenderer.invoke('create-project:call', data);
      return newProject;
     },
     updateProject: async (data) => { 
      const updatedProject = ipcRenderer.invoke('update-project:call', data);
      return updatedProject;
     },
     deleteProject: async (data) => { 
      const deletedProject = ipcRenderer.invoke('delete-project:call', data);
      return deletedProject;
     },
  })

  window.addEventListener('DOMContentLoaded', () => {
      const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
      }
    
      for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
      }
    })
  