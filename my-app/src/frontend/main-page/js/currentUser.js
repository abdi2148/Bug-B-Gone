const user = firebase.auth().currentUser;

if (user) {
  // User is signed in, see docs for a list of available properties
  // https://firebase.google.com/docs/reference/js/firebase.User
  // ...
} else {
  // No user is signed in.
}


    const getUserWithID = await window.api.getUserWithID(data);
    
    console.log(getUserWithID);