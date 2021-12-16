const form = document.querySelector('#submitlogin');


form.addEventListener('submit', (event) => {
  event.preventDefault();

  let username =  form.elements['username'].value;
  let password = form.elements['password'].value;

  
  var objectToPass ={
      username: username,
      password: password
  }


  signIn(objectToPass);

});


async function signIn(data){

    const login = await window.api.login(data);
    
    console.log(login);
    
}