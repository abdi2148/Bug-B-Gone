const form = document.querySelector('#signup');

const name = form.elements['name'];
const desc = form.elements['desc'];
const shortdesc = form.elements['shortdesc'];
const type = form.elements['type'];
const priority = form.elements['priority'];
const status = form.elements['status'];

form.addEventListener('submit', (event) => {
    event.preventDefault();

let name =  form.elements['name'].value;
let desc = form.elements['desc'].value;
let shortdesc = form.elements['shortdesc'].value;
var prioritySelect = document.getElementById('priority');
var priority = prioritySelect.options[prioritySelect.selectedIndex].value;
var typeSelect = document.getElementById('type');
var type = typeSelect.options[typeSelect.selectedIndex].value;
console.log(name, desc, shortdesc, priority, type);
});