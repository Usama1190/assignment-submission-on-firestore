import { auth, signOut, onAuthStateChanged } from "../firebase.js";

let logout = document.getElementById('logout');
let assignmentsDashboard = document.getElementById('assignmentsDashboard');

let navigateAssignment = document.getElementById('navigateAssignment');
let heading = document.getElementById('heading');

let navigateDashboard = document.getElementById('navigateDashboard');

assignmentsDashboard.style.display = 'none';

let addLogo = document.getElementById('addLogo');
let assignmentForm = document.getElementById('assignmentForm');

let assignmentSubmit = document.getElementById('assignmentSubmit');

let assignmentList = document.getElementById('assignmentList');

assignmentForm.style.display = 'none';

const Logout = () => {
    signOut(auth).then(() => {
        // Sign-out successful.

        Toastify({
            text: 'Logout Successfully!',
            duration: 3000
        }).showToast();

      }).catch((error) => {
        // An error happened.

        Toastify({
            text: error,
            duration: 3000
        }).showToast();

    });
}

logout.addEventListener('click', Logout);



onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = '../login/index.html';
    }
});

navigateAssignment.addEventListener('click', function() {
    assignmentsDashboard.style.display = 'block';
    heading.style.display = 'none';
});

navigateDashboard.addEventListener('click', function() {
    heading.style.display = 'block';
    assignmentsDashboard.style.display = 'none';
});


addLogo.addEventListener('click', function() {
    assignmentForm.style.display = 'block';
    assignmentList.style.display = 'none';
});

assignmentSubmit.addEventListener('click', function() {
    assignmentForm.style.display = 'none';
    assignmentList.style.display = 'block';

    let newAssignment = document.createElement('div');
    let newAssignmentContent = document.createTextNode('Hello, I"m New!');

    newAssignment.appendChild(newAssignmentContent);
    newAssignment.classList.add('newAssignment');
    assignmentList.appendChild(newAssignment);
});