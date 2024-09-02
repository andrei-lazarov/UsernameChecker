const inputField = document.getElementById('inputField');
const checkButton = document.getElementById('checkButton');

// Check on initial page load
if (inputField.value === '') {
    checkButton.disabled = true;
} else {
    checkButton.disabled = false;
}

// Check on input change
inputField.addEventListener('input', () => {
    checkButton.disabled = (inputField.value === '' || loading == true);
});
