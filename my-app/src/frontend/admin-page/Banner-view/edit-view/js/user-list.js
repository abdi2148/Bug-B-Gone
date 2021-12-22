
test();


async function test(){

const getAllUsers = await window.api.getAllUsers();

console.log(getAllUsers);

var table = document.getElementById("user-list-view");
table.innerHTML="";
   var tr = "";
getAllUsers.forEach(user=>{

   tr+=' <div class="projectName"name="ProjectName" type="button" value="placeholder">'+ user.name;
   tr+=' <a href="../edit-view/edit-user.html?userID = '+ user.id +'">'
   +' <input class="editBtn" onclick="execute('+ user.id +')" type="button" value="Edit"  >'
   +'<input class="deleteBtn" onclick="execute(document.getElementById('+ user.id +').value)" type="button" value="Delete" >'
   +' </a>';

   tr+='</div>';
})
table.innerHTML+=tr;

}
