import { auth, createUserWithEmailAndPassword, onAuthStateChanged } from "../firebase.js";

let formField = document.querySelectorAll('form input');
const [userName, userEmail, userPassword ] = formField;

let signup_btn = document.getElementById('signup_btn');
let signuptext = document.getElementById('signuptext');
let loader = document.getElementById('loader');
loader.style.display = 'none';
let confirmPasswrod = document.getElementById('confirmPasswrod');
// let userName = document.getElementById('userName');

console.log(userName);



const signUp = () => {
    event.preventDefault();
    signuptext.innerText = '';
    loader.style.display = 'block';

    console.log(userName.value, 'userName');
    

    if(userName.value !== '' && userPassword.value === confirmPasswrod.value) {
        createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value)
        .then((userCredential) => {
            signuptext.innerText = 'Signup';
            loader.style.display = 'none';

            const user = userCredential.user;

            warning.innerText = '';

            Toastify({
                text: 'Signup Successfully!',
                duration: 3000
            }).showToast();
            
            // ...
        })
        .catch((error) => {
            signuptext.innerText = 'Signup';
            loader.style.display = 'none';

            const errorCode = error.code;
            const errorMessage = error.message;

            warning.innerText = 'invalid input field!';

            Toastify({
                text: `${errorMessage}`,
                duration: 3000
            }).showToast();
            
            // ..
        });
    }
    else {
        warning.innerText = "Input fields is not valid!";
        signuptext.innerText = 'Signup';
        loader.style.display = 'none';
    }
}



signup_btn.addEventListener('click', signUp);


onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = '../dashboard/dashboard.html';
    }
});


// sdfdfdfs