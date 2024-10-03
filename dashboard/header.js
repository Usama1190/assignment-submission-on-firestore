const dashboard_wrapper = {
    dashboard_frontpage_wrapper: document.getElementById('dashboard_frontpage_wrapper'),
    class_assignments_wrapper: document.getElementById('class_assignments_wrapper'),
    myassignment_wrapper: document.getElementById('myassignment_wrapper'),
    newassignment_wrapper: document.getElementById('newassignment_wrapper'),
    dashboard_wrapper: document.getElementById('dashboard_wrapper'),
}


const dashboard_header = {
    navigate_dashboard: document.getElementById('navigate_dashboard'),
    navigate_classassignment: document.getElementById('navigate_classassignment'),
    navigate_newassignment: document.getElementById('navigate_newassignment'),
    navigate_myassignment: document.getElementById('navigate_myassignment'),
    navigate_newassignment_btn: document.getElementById('navigate_newassignment_btn'),
    navigate_myassignment_btn: document.getElementById('navigate_myassignment_btn'),
    profile_btn: document.getElementById('profile_btn'),
    theme_btn: document.getElementById('theme_btn'),
}

let theme_sun = true;

dashboard_wrapper.newassignment_wrapper.style.display = 'none';
dashboard_wrapper.myassignment_wrapper.style.display = 'none';
dashboard_wrapper.class_assignments_wrapper.style.display = 'none';



// ============================ Functionalities ============================

dashboard_header.theme_btn.addEventListener('click', () => {
    // theme_sun === true ? theme_sun = false: theme_sun = true;
    // theme_sun == false ? dashboard_header.theme_btn.classList.remove('fa-sun-o') : dashboard_header.theme_btn.classList.add('fa-sun-o');
    // theme_sun == true ? dashboard_header.theme_btn.classList.remove('fa-moon-o') : dashboard_header.theme_btn.classList.add('fa-moon-o');

    if(theme_sun === true) {
        theme_sun = false;
        dashboard_header.theme_btn.classList.remove('fa-moon-o');
        dashboard_header.theme_btn.classList.add('fa-sun-o');
        dashboard_wrapper.dashboard_wrapper.style.backgroundColor = '#021526';
    }
    else if(theme_sun === false) {
        theme_sun = true;
        dashboard_header.theme_btn.classList.remove('fa-sun-o');
        dashboard_header.theme_btn.classList.add('fa-moon-o');
        dashboard_wrapper.dashboard_wrapper.style.backgroundColor = '#ffffff';
    }
});



dashboard_header.navigate_classassignment.addEventListener('click', function() {
    dashboard_wrapper.dashboard_frontpage_wrapper.style.display = 'none';
    dashboard_wrapper.class_assignments_wrapper.style.display = 'block';
    dashboard_wrapper.newassignment_wrapper.style.display = 'none';
    dashboard_wrapper.myassignment_wrapper.style.display = 'none';

    dashboard_header.navigate_dashboard.classList.remove('navlink_active');
    dashboard_header.navigate_classassignment.classList.add('navlink_active');
    dashboard_header.navigate_myassignment.classList.remove('navlink_active');
    dashboard_header.navigate_newassignment.classList.remove('navlink_active');

    dashboard_header.navigate_dashboard.classList.remove('b_bottom');
    dashboard_header.navigate_classassignment.classList.add('b_bottom');
    dashboard_header.navigate_myassignment.classList.remove('b_bottom');
    dashboard_header.navigate_newassignment.classList.remove('b_bottom');
});


dashboard_header.navigate_dashboard.addEventListener('click', function() {
    dashboard_wrapper.dashboard_frontpage_wrapper.style.display = 'flex';
    dashboard_wrapper.class_assignments_wrapper.style.display = 'none';
    dashboard_wrapper.newassignment_wrapper.style.display = 'none';
    dashboard_wrapper.myassignment_wrapper.style.display = 'none';

    dashboard_header.navigate_dashboard.classList.add('navlink_active');
    dashboard_header.navigate_classassignment.classList.remove('navlink_active');
    dashboard_header.navigate_myassignment.classList.remove('navlink_active');
    dashboard_header.navigate_newassignment.classList.remove('navlink_active');

    dashboard_header.navigate_dashboard.classList.add('b_bottom');
    dashboard_header.navigate_classassignment.classList.remove('b_bottom');
    dashboard_header.navigate_myassignment.classList.remove('b_bottom');
    dashboard_header.navigate_newassignment.classList.remove('b_bottom');
});

const navigate_myassignment_func = () => {
    dashboard_wrapper.dashboard_frontpage_wrapper.style.display = 'none';
    dashboard_wrapper.myassignment_wrapper.style.display = 'block';
    dashboard_wrapper.class_assignments_wrapper.style.display = 'none';
    dashboard_wrapper.newassignment_wrapper.style.display = 'none';

    dashboard_header.navigate_dashboard.classList.remove('navlink_active');
    dashboard_header.navigate_classassignment.classList.remove('navlink_active');
    dashboard_header.navigate_myassignment.classList.add('navlink_active');
    dashboard_header.navigate_newassignment.classList.remove('navlink_active');

    dashboard_header.navigate_dashboard.classList.remove('b_bottom');
    dashboard_header.navigate_classassignment.classList.remove('b_bottom');
    dashboard_header.navigate_myassignment.classList.add('b_bottom');
    dashboard_header.navigate_newassignment.classList.remove('b_bottom');
}

const navigate_newassignment_func = () => {
    dashboard_wrapper.dashboard_frontpage_wrapper.style.display = 'none';
    dashboard_wrapper.myassignment_wrapper.style.display = 'none';
    dashboard_wrapper.class_assignments_wrapper.style.display = 'none';
    dashboard_wrapper.newassignment_wrapper.style.display = 'block';

    dashboard_header.navigate_dashboard.classList.remove('navlink_active');
    dashboard_header.navigate_classassignment.classList.remove('navlink_active');
    dashboard_header.navigate_myassignment.classList.remove('navlink_active');
    dashboard_header.navigate_newassignment.classList.add('navlink_active');

    dashboard_header.navigate_dashboard.classList.remove('b_bottom');
    dashboard_header.navigate_classassignment.classList.remove('b_bottom');
    dashboard_header.navigate_myassignment.classList.remove('b_bottom');
    dashboard_header.navigate_newassignment.classList.add('b_bottom');
}


dashboard_header.navigate_myassignment.addEventListener('click', navigate_myassignment_func);
dashboard_header.navigate_newassignment.addEventListener('click', navigate_newassignment_func);
dashboard_header.navigate_myassignment_btn.addEventListener('click', navigate_myassignment_func);
dashboard_header.navigate_newassignment_btn.addEventListener('click', navigate_newassignment_func);
dashboard_header.profile_btn.addEventListener('click', navigate_myassignment_func);
