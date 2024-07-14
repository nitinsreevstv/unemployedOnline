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
            showErrorMessage(fullNameField, 'Please enter your full name.');
            markAsInvalid(fullNameField);
            isValid = false;
        } else {
            markAsValid(fullNameField);
        }

        // Validate Email
        if (!isValidEmail(emailField.value.trim())) {
            showErrorMessage(emailField, 'Please enter a valid email address.');
            markAsInvalid(emailField);
            isValid = false;
        } else {
            markAsValid(emailField);
        }

        // Validate Phone Number
        if (!isValidPhoneNumber(phoneField.value.trim())) {
            showErrorMessage(phoneField, 'Phone number should be 10 digits.');
            markAsInvalid(phoneField);
            isValid = false;
        } else {
            markAsValid(phoneField);
        }

        // Validate Password
        if (passwordField.value.trim().length < 8) {
            showErrorMessage(passwordField, 'Password should be at least 8 characters long.');
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

    // Function to show error message below the input field
    function showErrorMessage(field, message) {
        // Check if there's already an error message element
        let errorPopup = field.nextElementSibling;

        if (!errorPopup || !errorPopup.classList.contains('error-popup')) {
            // Create a new error message element if it doesn't exist
            errorPopup = document.createElement('div');
            errorPopup.className = 'error-popup';
            errorPopup.style.color = 'red';
            field.parentNode.insertBefore(errorPopup, field.nextSibling);
        }

        errorPopup.textContent = message;
        errorPopup.style.display = 'block';

        // Position the error message below the input field
        const fieldRect = field.getBoundingClientRect();
        errorPopup.style.left = fieldRect.left + 'px';
        errorPopup.style.top = (fieldRect.top + fieldRect.height + 5) + 'px'; // Adjust 5px for spacing

        // Automatically remove the popup after 5 seconds
        setTimeout(function() {
            errorPopup.style.display = 'none';
        }, 5000);
    }

    // Function to mark field as invalid
    function markAsInvalid(field) {
        field.classList.add('invalid-input');
    }

    // Function to mark field as valid
    function markAsValid(field) {
        field.classList.remove('invalid-input');
    }

    // Function to validate email format using a regular expression
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to validate phone number format
    function isValidPhoneNumber(phone) {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    }
});

// first page validation ended here


// saving input data from first sign up page
document.addEventListener('DOMContentLoaded', function() {
    // Function to handle form submission on page.html
    if (document.getElementById('infoForm')) {
      document.getElementById('infoForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting
        saveUserDataAndRedirect();
      });
    }
  
    // Function to handle click on "Create new account" button
    let createAccountBtn = document.querySelector('.newacc-btn');
    if (createAccountBtn) {
      createAccountBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default button behavior
        saveUserDataAndRedirect();
      });
    }
  
    // Function to save user data to local storage and redirect to choose.html
    function saveUserDataAndRedirect() {
      // Get user input
      let name = document.getElementById('nameSave').value;
      let email = document.getElementById('emailSave').value;
      let phone = document.getElementById('phoneSave').value;
  
      // Save data to local storage
      let userData = {
        name: name,
        email: email,
        phone: phone
      };
      localStorage.setItem('userData', JSON.stringify(userData));
  
      // Redirect to choose.html after saving data
      window.location.href = 'chooseProfile.html';
    }
  });
  