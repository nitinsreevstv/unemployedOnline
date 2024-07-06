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

// Add event listener to input field for input changes
emailInput.addEventListener('input', handleInputChange);
// footer subscribe js ended 
// Typed.js code (if you're using it)

var typed = new Typed('#element', {
    strings: ['Why do programmers prefer dark mode? Because the light attracts bugs! 🐞', 'Why was the computer cold? It left its Windows open! 🖥️❄️', 'Why did the JavaScript developer wear glasses? Because he could not C#! 👓'],
    typeSpeed: 50,
    loop: true,
  });