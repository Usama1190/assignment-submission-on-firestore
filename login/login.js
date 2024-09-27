import { auth,  signInWithPopup , GoogleAuthProvider  ,  sendPasswordResetEmail  , signInWithEmailAndPassword, onAuthStateChanged } from "../firebase.js";

let formField = document.querySelectorAll('form input');

const [loginEmail, loginPassword] = formField;

let forgotPassword = document.getElementById('forgotPassword');

let warning = document.getElementById('warning');

let login_btn = document.getElementById('login_btn');

let logintext = document.getElementById('logintext');

const side_div_inner_login_btn = document.getElementById('side_div_inner_login_btn');

let loader2 = document.getElementById('loader2');
let loader_wrapper = document.getElementById('loader_wrapper');
loader_wrapper.style.zIndex = '-1';
loader2.style.display = 'none';


side_div_inner_login_btn.addEventListener('click', () => {
    window.location.href = '../signup/index.html';
})

let loginWithGoogle = document.getElementById('loginWithGoogle');

const login = () => {
    event.preventDefault();
    loader_wrapper.style.zIndex = '1';
    loader2.style.display = 'block';

    // logintext.innerText = '';

    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
    .then((userCredential) => {
        // Signed in 
        logintext.innerText = 'Login';
        loader_wrapper.style.zIndex = '-1';
        loader2.style.display = 'none';


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
        loader2.style.display = 'none';

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