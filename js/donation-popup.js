document.addEventListener('DOMContentLoaded', function() {
    // Get all elements
    const donateButtons = document.querySelectorAll('.donate-btn');
    const donationPopup = document.getElementById('donationPopup');
    const thankYouPopup = document.getElementById('thankYouPopup');
    const popupOverlay = document.getElementById('popupOverlay');
    const closeDonation = document.getElementById('closeDonation');
    const cancelDonation = document.getElementById('cancelDonation');
    const donationForm = document.getElementById('donationForm');
    const amountButtons = document.querySelectorAll('.amount-buttons button');
    const customAmount = document.getElementById('customAmount');
    const popupCloseButtons = document.querySelectorAll('.popup-close');

    // Open donation popup when any donate button is clicked
    donateButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            donationPopup.style.display = 'block';
            popupOverlay.style.display = 'block';
        });
    });

    // Close donation popup
    function closeDonationPopup() {
        donationPopup.style.display = 'none';
        popupOverlay.style.display = 'none';
    }

    if (closeDonation) {
        closeDonation.addEventListener('click', closeDonationPopup);
    }

    if (cancelDonation) {
        cancelDonation.addEventListener('click', closeDonationPopup);
    }

    // Amount selection
    amountButtons.forEach(button => {
        button.addEventListener('click', function() {
            amountButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            customAmount.value = this.getAttribute('data-amount');
        });
    });

    // Custom amount focus
    customAmount.addEventListener('focus', function() {
        amountButtons.forEach(btn => btn.classList.remove('active'));
    });

    // Form submission
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                const formGroup = field.closest('.form-group');
                if (!field.value) {
                    formGroup.classList.add('invalid');
                    isValid = false;
                } else {
                    formGroup.classList.remove('invalid');
                }
            });

            if (isValid) {
                // Show thank you popup
                thankYouPopup.style.display = 'block';
                // Close donation popup
                closeDonationPopup();
                // Reset form
                this.reset();
                amountButtons.forEach(btn => btn.classList.remove('active'));
            }
        });
    }

    // Close popups
    popupCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const popup = this.closest('.popup');
            popup.style.display = 'none';
            popupOverlay.style.display = 'none';
        });
    });

    // Close when clicking overlay
    popupOverlay.addEventListener('click', function() {
        donationPopup.style.display = 'none';
        thankYouPopup.style.display = 'none';
        this.style.display = 'none';
    });
});