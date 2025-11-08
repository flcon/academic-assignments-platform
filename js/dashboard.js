// Dashboard functionality

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in and is a client
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.userType !== 'client') {
        window.location.href = 'index.html';
        return;
    }

    // New Order Modal
    const newOrderBtn = document.getElementById('newOrderBtn');
    const newOrderModal = document.getElementById('newOrderModal');
    const newOrderClose = newOrderModal.querySelector('.close');
    const newOrderForm = document.getElementById('newOrderForm');

    if (newOrderBtn) {
        newOrderBtn.addEventListener('click', function() {
            newOrderModal.style.display = 'block';
        });
    }

    if (newOrderClose) {
        newOrderClose.addEventListener('click', function() {
            newOrderModal.style.display = 'none';
        });
    }

    window.addEventListener('click', function(event) {
        if (event.target === newOrderModal) {
            newOrderModal.style.display = 'none';
        }
    });

    // New Order Form Submission
    if (newOrderForm) {
        newOrderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const order = {
                id: 'ORD-' + Date.now(),
                title: document.getElementById('orderTitle').value,
                subject: document.getElementById('orderSubject').value,
                deadline: document.getElementById('orderDeadline').value,
                pages: document.getElementById('orderPages').value,
                description: document.getElementById('orderDescription').value,
