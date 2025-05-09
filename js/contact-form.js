document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const popup = document.getElementById('popup');
    const popupOverlay = document.getElementById('popupOverlay');
    const popupClose = document.getElementById('popupClose');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Check if form is valid
            if (this.checkValidity()) {
                // Show popup if form is valid
                popup.style.display = 'block';
                popupOverlay.style.display = 'block';

                // Reset form
                this.reset();
            } else {
                // If form is invalid, browser will show validation messages
                // We can add additional handling here if needed
                console.log('Form is invalid');
            }
        });
    }

    // Close popup when close button is clicked
    if (popupClose) {
        popupClose.addEventListener('click', function () {
            popup.style.display = 'none';
            popupOverlay.style.display = 'none';
        });
    }

    // Close popup when clicking outside of it
    if (popupOverlay) {
        popupOverlay.addEventListener('click', function () {
            popup.style.display = 'none';
            this.style.display = 'none';
        });
    }
});
