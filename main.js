// Function to switch between pages
const navigate = (targetViewId) => {
    // Get all pages and hide them first
    const views = document.querySelectorAll('.view-section');
    views.forEach(view => {
        view.classList.add('hidden');
        view.classList.remove('flex', 'flex-col');
    });

    // Find the page we want to open and show it
    const activeView = document.getElementById(targetViewId);
    if (activeView) {
        activeView.classList.remove('hidden');
        
        // The store page needs 'flex-col' to look right
        if (targetViewId === 'view-store') {
            activeView.classList.add('flex', 'flex-col');
        } else {
            activeView.classList.add('flex');
        }
    }
};

// Function to log out and clear the form
const logout = () => {
    document.getElementById('authForm').reset(); // Clear all inputs
    navigate('view-welcome'); // Go back to the first page
};

// Function to show or hide the red error messages
const toggleError = (fieldId, isInvalid) => {
    const errNode = document.getElementById(`err-${fieldId}`);
    if (isInvalid) {
        errNode.classList.remove('hidden');
        errNode.classList.add('block'); // Show error
    } else {
        errNode.classList.add('hidden'); // Hide error
        errNode.classList.remove('block');
    }
};

// When the user clicks the submit button
const handleAuthSubmit = (e) => {
    e.preventDefault(); // Stop the page from reloading

    // Get the values the user typed in the form
    const payload = {
        username: document.getElementById('username').value.trim(),
        email: document.getElementById('email').value.trim(),
        pwd: document.getElementById('password').value,
        confirmPwd: document.getElementById('confirmPwd').value
    };

    let isValid = true; // We assume the data is correct until we find a mistake

    // 1. Check username (must be 5 to 15 characters)
    const isUserInvalid = payload.username.length < 5 || payload.username.length > 15;
    toggleError('username', isUserInvalid);
    if (isUserInvalid) isValid = false;

    // 2. Check email (must not be empty and must have @)
    const isEmailInvalid = !payload.email || !payload.email.includes('@');
    toggleError('email', isEmailInvalid);
    if (isEmailInvalid) isValid = false;

    // 3. Check password using Regex (at least 8 chars, letters and numbers)
    const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const isPwdInvalid = !pwdRegex.test(payload.pwd);
    toggleError('password', isPwdInvalid);
    if (isPwdInvalid) isValid = false;

    // 4. Check if confirm password matches the first password
    const isConfirmInvalid = !payload.confirmPwd || payload.confirmPwd !== payload.pwd;
    toggleError('confirmPwd', isConfirmInvalid);
    if (isConfirmInvalid) isValid = false;

    // If there are no errors, log the user in
    if (isValid) {
        document.getElementById('user-display').textContent = payload.username; // Show username in the store
        navigate('view-store'); // Open store page
    }
};

// Wait for the HTML to load before listening to the form
document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('authForm');
    if (authForm) {
        authForm.addEventListener('submit', handleAuthSubmit);
    }
});