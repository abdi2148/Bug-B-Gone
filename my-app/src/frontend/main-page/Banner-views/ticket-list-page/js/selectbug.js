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

async function test(){

const bug = await window.api.getBugWithID(getParam());

console.log(bug);

var inputField = document.getElementById("inputTextName");
inputField.value+=bug.name;

var inputFidescriptionTexteld = document.getElementById("shortdescriptionText");
inputFidescriptionTexteld.value+=bug.desc;

var inputFidescriptionTexteld = document.getElementById("descriptionText");
inputFidescriptionTexteld.value+=bug.desc;

var dropdownprio = document.getElementById("prio");
dropdownprio.selectedIndex = 2;

var dropdowntype = document.getElementById("type");
dropdowntype.selectedIndex = 1;
}