populateSelectProject();
populateSelectUser();

const form = document.querySelector('#signup');

//Is this needed?
const name = form.elements['name'];
const desc = form.elements['desc'];
const shortdesc = form.elements['shortdesc'];
const type = form.elements['type'];
const priority = form.elements['priority'];
const status = form.elements['status'];

async function populateSelectProject(){
    const projects = await window.api.getAllProjects();
    var select = document.getElementById("selectProject");
for(index in projects) {
    var proj = projects[index];
    select.options[select.options.length] = new Option(proj.name, proj.id);
}
}

async function populateSelectUser(){
    const users = await window.api.getAllUsers();
    var select = document.getElementById("selectUser");
for(index in users) {
    var user = users[index];
    select.options[select.options.length] = new Option(user.name, user.id);
}
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

let name =  form.elements['name'].value;
let desc = form.elements['desc'].value; 
let shortdesc = form.elements['shortdesc'].value;
var prioritySelect = document.getElementById('priority');
var priority = prioritySelect.options[prioritySelect.selectedIndex].value;
var typeSelect = document.getElementById('type');
var type = typeSelect.options[typeSelect.selectedIndex].value;
var selectProject = document.getElementById("selectProject");
var selectedProject = selectProject.options[selectProject.selectedIndex].value;
var selectUser = document.getElementById("selectUser");
var selectedUser = selectUser.options[selectUser.selectedIndex].value;

const loadedProject = await loadProject(selectedProject)
const loadedUser = await loadUser(selectedUser)

var objectToPass ={
    desc: desc,
    name: name,
    priority: priority,
    shortdesc : shortdesc,
    status: "open",
    type: type,
    project :{
        id : loadedProject.id,
        name : loadedProject.name,
        desc : loadedProject.desc
    },
    user :{
        id : loadedUser.id,
        name : loadedUser.name,
        email : loadedUser.email
    }
}
sendBug(objectToPass)
});

async function sendBug(data){
    const bug = await window.api.createBug(data);
}

async function loadUser(data){
    const loadedUser = await window.api.getUserWithID(data);
    return loadedUser;
}

async function loadProject(data){
    const loadedProject = await window.api.getProjectWithID(data);
    return loadedProject;
}