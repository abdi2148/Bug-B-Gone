loadProject();
const updateBtn = document.querySelector('#update');
const deleteBtn = document.querySelector('#delete');
var projID;
var selectedUsers = [];

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

document.getElementById('addUser').addEventListener("change", async (event) =>{
  event.preventDefault();
  var userID = document.getElementById('addUser').value;
  var user = await window.api.getUserWithID(userID);
  selectedUsers.push(user)

  let name =  updateBtn.elements['inputTextName'].value;
  let desc = updateBtn.elements['descriptionText'].value; 
  
  var objectToPass ={
    id: projID,
    name: name,
    desc: desc,
    users: selectedUsers
  }
  updateBtn.elements['inputTextName'].value = "";
  updateBtn.elements['descriptionText'].value = ""; 
  updateProject(objectToPass)
  loadProject()
})

deleteBtn.addEventListener('submit', async (event) =>{
  event.preventDefault();
  await window.api.deleteProject(projID)
  window.location.href = 'edit-project.html'
});

updateBtn.addEventListener('submit', async (event) => {
  event.preventDefault();
  let name =  updateBtn.elements['inputTextName'].value;
  let desc = updateBtn.elements['descriptionText'].value; 
  
  var objectToPass ={
    id: projID,
    name: name,
    desc: desc,
    users: selectedUsers
  }
  updateProject(objectToPass)
  window.location.href = 'edit-project.html'
});

async function updateProject(data){
  const proj = await window.api.updateProject(data);
}

async function loadProject(){
const project = await window.api.getProjectWithID(getParam());
projID = getParam()
var inputField = document.getElementById("inputTextName");
inputField.value+=project.name;
var inputFidescriptionTexteld = document.getElementById("descriptionText");
inputFidescriptionTexteld.value+=project.desc;

if(project.users != undefined){
  project.users.forEach(user =>{
    selectedUsers.push(user)
  } )
}
loadUsers(project)
}

async function loadUsers(project){
  const users = await window.api.getAllUsers();
  var select = document.getElementById("addUser");
  if(project.users != undefined){
    for( var i = users.length - 1; i>=0; i--){
    for (var j = 0; j < selectedUsers.length; j++) {
      if (users[i].id === selectedUsers[j].id) {
        users.splice(i, 1);
        }
      }
    } 
  }

  populateList()
  for(index in users) {
    var user = users[index];
    select.options[select.options.length] = new Option(user.name, user.id);
}
}

function populateList(){
  var table = document.getElementById("post_body");
  table.innerHTML="";
  var tr="";
 //Create Users in list
selectedUsers.forEach(user=>{
  tr+='<td class="bugName" value="placeholder">'+ user.name +'</td>'
  tr+='</tr>';
})
  table.innerHTML+=tr;
  
  }