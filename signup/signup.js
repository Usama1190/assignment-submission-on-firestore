import { auth, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup } from "../firebase.js";

let formField = document.querySelectorAll('form input');
const [ userName, userEmail, userPassword ] = formField;


const wrapper = {
    form: document.getElementById('form'),
    loader_wrapper: document.getElementById('loader_wrapper'),
    loader: document.getElementById('loader'),
}

const btns = {
    signup_btn: document.getElementById('signup_btn'),
    signup_with_google_btn: document.getElementById('signupWithGoogle'),
    side_div_inner_signin_btn: document.getElementById('side_div_inner_signin_btn'),
    confirm_password_btn: document.getElementById('confirmPasswrod'),
}

wrapper.loader_wrapper.style.zIndex = '-1';
wrapper.loader.style.display = 'none';


// ============================= Functionality ================================

btns.side_div_inner_signin_btn.addEventListener('click', () => {
    window.location.href = '../login/index.html';
});

const signUp = () => {
    event.preventDefault();
    loader.style.display = 'block';
    loader_wrapper.style.zIndex = '1';
    form.style.opacity = '0.3'; 
    
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

btns.signup_btn.addEventListener('click', signUp);

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

btns.signup_with_google_btn.addEventListener('click', signup_Google);

onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = '../dashboard/dashboard.html';
    }
});
