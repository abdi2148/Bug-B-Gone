const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
'api', {
  send: async (channel, data) => { 
    console.log('Sent');
   await ipcRenderer.invoke('get-bugs:call');
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
  recieved: (channel, data) => { 
    ipcRenderer.invoke('get-bugs:call');
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
