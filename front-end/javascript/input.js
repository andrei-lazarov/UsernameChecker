function updateLinks(username) {
    const links = document.getElementById("grid-container").querySelectorAll("a");

    for (const link of links) {
        link.classList.add("loading");
        link.dataset.status = "5loading";

        let currentHref;
        if (link.id == 'snapchat')
            currentHref = `https://snapchat.com/add/${username}`;
        else if (link.id == 'reddit')
            currentHref = `https://reddit.com/user/${username}`;
        else if (link.id == 'mastodon')
            currentHref = `https://mastodon.social/@${username}`;
        else if (link.id == 'tiktok')
            currentHref = `https://tiktok.com/@${username}`;
        else if (link.id == 'linkedin')
            currentHref = `https://linkedin.com/in/${username}`;
        else if (link.id == 'blogger/blogspot')
            currentHref = `https://${username}.blogspot.com/`;
        else if (link.id == 'wordpress')
            currentHref = `https://${username}.wordpress.com/`;
        else if (link.id == 'producthunt')
            currentHref = `https://producthunt.com/@${username}`;
        else if (link.id == 'steam')
            currentHref = `https://steamcommunity.com/id/${username}`;
        else if (link.id == 'xbox')
            currentHref = `https://xboxgamertag.com/search/${username}`;
        else if (link.id == 'minecraft')
            currentHref = `https://minecraftuuid.com/?search=${username}`;
        else if (link.id == 'roblox')
            currentHref = `https://www.roblox.com/user.aspx?username=${username}`;
        else if (link.id == 'osu')
            currentHref = `https://osu.ppy.sh/users/${username}`;
        else if (link.id == 'spotify')
            currentHref = `https://open.spotify.com/user/${username}`;
        else if (link.id == 'pypi')
            currentHref = `https://pypi.org/user/${username}`;
        else if (link.id == 'rubygems')
            currentHref = `https://rubygems.org/profiles/${username}`;
        else if (link.id == 'codecademy')
            currentHref = `https://www.codecademy.com/profiles/${username}`;
        else if (link.id == 'geeksforgeeks')
            currentHref = `https://auth.geeksforgeeks.org/user/${username}`;
        else if (link.id == 'hackerrank')
            currentHref = `https://www.hackerrank.com/profile/${username}`;
        else {
            currentHref = link.getAttribute("href");

            // Remove previous username
            const usernameRegex = /\/([^/]+)$/; // Matches everything after the last slash
            currentHref = currentHref.replace(usernameRegex, "/") + username;
        }
        link.setAttribute("href", currentHref);
    }
}

async function submit() {
    const button = document.getElementById('checkButton');
    button.disabled = true;

    const username = document.getElementById('inputField').value;
    const params = new URLSearchParams(window.location.search);

    if (params.get('q') != username) {
        params.set('q', username);
        window.history.replaceState({}, document.title, `${window.location.origin}${window.location.pathname}?${params.toString()}`);
    }

    const hiddenUntilInput = document.getElementById("hiddenUntilInput");
    hiddenUntilInput.classList.remove("hidden");

    const top = document.getElementById("top");
    top.classList.add("small");

    updateLinks(username);
    // const sortSelector = document.getElementById('sortSelector');
    // sortSelector.value = 'availability';
    await request(username);

    const scoreText = document.getElementById("score");
    scoreText.textContent = `Username ${username} is available on 30% of the websites`;
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
