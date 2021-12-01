
test();


async function test(){

const getAllBugs = await window.api.send();

console.log(getAllBugs);

var table = document.getElementById("table-data");
table.innerHTML="";
var tr="";
getAllBugs.forEach(x=>{
   tr+='<tr>';
   tr+='<td>'+x.id+'</td>'+'<td>'+x.name+'</td>'+'<td>'+x.desc+'</td>'
   tr+='</tr>'

})
table.innerHTML+=tr;

//document.getElementById("something").innerHTML += (i+1) + ": " + array[i];

}
