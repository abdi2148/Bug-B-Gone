const form = document.querySelector('#submitlogout');


form.addEventListener('submit', (event) => {
  event.preventDefault();

  let username =  form.elements['username'].value;
  let password = form.elements['password'].value;

  
  var objectToPass ={
      username: username,
      password: password
  }


  log_out(objectToPass);

});


async function log_out(data){

    const logout = await window.api.logout(data);
    
    console.log(logout);
    
}