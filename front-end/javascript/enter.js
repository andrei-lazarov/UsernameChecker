const inputFieldd = document.getElementById("inputField");
const checkButtonn = document.getElementById("checkButton");

inputFieldd.addEventListener("keydown", function (event) {
    if (event.key === 'Enter') {
        checkButtonn.click();
    }
});