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
    user_icon_btn: document.getElementById('user_icon_btn'),
    close_form_btn: document.getElementById('close_form_btn')
}

assignment_btns.assignment_update_btn.style.display = 'none';


const loaders = {
    loader2: document.getElementById('loader2'),
    loader: document.getElementById('loader'),
}

const todayDate = {
    date: (new Date).getDate(),
    month: (new Date).getMonth() + 1,
    year: (new Date().getFullYear())
}

let month = todayDate.month;

switch (month) {
    case 1:
        month = 'Jan';
        break;
    case 2:
        month = 'Feb';
        break;
    case 3:
        month = 'Mar';
        break;
    case 4:
        month = 'Apr';
        break;
    case 5:
        month = 'May';
        break;
    case 6:
        month = 'Jun';
        break;
    case 7:
        month = 'Jul';
        break;
    case 8:
        month = 'Aug';
        break;
    case 9:
        month = 'Sep';
        break;
    case 10:
        month = 'Oct';
        break;
    case 11:
        month = 'Nov';
        break;
    case 12:
        month = 'Dec';
        break;

    default:
        month === 'Qayamat';        
        break;
}

const date = `${month} ${todayDate.date}, ${todayDate.year}`;

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



const addAssignment = async() => {
    if(assignment.student_name.value !== '' && assignment.assignment_link !== '') {
        warning.innerText = '';
        assignment_btns.assignment_submit_btn.innerText = 'Loading...';
        assignment_btns.assignment_update_btn.innerText = 'Loading...';
        try {            
            const docRef = await addDoc(collection(db, "assignments"), {
              student_name: assignment.student_name.value,
              assignment_link: assignment.assignment_link.value,
              date: date,
            });
            // console.log("Document written with ID: ", docRef.id);
            assignment_btns.assignment_submit_btn.innerText = 'Submit';
            assignment_btns.assignment_update_btn.innerText = 'Save changes';

            getAssignments();

        } catch (e) {
            console.error("Error adding document: ", e);

        }
        finally {
            assignment.assignment_form_wrapper.style.display = 'none';
            assignment.assignmentList.style.display = 'flex';
            assignment_btns.assignment_submit_btn.innerText = 'Submit';
            assignment_btns.assignment_update_btn.innerText = 'Save changes';

            assignment.student_name.value = '';
            assignment.assignment_link.value = '';
        }
    }
    else {
        warning.innerText = 'Invalid input fields';
    }
}

assignment_btns.assignment_submit_btn.addEventListener('click', addAssignment);



const getAssignments = async() => {
    loaders.loader.style.display = 'block';
    assignment.showData.innerHTML = '';    
    
    try {
        const querySnapshot = await getDocs(collection(db, "assignments"));                
        
        if(querySnapshot.empty) {
            assignment.showData.innerHTML += `<div class='singleData'>Students assignment is not available!</div>`;
            
        }
        
        querySnapshot.forEach((doc) => {
            const { student_name, assignment_link, date } = doc.data();
            
        
            assignment.showData.innerHTML += `
            <div class='singleData'>
                <div class='single_data_header_wrapper color_dark'>
                    <div>
                        <span class="fa fa-user-o"></span> <strong>${student_name}</strong> <small>${date}</small><br /><br />
                    </div>
                    <div>
                        <span class='fa fa-edit change' title='edit' 
                        onclick='editData("${doc.id}", this)'></span> <span 
                        class='fa fa-trash change' title='delete' 
                        onclick='deleteData("${doc.id}", this)'></span>
                    </div>
                </div>
                <div class='color_dark'>
                    <span class="fa fa-external-link"></span> <a href=${assignment_link} target='_blank' class='anchor_inner_data'>${assignment_link}</a>
                </div>
            </div>`;
        });

        
    } 
    catch (error) {
        assignment.showData.innerHTML = error;
        // console.log(error);
        loaders.loader.style.display = 'none';
        
    }
    finally {
        loaders.loader.style.display = 'none';

    }

}

assignment_btns.close_form_btn.addEventListener('click', () => {
    assignment.assignment_form_wrapper.style.display = 'none';
    assignment.assignmentList.style.display = 'flex';
})

getAssignments();



window.editData = async (id, e) => {
    // console.log('editData', id, e);
    assignment.assignment_form_wrapper.style.display = 'flex';
    assignment.assignmentList.style.display = 'none';

    assignment_btns.assignment_submit_btn.style.display = 'none';
    assignment_btns.assignment_update_btn.style.display = 'block';

    try {
        let currentData = await getDoc(doc(db, "assignments", id));
        // console.log(currentData.data());

        assignment.student_name.value = currentData.data().student_name;
        assignment.assignment_link.value = currentData.data().assignment_link;
        isEdit = id;
        
        getAssignments();
        
    }
    catch(error) {
        console.log(error);
        
    }
    
}

assignment_btns.assignment_update_btn.addEventListener('click', async () => {
    console.log('Updated!');

    assignment.assignment_form_wrapper.style.display = 'none';
    assignment.assignmentList.style.display = 'flex';

    try {
        await updateDoc(doc(db, "assignments", isEdit), {
            student_name: assignment.student_name.value,
            assignment_link: assignment.assignment_link.value
        });
        getAssignments();
    }
    catch(error) {
        console.log(error);
        
    }
});

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










/*
const editData = () => {
    console.log('editData');
    
}

const deleteData = () => {
    console.log('deleteData');
    
}


function editData() {
    console.log('editData');
    
}

function deleteData() {
    console.log('deleteData');
    
}
*/