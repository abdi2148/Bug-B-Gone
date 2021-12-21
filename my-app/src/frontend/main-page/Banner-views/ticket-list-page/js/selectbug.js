populateFields();
const form = document.querySelector('#signup');
var bugOGID;

async function populateSelectProject(projectId){
    const projects = await window.api.getAllProjects();
    var select = document.getElementById("selectProject");
    var optionIndex;
for(index in projects) {
    var proj = projects[index];
    select.options[select.options.length] = new Option(proj.name, proj.id);
    if(projectId == proj.id){
      optionIndex = index;
    }
}
return optionIndex
}

async function populateSelectUser(userID){
    const users = await window.api.getAllUsers();
    var select = document.getElementById("selectUser");
    var optionIndex;
for(index in users) {
    var user = users[index];
    select.options[select.options.length] = new Option(user.name, user.id);
    if(userID == user.id){
      optionIndex = index;
    }
}
return optionIndex
}

function getParam(){
var result = null,
        tmp = [];
        window.location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
        result = decodeURIComponent(tmp[1]);
        });
    return result;
}
 
async function populateFields(data){
const bug = await window.api.getBugWithID(getParam());
bugOGID = getParam()
var projIndex = await populateSelectProject(bug.project.id);
var userIndex = await populateSelectUser(bug.user.id);

var inputField = document.getElementById("inputTextName");
inputField.value+=bug.name;
var inputFidescriptionTexteld = document.getElementById("shortdescriptionText");
inputFidescriptionTexteld.value+=bug.shortdesc;
var inputFidescriptionTexteld = document.getElementById("descriptionText");
inputFidescriptionTexteld.value+=bug.desc;
var dropdownprio = document.getElementById("prio");
dropdownprio.selectedIndex += bug.priority;
var dropdowntype = document.getElementById("type");
dropdowntype.selectedIndex = bug.type;
var selectProject = document.getElementById("selectProject");
selectProject.selectedIndex = projIndex;
var selectUser = document.getElementById("selectUser");
selectUser.selectedIndex = userIndex;

}



form.addEventListener('submit', async (event) => {
  event.preventDefault();

let name =  form.elements['inputTextName'].value;
let desc = form.elements['descriptionText'].value; 
let shortdesc = form.elements['shortdescriptionText'].value;
var prioritySelect = document.getElementById('prio');
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
  id: bugOGID,
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
updateBug(objectToPass)
});

async function updateBug(data){
  const bug = await window.api.updateBug(data);
}

async function loadUser(data){
  const loadedUser = await window.api.getUserWithID(data);
  return loadedUser;
}

async function loadProject(data){
  const loadedProject = await window.api.getProjectWithID(data);
  return loadedProject;
}