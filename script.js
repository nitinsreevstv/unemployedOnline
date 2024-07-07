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