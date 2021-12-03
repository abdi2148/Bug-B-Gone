
test();


async function test(){

const getAllUsers = await window.api.getAllUsers();

console.log(getAllUsers);

var table = document.getElementById("post_body");
table.innerHTML="";
var tr="";
getAllUsers.forEach(user=>{

   tr+='<tr type="button" onclick="">';
   tr+='<td class="bugName" value="placeholder">'+ user.email +'</td>'
   +'<td class="type" value="placeholder">'+ user.id +'</td>'
   +'<td class="prioity" value="placeholder">'+ user.name +'</td>'
   +'<td class="short_description" value="placeholder">' + user.password + '</td>';

   tr+='</tr>';

})
table.innerHTML+=tr;

}
