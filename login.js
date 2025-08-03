lucide.createIcons();

let users = {
    'user1@example.com': 'password123',
    'admin@example.com': 'adminpass'
};

// Login form submission
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('loginMessage');
    const errorMessage = document.getElementById('errorMessage');
    const modalOverlay = document.getElementById('modalOverlay');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMessage.textContent = 'Please enter a valid email address';
        errorMessage.style.display = 'block';
        loginMessage.style.display = 'none';
        return;
    }

    // Password validation
    if (password.length < 6) {
        errorMessage.textContent = 'Password must be at least 6 characters long';
        errorMessage.style.display = 'block';
        loginMessage.style.display = 'none';
        return;
    }

    // Authentication check
    if (users[email] && users[email] === password) {
        errorMessage.style.display = 'none';
        loginMessage.style.display = 'block';
        setTimeout(() => {
            closeLoginModal();
        }, 1000);
    } else {
        loginMessage.style.display = 'none';
        errorMessage.textContent = 'Invalid email or password. Please try again.';
        errorMessage.style.display = 'block';
    }
});

// Sign-up form submission
document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const signupMessage = document.getElementById('signupMessage');
    const errorMessage = document.getElementById('errorMessage');
    const modalOverlay = document.getElementById('modalOverlay');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMessage.textContent = 'Please enter a valid email address';
        errorMessage.style.display = 'block';
        signupMessage.style.display = 'none';
        return;
    }

    // Check if email already exists
    if (users[email]) {
        errorMessage.textContent = 'Email already registered. Please use a different email or log in.';
        errorMessage.style.display = 'block';
        signupMessage.style.display = 'none';
        return;
    }

    // Password validation
    if (password.length < 6) {
        errorMessage.textContent = 'Password must be at least 6 characters long';
        errorMessage.style.display = 'block';
        signupMessage.style.display = 'none';
        return;
    }

    // Confirm password match
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match';
        errorMessage.style.display = 'block';
        signupMessage.style.display = 'none';
        return;
    }

    // Successful signup
    users[email] = password;
    errorMessage.style.display = 'none';
    signupMessage.style.display = 'block';
    setTimeout(() => {
        closeSignupModal();
    }, 1000);
});

// Close login modal
function closeLoginModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    modalOverlay.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => {
        modalOverlay.style.display = 'none';
        window.location.href = 'homepage1.html';
    }, 300);
}

// Close sign-up modal
function closeSignupModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    modalOverlay.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => {
        modalOverlay.style.display = 'none';
        window.location.href = 'homepage1.html';
    }, 300);
}

// Close button functionality
function closeButton() {
    const modalOverlay = document.getElementById('modalOverlay');
    modalOverlay.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => {
        modalOverlay.style.display = 'none';
        window.location.href = 'homepage1.html';
    }, 300);
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);