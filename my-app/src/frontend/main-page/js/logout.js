const form = document.querySelector('#submitlogout');


async function signOut(data){

    const logout = await window.api.logout(data);
    
    console.log(logout);
    
}