// Toggle menu handling
var menuToggle = document.getElementById('menu-toggle');
var menuIcon = document.querySelector('.menu-icon');
// when scroll, hide the open item in the menu
window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        menuToggle.checked = false; // Hide the toggle if scrolled more than 50px
    }
});