import {updateDoc, getDoc, doc, deleteDoc, db, getDocs,  collection, addDoc , auth, signOut, onAuthStateChanged } from "../firebase.js";

let logout = document.getElementById('logout');

const assignment = {
    student_name: document.getElementById('student_name'),
    assignment_link: document.getElementById('assignment_link'),
    assignmentList: document.getElementById('assignmentList'),
    assignment_form_wrapper: document.getElementById('assignment_form_wrapper'),
    showData: document.getElementById('showData'),
}

assignment.assignment_form_wrapper.style.display = 'none';


const assignment_btns = {
    addAssignment_btn: document.getElementById('addAssignment_btn'),
    assignment_submit_btn: document.getElementById('assignment_submit_btn'),
    assignment_update_btn: document.getElementById('assignment_update_btn'),
}

assignment_btns.assignment_update_btn.style.display = 'none';


const loaders = {
    loader: document.getElementById('loader'),
    loader2: document.getElementById('loader2'),
    dataLoader: document.getElementById('dataLoader'),
}

loaders.loader2.style.display = 'none';
loaders.dataLoader.style.display = 'none';
loaders.loader.style.display = 'none';

let isEdit = null;
let warning = document.getElementById('warning');


// ========================== functionalities ==============================

assignment_btns.addAssignment_btn.addEventListener('click', function() {
    assignment.assignment_form_wrapper.style.display = 'flex';
    assignment.assignmentList.style.display = 'none';

    assignment.student_name.value = '';
    assignment.assignment_link.value = '';

    assignment_btns.assignment_submit_btn.style.display = 'block';
    assignment_btns.assignment_update_btn.style.display = 'none';
});




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




/*
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

assignment_submit_btn.addEventListener('click', addAssignment);
*/


const getAssignments = async() => {
    dataLoader.style.display = 'block';
    showData.innerHTML = '';

    try {
        const querySnapshot = await getDocs(collection(db, "assignments"));        

        if(querySnapshot.empty) {
            showData.innerHTML += `<div class='singleData'>Students assignment is not available!</div>`;
            
        }
        else {
            console.log('hello usama');
            
        }
        /*
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
        */

    } catch (error) {
        showData.innerHTML = error;
        // console.log(error);
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

    assignment_submit_btn.style.display = 'none';
    assignment_update_btn.style.display = 'block';

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

assignment_update_btn.addEventListener('click', async () => {
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