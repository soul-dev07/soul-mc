document.addEventListener('DOMContentLoaded', function() {
    const currencyDropdown = document.getElementById('currencyDropdown');
    const locationDropdown = document.getElementById('locationDropdown');
    const currencyOptions = document.querySelectorAll('.currency-option');
    const locationOptions = document.querySelectorAll('.location-option');
    const plansContainer = document.getElementById('plansContainer');

    const urlParams = new URLSearchParams(window.location.search);
    const urlLocation = urlParams.get('location');

    // Default to USD currency and India location if nothing is found in localStorage or URL
    const defaultCurrency = 'USD';
    const defaultLocation = 'india';

    // Get saved currency and location or set to defaults
    const savedCurrency = localStorage.getItem('currency') || defaultCurrency;
    let currentLocation = urlLocation || localStorage.getItem('location') || defaultLocation;
    let currentCurrency = savedCurrency;

    const exchangeRates = {
        'USD': 1,
        'INR': 84.76,
    };

    const updatePlans = () => {
        const plans = document.querySelectorAll('.plan');
        plans.forEach(plan => {
            if (plan.getAttribute('data-location') === currentLocation) {
                plan.style.display = 'block';
                const basePrice = parseFloat(plan.getAttribute('data-price'));
                const convertedPrice = (basePrice * exchangeRates[currentCurrency]).toFixed(2);
                plan.querySelector('.price').innerHTML =
                    `${currentCurrency === 'USD' ? '$' : '₹'}${convertedPrice} <span>/ monthly</span>`;
            } else {
                plan.style.display = 'none';
            }
        });
    };

    const updateDropdownText = () => {
        // Update location dropdown text
        switch (currentLocation) {
            case 'usa':
                locationDropdown.innerText = 'United States';
                break;
            case 'india':
                locationDropdown.innerText = 'India';
                break;
            case 'germany':
                locationDropdown.innerText = 'Germany';
                break;
            case 'singapore':
                locationDropdown.innerText = 'Singapore';
                break;
            default:
                locationDropdown.innerText = 'Unknown Location';
                break;
        }

        // Update currency dropdown text
        switch (currentCurrency) {
            case 'USD':
                currencyDropdown.innerText = '$ Dollar';
                break;
            case 'INR':
                currencyDropdown.innerText = '₹ Rupees';
                break;
            default:
                currencyDropdown.innerText = 'Select Currency';
                break;
        }
    };

    const saveToLocalStorage = () => {
        localStorage.setItem('currency', currentCurrency);
        localStorage.setItem('location', currentLocation);
    };

    currencyOptions.forEach(option => {
        option.addEventListener('click', (event) => {
            event.preventDefault();
            currentCurrency = event.target.getAttribute('data-currency');
            updatePlans();
            saveToLocalStorage();
            updateDropdownText();
        });
    });

    locationOptions.forEach(option => {
        option.addEventListener('click', (event) => {
            event.preventDefault();
            currentLocation = event.target.getAttribute('data-location');
            updatePlans();
            saveToLocalStorage();
            updateDropdownText();
        });
    });

    // Initial setup: update the plans and dropdown text
    updatePlans();
    updateDropdownText();

    // Save the location to local storage if it comes from the URL
    if (urlLocation) {
        localStorage.setItem('location', urlLocation);
    }
});