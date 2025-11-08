// Main JavaScript for AssignmentPro Platform

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Get Started button
    const getStartedBtn = document.getElementById('getStartedBtn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            document.getElementById('signupBtn').click();
        });
    }

    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        updateUIForLoggedInUser(currentUser);
    }
});

// Update UI when user is logged in
function updateUIForLoggedInUser(user) {
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
        authButtons.innerHTML = `
            <div class="user-menu">
                <span>Welcome, ${user.name}</span>
                <div class="dropdown">
                    <button class="btn btn-outline">My Account <i class="fas fa-chevron-down"></i></button>
                    <div class="dropdown-content">
                        <a href="dashboard.html">Dashboard</a>
                        <a href="profile.html">Profile</a>
                        <a href="#" id="logoutBtn">Logout</a>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('logoutBtn').addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.reload();
        });
    }
}
