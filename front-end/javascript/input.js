function updateLinks(username) {
    const facebookItem = document.getElementById("facebookitem");
    if (facebookItem) {
        const facebookLink = facebookItem.querySelector("a");
        if (facebookLink) {
            facebookLink.href = `https://www.facebook.com/${username}`;
        }
    }
}


function submit() {
    const button = document.getElementById('checkButton');
    button.disabled = true;

    const username = document.getElementById('inputField').value;
    const params = new URLSearchParams(window.location.search);

    if (params.get('q') != username) {
        params.set('q', username);
        window.history.replaceState({}, document.title, `${window.location.origin}${window.location.pathname}?${params.toString()}`);
    }

    const scoreText = document.getElementById("score");
    scoreText.textContent = `Username ${username} is available on 30% of the websites`;

    const hiddenUntilInput = document.getElementById("hiddenUntilInput");
    hiddenUntilInput.classList.remove("hidden");

    const top = document.getElementById("top");
    top.classList.add("small");

    // await request(username);
}

function getInputFromURL() {
    const params = new URLSearchParams(window.location.search);
    const username = params.get('q');

    if (!username) return;

    const inputField = document.getElementById('inputField');
    inputField.value = username;

    submit();
}

window.onload = function () {
    getInputFromURL();
};
