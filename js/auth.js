// Authentication functionality for AssignmentPro

document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    const authModal = document.getElementById('authModal');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const closeBtn = document.querySelector('.close');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // Open modal when login/signup buttons are clicked
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            authModal.style.display = 'block';
            switchTab('login');
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            authModal.style.display = 'block';
            switchTab('signup');
        });
    }

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            authModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === authModal) {
            authModal.style.display = 'none';
        }
    });

    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const userType = document.getElementById('userTypeLogin').value;
            
            if (authenticateUser(email, password, userType)) {
                authModal.style.display = 'none';
                window.location.href = userType === 'freelancer' ? 'freelancer-dashboard.html' : 'dashboard.html';
            } else {
                alert('Invalid credentials. Please try again.');
            }
        });
    }

    // Signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const userType = document.getElementById('userType').value;
            
            if (registerUser(name, email, password, userType)) {
                authModal.style.display = 'none';
                alert('Account created successfully! Please login.');
                switchTab('login');
            } else {
                alert('Email already exists. Please use a different email.');
            }
        });
    }
});

// Switch between login and signup tabs
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
}

// Authenticate user
function authenticateUser(email, password, userType) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password && u.userType === userType);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
    }
    return false;
}

// Register new user
function registerUser(name, email, password, userType) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
        return false;
    }
    
    // Create new user
    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        userType,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return true;
}
