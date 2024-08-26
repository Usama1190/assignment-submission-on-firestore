import {db, getDocs,  collection, addDoc , auth, signOut, onAuthStateChanged } from "../firebase.js";

let logout = document.getElementById('logout');
let assignmentsDashboard = document.getElementById('assignmentsDashboard');

let navigateAssignment = document.getElementById('navigateAssignment');
let heading = document.getElementById('heading');

let student_name = document.getElementById('student_name');
let assignment_link = document.getElementById('assignment_link');

let navigateDashboard = document.getElementById('navigateDashboard');

let assignmentList = document.getElementById('assignmentList');

assignmentsDashboard.style.display = 'none';

let addLogo = document.getElementById('addLogo');
let assignment_form_wrapper = document.getElementById('assignment_form_wrapper');

let assignmentSubmit = document.getElementById('assignmentSubmit');

let showData = document.getElementById('showData');

assignment_form_wrapper.style.display = 'none';

let loader = document.getElementById('loader');
let submittext = document.getElementById('submittext');

let warning = document.getElementById('warning');

let dataLoader = document.getElementById('dataLoader');

dataLoader.style.display = 'none';

loader.style.display = 'none';

let dashboard_front_page = document.getElementById('dashboard_front_page')


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
    dashboard_front_page.style.display = 'none';
    assignmentsDashboard.style.display = 'block';
    navigateDashboard.classList.remove('navlink_active');
    navigateAssignment.classList.add('navlink_active');
});

navigateDashboard.addEventListener('click', function() {
    dashboard_front_page.style.display = 'flex';
    assignmentsDashboard.style.display = 'none';
    navigateDashboard.classList.add('navlink_active');
    navigateAssignment.classList.remove('navlink_active');
});


addLogo.addEventListener('click', function() {
    assignment_form_wrapper.style.display = 'flex';
    assignmentList.style.display = 'none';
});

const addAssignment = async() => {
    if(student_name.value !== '' && assignment_link !== '') {
        warning.innerText = '';
        try {
            loader.style.display = 'block';
            submittext.innerText = '';
            
            const docRef = await addDoc(collection(db, "assignments"), {
              student_name: student_name.value,
              assignment_link: assignment_link.value,
            });
            console.log("Document written with ID: ", docRef.id);
            getAssignments();

        } catch (e) {
            loader.style.display = 'none';
            submittext.innerText = 'Submit';

            console.error("Error adding document: ", e);
        }
        finally {
            loader.style.display = 'none';
            submittext.innerText = 'Submit';

            assignment_form_wrapper.style.display = 'none';
            assignmentList.style.display = 'flex';

            student_name.value = '';
            assignment_link.value = '';
        }
    }
    else {
        warning.innerText = 'Invalid input fields';
    }
}

assignmentSubmit.addEventListener('click', addAssignment);


const getAssignments = async() => {
    // dataLoader.style.display = 'block';
    
    try {
        const querySnapshot = await getDocs(collection(db, "assignments"));
        showData.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const { student_name, assignment_link } = doc.data();
            
            showData.innerHTML += `<span class="fa fa-user"></span> <strong>${student_name}</strong><br /><br /><span class="fa fa-external-link"></span> <a href=${assignment_link} target='_blank'>${assignment_link}</a><br /><br /><br />`;
            // console.log(student_name, assignment_link);
        
            // console.log(`${doc.id} => ${doc.data()}`);
        });
    } catch (error) {
        console.log(error);
        dataLoader.style.display = 'none';
        
    }
    finally {
        dataLoader.style.display = 'none';

    }
}

getAssignments();
