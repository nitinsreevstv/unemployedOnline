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

var jokes = [
    'Why do programmers prefer dark mode?<br>Because the light attracts bugs! 🐞',
    'Why was the computer cold?<br>It left its Windows open! 🖥️❄️',
    'Why did the JavaScript developer wear glasses?<br>Because he could not C#! 👓',
    'Why did the database administrator leave his wife?<br>Because he had "strict" constraints at home! 😄',
    'Why did the philosopher become a barista?<br>Because he wanted to espresso his thoughts! ☕🧠'
  ];

  // Shuffle function to randomly shuffle the jokes array
  function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Shuffle the jokes array initially
  jokes = shuffle(jokes);

  // Initialize Typed.js with shuffled jokes
  var typed = new Typed('#element', {
    strings: jokes,
    typeSpeed: 100,
    loop: true,
    smartBackspace: true, // Optional: Enables smart backspacing to handle HTML tags
    showCursor: true // Optional: Show cursor animation
  });



// sign up first page validation 
document.addEventListener('DOMContentLoaded', function() {
    const fullNameField = document.querySelector('input[type="text"][placeholder="Your full name"]');
    const emailField = document.querySelector('input[type="email"][placeholder="Your email address"]');
    const phoneField = document.querySelector('input[type="text"][placeholder="Your phone number"]');
    const passwordField = document.querySelector('input[type="password"][placeholder="Password"]');
    const createAccountBtn = document.querySelector('.newacc-btn');

    createAccountBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission for demonstration

        let isValid = true;

        // Validate Full Name
        if (fullNameField.value.trim() === '') {
            markAsInvalid(fullNameField);
            isValid = false;
        } else {
            markAsValid(fullNameField);
        }

        // Validate Email
        if (!isValidEmail(emailField.value.trim())) {
            markAsInvalid(emailField);
            isValid = false;
        } else {
            markAsValid(emailField);
        }

        // Validate Phone Number (assuming a basic format check)
        if (!isValidPhoneNumber(phoneField.value.trim())) {
            markAsInvalid(phoneField);
            isValid = false;
        } else {
            markAsValid(phoneField);
        }

        // Validate Password (at least 8 characters)
        if (passwordField.value.trim().length < 8) {
            markAsInvalid(passwordField);
            isValid = false;
        } else {
            markAsValid(passwordField);
        }

        // If all fields are valid, redirect to chooseProfile.html (for demonstration, alert)
        if (isValid) {
            // alert('Redirecting to chooseProfile.html');
            window.location.href = 'chooseProfile.html'; // Uncomment to actually redirect
        }
    });

    // Function to mark field as invalid (add a visual indicator)
    function markAsInvalid(field) {
        field.classList.add('invalid-input');
    }

    // Function to mark field as valid (remove any visual indicator)
    function markAsValid(field) {
        field.classList.remove('invalid-input');
    }

    // Function to validate email format using a regular expression
    function isValidEmail(email) {
        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to validate phone number format (assuming a basic format)
    function isValidPhoneNumber(phone) {
        // Regular expression for basic phone number validation (10 digits)
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    }
});
// first page validation ended here