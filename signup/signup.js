import { auth, createUserWithEmailAndPassword, onAuthStateChanged } from "../firebase.js";


let formField = document.querySelectorAll('form input');

const [ userEmail, userPassword ] = formField;

let signup_btn = document.getElementById('signup_btn');

let loader = document.getElementById('loader');

let signuptext = document.getElementById('signuptext');

loader.style.display = 'none';

const signUp = () => {
    event.preventDefault();
    signuptext.innerText = '';
    loader.style.display = 'block';

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

signup_btn.addEventListener('click', signUp);


onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = '../dashboard/dashboard.html';
    }
});


// sdfdfdfs