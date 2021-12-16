function toggleSignIn(e) {
    e.preventDefault(); // prevent the default behaviour

    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPass').value;

    if (email.length < 1) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 1) {
        alert('Please enter a password.');
        return;
    }
    // Sign in with email and pass.
    firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {
   console.log(response);
  // do something when sign in is successful
}).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });

}