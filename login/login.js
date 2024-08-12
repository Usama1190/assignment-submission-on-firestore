import { auth,  signInWithPopup , GoogleAuthProvider  ,  sendPasswordResetEmail  , signInWithEmailAndPassword, onAuthStateChanged } from "../firebase.js";

let formField = document.querySelectorAll('form input');

const [loginEmail, loginPassword] = formField;

let forgotPassword = document.getElementById('forgotPassword');

let warning = document.getElementById('warning');

let login_btn = document.getElementById('login_btn');

let loader = document.getElementById('loader');

let logintext = document.getElementById('logintext');

loader.style.display = 'none';


let loginWithGoogle = document.getElementById('loginWithGoogle');

const login = () => {
    event.preventDefault();

    logintext.innerText = '';
    loader.style.display = 'block';

    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
    .then((userCredential) => {
        // Signed in 
        logintext.innerText = 'Login';
        loader.style.display = 'none';


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
        logintext.innerText = 'Login';
        loader.style.display = 'none';

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
    sendPasswordResetEmail(auth, loginEmail.value)
    .then(() => {
        warning.innerText = 'Password send check email';
        Toastify({
            text: 'Password send check email',
            duration: 3000
        }).showToast();
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

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
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        
    }).catch((error) => {
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