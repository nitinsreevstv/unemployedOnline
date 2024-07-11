// Toggle menu handling
var menuToggle = document.getElementById('menu-toggle');
var menuIcon = document.querySelector('.menu-icon');
// when scroll, hide the open item in the menu
window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        menuToggle.checked = false; // Hide the toggle if scrolled more than 50px
    }
});

// footer subscription submission
const emailInput = document.getElementById('footer-email');
const submitButton = document.getElementById('footer-submit');
const errorIcon = document.getElementById('email-error-icon');

// Function to validate email format
function isValidEmail(email) {
    // Regular expression for basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Function to handle input change
function handleInputChange() {
    const email = emailInput.value.trim(); // Trim whitespace
    if (isValidEmail(email)) {
        submitButton.removeAttribute('disabled'); // Enable submit button
        emailInput.classList.remove('error'); // Remove error class
        errorIcon.style.display = 'none'; // Hide error icon
    } else {
        submitButton.setAttribute('disabled', true); // Disable submit button
        emailInput.classList.add('error'); // Add error class to input
        errorIcon.style.display = 'inline-block'; // Display error icon
    }
}
emailInput.addEventListener('input', handleInputChange);
// footer subscribe js ended 



// login js
document.addEventListener('DOMContentLoaded', function() {
    const emailField = document.querySelector('input[type="email"][placeholder="Enter email address"]');
    const passwordField = document.querySelector('input[type="password"][placeholder="Password"]');
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.addEventListener('click', function(event) {
        event.preventDefault();
        let isValid = true;
        if (!isValidEmail(emailField.value.trim())) {
            markAsInvalid(emailField);
            isValid = false;
        } else {
            markAsValid(emailField);
        }
        if (!isValidPassword(passwordField.value)) {
            markAsInvalid(passwordField);
            isValid = false;
        } else {
            markAsValid(passwordField);
        }
        if (isValid) {
            window.location.href = '../index.html';
        }
    });
    function markAsInvalid(field, errorMessage) {
        field.classList.add('invalid-input');
        const errorElement = document.createElement('div');
        errorElement.classList.add('error-message');
        errorElement.innerText = errorMessage;
        const existingError = field.parentElement.querySelector('.error-message');
        if (!existingError) {
            field.parentElement.appendChild(errorElement);
        }
    }
    function markAsValid(field) {
        field.classList.remove('invalid-input');
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    function isValidPassword(password) {
        return password.trim().length >= 8;
    }
});
