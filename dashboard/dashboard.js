import {updateDoc, getDoc, doc, deleteDoc, db, getDocs,  collection, addDoc , auth, signOut, onAuthStateChanged } from "../firebase.js";

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

let assignmentUpdate = document.getElementById('assignmentUpdate');

assignmentUpdate.style.display = 'none';

let loader2 = document.getElementById('loader2');

loader2.style.display = 'none';

let isEdit = null;


/*
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
*/


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

    student_name.value = '';
    assignment_link.value = '';

    assignmentSubmit.style.display = 'block';
    assignmentUpdate.style.display = 'none';
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
            // console.log("Document written with ID: ", docRef.id);
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
    dataLoader.style.display = 'block';
    showData.innerHTML = '';

    try {
        const querySnapshot = await getDocs(collection(db, "assignments"));

        if(querySnapshot.empty) {
            showData.innerHTML += `<div class='singleData'>Students assignment is not available!</div>`;
            
        }
        querySnapshot.forEach((doc) => {
            const { student_name, assignment_link } = doc.data();
            
            showData.innerHTML += `
            <div class='singleData'>
                <div class='single_data_header_wrapper'>
                    <div>
                        <span class="fa fa-user-o"></span> <strong>${student_name}</strong><br /><br />
                    </div>
                    <div>
                        <span class='fa fa-edit change' title='edit' 
                        onclick='editData("${doc.id}", this)'></span> <span 
                        class='fa fa-trash change' title='delete' 
                        onclick='deleteData("${doc.id}", this)'></span>
                    </div>
                </div>
                <span class="fa fa-external-link"></span> <a href=${assignment_link} target='_blank' class='anchor_inner_data'>${assignment_link}</a>
            </div>`;
            console.log(student_name, assignment_link);
            console.log(`${doc.id} => ${doc.data()}`);
        });
    } catch (error) {
        console.log(error);
        dataLoader.style.display = 'none';
        
    }
    finally {
        dataLoader.style.display = 'none';

    }
}



window.editData = async (id, e) => {
    // console.log('editData', id, e);
    assignment_form_wrapper.style.display = 'flex';
    assignmentList.style.display = 'none';

    assignmentSubmit.style.display = 'none';
    assignmentUpdate.style.display = 'block';

    try {
        let currentData = await getDoc(doc(db, "assignments", id));
        // console.log(currentData.data());

        student_name.value = currentData.data().student_name;
        assignment_link.value = currentData.data().assignment_link;
        isEdit = id;
        
        getAssignments();
        
    }
    catch(error) {
        console.log(error);
        
    }
    
}

assignmentUpdate.addEventListener('click', async () => {
    console.log('Updated!');

    assignment_form_wrapper.style.display = 'none';
    assignmentList.style.display = 'flex';

    try {
        await updateDoc(doc(db, "assignments", isEdit), {
            student_name: student_name.value,
            assignment_link: assignment_link.value
        });
        getAssignments();
        
    }
    catch(error) {
        console.log(error);
        
    }
    
})

window.deleteData = async (id, button) => {
    // console.log('deleteData', id, e);

    button.innerHTML = 'deleting...';

    try {
        await deleteDoc(doc(db, "assignments", id));
        getAssignments();
        
    }
    catch(error) {
        console.log(error);
        
    }
}

getAssignments();








// const editData = () => {
//     console.log('editData');
    
// }

// const deleteData = () => {
//     console.log('deleteData');
    
// }


// function editData() {
//     console.log('editData');
    
// }

// function deleteData() {
//     console.log('deleteData');
    
// }