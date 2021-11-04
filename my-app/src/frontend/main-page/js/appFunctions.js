const { ipcRenderer } = require('electron')
const ipc = ipcRenderer

//// MINIMIZE APP
minimizeBtn.addEventListener('click', ()=> {
    ipc.send('minimizeApp')
})

//// MAXIMIZE APP
minimizeBtn.addEventListener('click', ()=> {
    ipc.send('minimizeApp')
})

//// CLOSE APP
minimizeBtn.addEventListener('click', ()=> {
    ipc.send('minimizeApp')
})