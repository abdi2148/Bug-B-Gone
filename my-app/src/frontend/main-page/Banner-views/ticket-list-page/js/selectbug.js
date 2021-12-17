populateFields();

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

console.log(bug);

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
}