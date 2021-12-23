loadList();
populateProjectDropdown();
var bugList;
var timer = 0;
const searchBox = document.getElementById('searchBoxInput');
searchBox.addEventListener('change', filterList);

const searchProject = document.getElementById("projectSearch");
searchProject.addEventListener('change', filterProjects);

function filterProjects(e){
   if(e.target.value != "all"){
      let proj = e.target.value;
   var filteredList = [];
   bugList.forEach(bug =>{
      text = bug.project.projid
      if(text == proj){
         filteredList.push(bug)
      }
   })
   }
   else{
      filteredList = bugList;
   }
   
   populateList(filteredList)
}

function filterList(e){
   let input = e.target.value;
   var filteredList = [];
   bugList.forEach(bug =>{
      text = bug.name.toLowerCase()
      if(text.includes(input)){
         filteredList.push(bug)
      }
   })
   populateList(filteredList)
}

async function loadList(){
   const allBugs = await window.api.getAllBugs();
   bugList = allBugs;
   populateList(allBugs);
   return allBugs;
}

async function populateProjectDropdown(){
   const projects = await window.api.getAllProjects();
   var select = document.getElementById("projectSearch");
   for(index in projects) {
   var proj = projects[index];
   select.options[select.options.length] = new Option(proj.name, proj.id);
}
}

function populateList(filteredBugs){
var table = document.getElementById("post_body");
table.innerHTML="";
var tr="";
filteredBugs.forEach(bug=>{
   tr+='<tr type="button" onclick="">';
   tr+='<td class="bugName" value="placeholder">'+ bug.name +'</td>'
   +'<td class="type" value="placeholder">'+ bug.type +'</td>'
   +'<td class="prioity" value="placeholder">'+ bug.priority +'</td>'
   +'<td class="short_description" style="white-space: nowrap; overflow:hidden " value="placeholder">' + bug.shortdesc + '</td>'
   +'<td class><a style="font-weight: 800;color: rgb(26, 43, 43);background: darkslategray;border-radius: 12px;     padding-right: 18px;padding-left: 18px;text-decoration: none; -webkit-app-region: no-drag; border: 2px solid rgb(65, 109, 109);"href="../ticket-list-page/bug-details.html?bugId='+bug.id+'">See Details</a>';'</td>'

   tr+='</tr>';

})
table.innerHTML+=tr;

}
