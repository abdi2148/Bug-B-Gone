test();

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

async function sendProject(data){

const project = await window.api.getProjectWithID(getParam());

console.log(project);

var inputField = document.getElementById("inputTextName");
inputField.value+=project.name;

var inputFidescriptionTexteld = document.getElementById("descriptionText");
inputFidescriptionTexteld.value+=project.desc;

var dropdowntype = document.getElementById("type");
dropdowntype.selectedIndex = bug.type;
}