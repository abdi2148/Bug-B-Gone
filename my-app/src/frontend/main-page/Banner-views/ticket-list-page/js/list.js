
test();


async function test(){

const getAllBugs = await window.api.send();

console.log(getAllBugs);

var table = document.getElementById("post_body");
table.innerHTML="";
var tr="";
getAllBugs.forEach(bug=>{

   tr+='<tr type="button" onclick="">';
   tr+='<td class="bugName" value="placeholder">'+ bug.name +'</td>'
   +'<td class="type" value="placeholder">'+ bug.id +'</td>'
   +'<td class="prioity" value="placeholder">'+ bug.desc +'</td>'
   +'<td class="short_description" value="placeholder">' + bug.desc + '</td>';

   tr+='</tr>';

})
table.innerHTML+=tr;

}
