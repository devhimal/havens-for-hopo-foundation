document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
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

    // Initialize localStorage for donations
    const donationsKey = 'donations';
    let donations = JSON.parse(localStorage.getItem(donationsKey)) || [];

    // Open donation popup when any donate button is clicked
    donateButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            openPopup(donationPopup);
        });
    });

    // Close donation popup
    function closeDonationPopup() {
        closePopup(donationPopup);
    }

    // Open a popup
    function openPopup(popup) {
        popup.style.display = 'block';
        popupOverlay.style.display = 'block';
    }

    // Close a popup
    function closePopup(popup) {
        popup.style.display = 'none';
        popupOverlay.style.display = 'none';
    }

    // Add event listeners to close buttons
    [closeDonation, cancelDonation].forEach(button => {
        if (button) {
            button.addEventListener('click', closeDonationPopup);
        }
    });

    // Handle amount selection
    amountButtons.forEach(button => {
        button.addEventListener('click', function () {
            amountButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            customAmount.value = this.getAttribute('data-amount');
        });
    });

    customAmount.addEventListener('focus', function () {
        amountButtons.forEach(btn => btn.classList.remove('active'));
    });

    // Form submission
    if (donationForm) {
        donationForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const isValid = validateForm(this);

            if (isValid) {
                saveDonationToLocalStorage(this);
                openPopup(thankYouPopup);
                closeDonationPopup();
                resetForm();
            }
        });
    }

    // Form validation
    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        const customAmountValue = customAmount.value.trim();

        requiredFields.forEach(field => {
            const formGroup = field.closest('.form-group');
            if (!field.value.trim()) {
                formGroup.classList.add('invalid');
                showError(formGroup, 'This field is required.');
                isValid = false;
            } else {
                formGroup.classList.remove('invalid');
                hideError(formGroup);
            }
        });

        if (customAmountValue && isNaN(customAmountValue)) {
            const formGroup = customAmount.closest('.form-group');
            formGroup.classList.add('invalid');
            showError(formGroup, 'Please enter a valid number.');
            isValid = false;
        }

        return isValid;
    }

    // Save form data to localStorage
    function saveDonationToLocalStorage(form) {
        const donationData = {
            id: Date.now(),
            name: form.querySelector('#name').value.trim(),
            card: form.querySelector('#card').value.trim(),
            expiry: form.querySelector('#expiry').value.trim(),
            cvv: form.querySelector('#cvv').value.trim(),
            email: form.querySelector('#email').value.trim(),
            country: form.querySelector('#country').value,
            address: form.querySelector('#address').value.trim(),
            city: form.querySelector('#city').value.trim(),
            state: form.querySelector('#state').value.trim(),
            zip: form.querySelector('#zip').value.trim(),
            amount: form.querySelector('#customAmount').value.trim(),
            date: new Date().toISOString()
        };

        donations.push(donationData);
        localStorage.setItem(donationsKey, JSON.stringify(donations));
        alert("Thank you so much for the donation, your donation is recorded successfully.", donationData)

    }

    function showError(formGroup, message) {
        let error = formGroup.querySelector('.error-message');
        if (!error) {
            error = document.createElement('div');
            error.className = 'error-message';
            formGroup.appendChild(error);
        }
        error.textContent = message;
    }

    function hideError(formGroup) {
        const error = formGroup.querySelector('.error-message');
        if (error) {
            error.remove();
        }
    }

    function resetForm() {
        donationForm.reset();
        amountButtons.forEach(btn => btn.classList.remove('active'));
        customAmount.value = '';
        const formGroups = donationForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('invalid');
            hideError(group);
        });
    }

    popupCloseButtons.forEach(button => {
        button.addEventListener('click', function () {
            const popup = this.closest('.popup');
            closePopup(popup);
        });
    });

    // popupOverlay.addEventListener('click', function () {
    //     closePopup(donationPopup);
    //     closePopup(thankYouPopup);
    // });
});
