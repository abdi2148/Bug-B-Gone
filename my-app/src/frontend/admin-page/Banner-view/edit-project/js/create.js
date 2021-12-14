const form = document.querySelector('#signup');

const name = form.elements['name'];
const desc = form.elements['desc'];

form.addEventListener('submit', (event) => {
    event.preventDefault();

let name =  form.elements['name'].value;
let desc = form.elements['desc'].value;



var objectToPass ={
    name: name,
    desc: desc
}

sendProject(objectToPass)

});

async function sendProject(data){

    const project = await window.api.createProject(data);
    
    console.log(project);
}