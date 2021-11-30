
const maxResBtn = document.getElementById('maxResBtn')
const mySidebar = document.getElementById('mySidebar')
var isLeftMenuActive = true


//// MINIMIZE APP
minimizeBtn.addEventListener('click', async ()=>{
    await window.api.minimizeApp();
})

//// MAXIMIZE RESTORE APP
function changeMaxResBtn(isMaximizedApp){
    if(isMaximizedApp){
        maxResBtn.title = 'Restore'
        maxResBtn.classList.remove('maximizeBtn')
        maxResBtn.classList.add('restoreBtn')
    } else {
        maxResBtn.title = 'Maximize'
        maxResBtn.classList.remove('restoreBtn')
        maxResBtn.classList.add('maximizeBtn')
    }
}
maxResBtn.addEventListener('click', async ()=>{
    await window.api.maximizeRestoreApp();
})
//ipc.on('isMaximized', ()=> { changeMaxResBtn(true) })
//ipc.on('isRestored', ()=> { changeMaxResBtn(false) })

//// CLOSE APP
closeBtn.addEventListener('click', async ()=>{
    await window.api.closeApp();

})

//// TOGGLE MENU
// Expand and Retract
showHideMenus.addEventListener('click', ()=>{
    if(isLeftMenuActive){
        mySidebar.style.width = '0px'
        isLeftMenuActive = false
    } else {
        mySidebar.style.width = '280px'
        isLeftMenuActive = true
    }
})
