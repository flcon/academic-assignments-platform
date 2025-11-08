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
                status: 'pending',
                createdAt: new Date().toISOString(),
                clientId: currentUser.id
            };
            
            // Save order to localStorage
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));
            
            alert('Order placed successfully! Our writers will start bidding on your assignment.');
            newOrderModal.style.display = 'none';
            newOrderForm.reset();
            
            // Redirect to order management page
            setTimeout(() => {
                window.location.href = 'order-management.html';
            }, 1000);
        });
    }
});
