import {db, getDocs,  collection, addDoc , auth, signOut, onAuthStateChanged } from "../firebase.js";

let logout = document.getElementById('logout');
let assignmentsDashboard = document.getElementById('assignmentsDashboard');

let navigateAssignment = document.getElementById('navigateAssignment');
let heading = document.getElementById('heading');

let student_name = document.getElementById('student_name');
let assignment_link = document.getElementById('assignment_link');

let navigateDashboard = document.getElementById('navigateDashboard');

assignmentsDashboard.style.display = 'none';

let addLogo = document.getElementById('addLogo');
let assignmentForm = document.getElementById('assignmentForm');

let assignmentSubmit = document.getElementById('assignmentSubmit');

let showData = document.getElementById('showData');

assignmentForm.style.display = 'none';

let loader = document.getElementById('loader');
let submittext = document.getElementById('submittext');

loader.style.display = 'none';

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

const addAssignment = async() => {
    if(student_name.value !== '' && assignment_link !== '') {
        try {
            loader.style.display = 'block';
            submittext.innerText = '';
            
            const docRef = await addDoc(collection(db, "assignments"), {
              student_name: student_name.value,
              assignment_link: assignment_link.value,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            loader.style.display = 'none';
            submittext.innerText = 'Submit';

            console.error("Error adding document: ", e);
        }
        finally {
            loader.style.display = 'none';
            submittext.innerText = 'Submit';

            assignmentForm.style.display = 'none';
            assignmentList.style.display = 'block';

            student_name.value = '';
            assignment_link.value = '';
        }
    }
}

assignmentSubmit.addEventListener('click', addAssignment);


const getAssignments = async() => {
    const querySnapshot = await getDocs(collection(db, "assignments"));
    querySnapshot.forEach((doc) => {
        const { student_name, assignment_link } = doc.data();

        showData.innerHTML += `<strong>${student_name}</strong><br /><p>${assignment_link}</p>`;
        console.log(student_name, assignment_link);
        
        // console.log(`${doc.id} => ${doc.data()}`);
    });
}

getAssignments();