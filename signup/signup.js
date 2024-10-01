import { auth, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup } from "../firebase.js";

let formField = document.querySelectorAll('form input');
const [userName, userEmail, userPassword ] = formField;

let signup_btn = document.getElementById('signup_btn');
let signupWithGoogle = document.getElementById('signupWithGoogle');

let form = document.getElementById('form');
let loader = document.getElementById('loader');
let loader_wrapper = document.getElementById('loader_wrapper');
loader_wrapper.style.zIndex = '-1';
loader.style.display = 'none';

const side_div_inner_signin_btn = document.getElementById('side_div_inner_signin_btn');

let confirmPasswrod = document.getElementById('confirmPasswrod');

side_div_inner_signin_btn.addEventListener('click', () => {
    window.location.href = '../login/index.html';
});

console.log(userName.value, 'userName1');



const signUp = () => {
    event.preventDefault();
    loader.style.display = 'block';
    loader_wrapper.style.zIndex = '1';
    form.style.opacity = '0.3';    
    
    console.log(userName.value, 'userName2');

    if(userName.value !== '' && userPassword.value === confirmPasswrod.value) {
        createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value)
        .then((userCredential) => {
            loader.style.display = 'none';
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
            loader.style.display = 'none';
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
        warning.innerText = "input fields is not valid!";
        loader.style.display = 'none';
        loader_wrapper.style.zIndex = '-1';
        form.style.opacity = '1';
    }
}



signup_btn.addEventListener('click', signUp);



const provider = new GoogleAuthProvider();

const signup_Google = () => {
    loader_wrapper.style.zIndex = '1';
    loader.style.display = 'block';
    form.style.opacity = '0.3';

    signInWithPopup(auth, provider)
    .then((result) => {
        loader_wrapper.style.zIndex = '-1';
        loader.style.display = 'none';
        form.style.opacity = '1';

        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        
    }).catch((error) => {
        loader_wrapper.style.zIndex = '-1';
        loader.style.display = 'none';
        form.style.opacity = '1';

        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorMessage);
    });
    
}

signupWithGoogle.addEventListener('click', signup_Google);



onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = '../dashboard/dashboard.html';
    }
});

export {userEmail};