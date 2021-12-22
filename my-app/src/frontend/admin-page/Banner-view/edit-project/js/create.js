const form = document.querySelector('#signup');
loadList();

form.addEventListener('submit', (event) => {
    event.preventDefault();

let name =  form.elements['name'].value;
let desc = form.elements['desc'].value;

var objectToPass ={
    name: name,
    desc: desc
}

sendProject(objectToPass)

});

async function sendProject(data){
    const project = await window.api.createProject(data);
    form.elements['name'].value = "";
    form.elements['desc'].value = "";
    loadList();
}

async function loadList(){
    const allProjects = await window.api.getAllProjects();
    projList = allProjects;
    populateList(allProjects);
 }

function populateList(projects){
    var table = document.getElementById("post_body");
    table.innerHTML="";
    var tr="";
    projects.forEach(proj=>{
       tr+='<tr type="button" onclick="">';
       tr+='<td class="bugName" value="placeholder">'+ proj.name +'</td>'
       +'<td class><a style="font-weight: 800;color: rgb(26, 43, 43);background: darkslategray;border-radius: 12px;margin-left: 34px;text-decoration: none; padding-left: 35px;padding-right: 35px;border: 2px solid rgb(65, 109, 109);"href="../edit-project/edit.html?bugId='+proj.id+'">Edit</a>';'</td>'
      
       tr+='</tr>';
    
    })
    table.innerHTML+=tr;
    
    }