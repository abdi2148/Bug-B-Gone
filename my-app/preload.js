const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
'api', {
  send: async () => { 
   const allBugs = await ipcRenderer.invoke('get-bugs:call');
   return allBugs;
   //console.log(allBugs);
  },
  maximizeRestoreApp: () => { 
    ipcRenderer.invoke('maximizeRestoreApp');
  },
  closeApp: () => { 
    ipcRenderer.invoke('closeApp');
  },
  minimizeApp: () => { 
    ipcRenderer.invoke('minimizeApp');
  },
},
'user',{
  getUser: () => { 
  ipcRenderer.invoke('maximizeRestoreApp');
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
