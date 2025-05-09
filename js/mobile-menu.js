document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const closeBtn = document.querySelector('.close-donation');
    const mobileMenu = document.querySelector('.nav-mobile2');
    
    // Toggle menu when burger is clicked
    if (burger) {
        burger.addEventListener('click', function(e) {
            e.preventDefault();
            mobileMenu.classList.add('active');
            document.body.classList.add('menu-open');
        });
    }
    
    // Close menu when X is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    }
    
    // Close menu when clicking links
    const navLinks = document.querySelectorAll('.nav-mobile2 .menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
});