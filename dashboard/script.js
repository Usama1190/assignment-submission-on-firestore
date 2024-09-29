const dashboard_wrapper = {
    dashboard_front_page: document.getElementById('dashboard_front_page'),
    assignmentsDashboard: document.getElementById('assignmentsDashboard'),
    navigateDashboard: document.getElementById('navigateDashboard'),
    navigateAssignment: document.getElementById('navigateAssignment')
}

dashboard_wrapper.assignmentsDashboard.style.display = 'none';



// ============================ Functionalities ============================


dashboard_wrapper.navigateAssignment.addEventListener('click', function() {
    dashboard_wrapper.dashboard_front_page.style.display = 'none';
    dashboard_wrapper.assignmentsDashboard.style.display = 'block';
    dashboard_wrapper.navigateDashboard.classList.remove('navlink_active');
    dashboard_wrapper.navigateAssignment.classList.add('navlink_active');
});

dashboard_wrapper.navigateDashboard.addEventListener('click', function() {
    dashboard_wrapper.dashboard_front_page.style.display = 'flex';
    dashboard_wrapper.assignmentsDashboard.style.display = 'none';
    dashboard_wrapper.navigateDashboard.classList.add('navlink_active');
    dashboard_wrapper.navigateAssignment.classList.remove('navlink_active');
});
