import { auth,  signInWithPopup , GoogleAuthProvider  ,  sendPasswordResetEmail  , signInWithEmailAndPassword, onAuthStateChanged } from "../firebase.js";

let formField = document.querySelectorAll('form input');

const [loginEmail, loginPassword] = formField;

let forgotPassword = document.getElementById('forgotPassword');

let warning = document.getElementById('warning');

let login_btn = document.getElementById('login_btn');

let form = document.getElementById('form');
form.style.opacity = '1';

const side_div_inner_login_btn = document.getElementById('side_div_inner_login_btn');

let loader = document.getElementById('loader');
let loader_wrapper = document.getElementById('loader_wrapper');
loader_wrapper.style.zIndex = '-1';
loader.style.display = 'none';


side_div_inner_login_btn.addEventListener('click', () => {
    window.location.href = '../signup/index.html';
})

let loginWithGoogle = document.getElementById('loginWithGoogle');

const login = () => {
    event.preventDefault();
    loader_wrapper.style.zIndex = '1';
    loader.style.display = 'block';
    form.style.opacity = '0.3';

    // logintext.innerText = '';

    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
    .then((userCredential) => {
        // Signed in 
        loader_wrapper.style.zIndex = '-1';
        loader.style.display = 'none';
        form.style.opacity = '1';


        const user = userCredential.user;
        console.log(user);
        
        // ...
        warning.innerText = '';

        Toastify({
            text: 'Login Successfully!',
            duration: 3000
        }).showToast();
    })
    .catch((error) => {
        // logintext.innerText = 'Login';
        loader_wrapper.style.zIndex = '-1';
        loader.style.display = 'none';
        form.style.opacity = '1';

        const errorCode = error.code;
        const errorMessage = error.message;

        warning.innerText = 'invalid input field';

        Toastify({
            text: `${errorMessage}`,
            duration: 3000
        }).showToast();
    });

    
}

login_btn.addEventListener('click', login);



const forgotPass = () => {
    loader_wrapper.style.zIndex = '1';
    loader.style.display = 'block';
    form.style.opacity = '0.3';

    sendPasswordResetEmail(auth, loginEmail.value)
    .then(() => {
        warning.innerText = 'Password send check email';
        loader_wrapper.style.zIndex = '-1';
        loader.style.display = 'none';
        form.style.opacity = '1';

        Toastify({
            text: 'Password send check email',
            duration: 3000
        }).showToast();
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        loader_wrapper.style.zIndex = '-1';
        loader.style.display = 'none';
        form.style.opacity = '1';

        warning.innerText = 'Something went wrong!';
        Toastify({
            text: `${errorMessage}`,
            duration: 3000
        }).showToast();
    });
};

forgotPassword.addEventListener('click', forgotPass);


const provider = new GoogleAuthProvider();

const loginGoogle = () => {
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

loginWithGoogle.addEventListener('click', loginGoogle);


onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = '../dashboard/dashboard.html';
    }
});