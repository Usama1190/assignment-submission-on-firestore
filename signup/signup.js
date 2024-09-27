import { auth, createUserWithEmailAndPassword, onAuthStateChanged } from "../firebase.js";

let formField = document.querySelectorAll('form input');
const [userName, userEmail, userPassword ] = formField;

let signup_btn = document.getElementById('signup_btn');
let signuptext = document.getElementById('signuptext');

let form = document.getElementById('form');
let loader2 = document.getElementById('loader2');
let loader_wrapper = document.getElementById('loader_wrapper');
loader_wrapper.style.zIndex = '-1';
loader2.style.display = 'none';

const side_div_inner_signin_btn = document.getElementById('side_div_inner_signin_btn');

let confirmPasswrod = document.getElementById('confirmPasswrod');
// let userName = document.getElementById('userName');
// console.log(userName);

side_div_inner_signin_btn.addEventListener('click', () => {
    window.location.href = '../login/index.html';
});



const signUp = () => {
    event.preventDefault();
    signuptext.innerText = '';
    loader2.style.display = 'block';
    loader_wrapper.style.zIndex = '1';
    form.style.opacity = '0.3';

    console.log(userName.value, 'userName');
    

    if(userName.value !== '' && userPassword.value === confirmPasswrod.value) {
        createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value)
        .then((userCredential) => {
            signuptext.innerText = 'Signup';
            loader2.style.display = 'none';
            loader_wrapper.style.zIndex = '-1';
            form.style.opacity = '';

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
            loader2.style.display = 'none';
            loader_wrapper.style.zIndex = '-1';
            form.style.opacity = '1';


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
        loader2.style.display = 'none';
        loader_wrapper.style.zIndex = '-1';
        form.style.opacity = '1';
    }
}



signup_btn.addEventListener('click', signUp);


onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = '../dashboard/dashboard.html';
    }
});


// sdfdfdfs