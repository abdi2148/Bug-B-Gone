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
var table = document.getElementById("post_body");
table.innerHTML="";
var tr="";

   tr+='<tr type="button" onclick="">';
   tr+='<td class="bugName" value="placeholder">'+ bug.name +'</td>'
   +'<td class="type" value="placeholder">'+ bug.id +'</td>'
   +'<td class="prioity" value="placeholder">'+ bug.desc +'</td>'
   +'<td class="short_description" value="placeholder">' + bug.desc + '</td>';
   tr+='</tr>';

table.innerHTML+=tr;

}