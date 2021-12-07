
test();


async function test(){

const getAllBugs = await window.api.getAllBugs();

console.log(getAllBugs);

var table = document.getElementById("post_body");
table.innerHTML="";
var tr="";
getAllBugs.forEach(bug=>{

   tr+='<tr type="button" onclick="">';
   tr+='<td class="bugName" value="placeholder">'+ bug.name +'</td>'
   +'<td class="type" value="placeholder">'+ bug.id +'</td>'
   +'<td class="prioity" value="placeholder">'+ bug.desc +'</td>'
   +'<td class="short_description" value="placeholder">' + bug.desc + '</td>'
   +'<td class><a style="font-weight: 800;color: rgb(26, 43, 43);background: darkslategray;border-radius: 12px;text-decoration: none; border: 2px solid rgb(65, 109, 109);"href="../ticket-list-page/bug-details.html?bugId='+bug.id+'">See Details</a>';'</td>'
   
   tr+='</tr>';

})
table.innerHTML+=tr;

}
