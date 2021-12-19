populateSelect();

const form = document.querySelector('#signup');

//Is this needed?
const name = form.elements['name'];
const desc = form.elements['desc'];
const shortdesc = form.elements['shortdesc'];
const type = form.elements['type'];
const priority = form.elements['priority'];
const status = form.elements['status'];

async function populateSelect(){
    const projects = await window.api.getAllProjects();
    var select = document.getElementById("selectProject");
for(index in projects) {
    var proj = projects[index];
    select.options[select.options.length] = new Option(proj.name, proj.id);
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
var select = document.getElementById("selectProject");
var selectedProject = select.options[select.selectedIndex].value;

const loadedProject = await loadProject(selectedProject)

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
    }
}
sendBug(objectToPass)
});

async function sendBug(data){
    const bug = await window.api.createBug(data);
}

async function loadProject(data){
    const loadedProject = await window.api.getProjectWithID(data);
    return loadedProject;
}