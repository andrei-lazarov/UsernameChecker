let availableWebsites = 0;
let totalWebsites = 0;
let usernameScore;

const scoreText = document.getElementById("score");

function updateLinks(username) {
    const links = document.getElementById("grid-container").querySelectorAll("a");

    for (const link of links) {
        link.classList.add("loading");
        link.classList.add("loading-border");
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
            currentHref = `https://geeksforgeeks.org/user/${username}`;
        else if (link.id == 'hackerrank')
            currentHref = `https://www.hackerrank.com/profile/${username}`;
        else if (link.id == 'hackernews')
            currentHref = `https://news.ycombinator.com/user?id=${username}`;
        else if (link.id == 'npm')
            currentHref = `https://npmjs.com/~${username}`;
        else if (link.id == 'playstore')
            currentHref = `https://play.google.com/store/apps/developer?id=${username}`;
        else if (link.id == 'imgur')
            currentHref = `https://imgur.com/user/${username}`;
        else if (link.id == 'youtube')
            currentHref = `https://youtube.com/@${username}`;
        else if (link.dataset.email == 'y')
            currentHref = link.getAttribute("href");
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
    const legend = document.getElementById("legend-hider");
    legend.classList.remove("hidden");

    const top = document.getElementById("top");
    top.classList.add("small");

    updateLinks(username);
    // const sortSelector = document.getElementById('sortSelector');
    // sortSelector.value = 'availability';
    // await request(username);

    scoreText.textContent = `Username ${username} is available on 0% of the websites.`;
    totalWebsites = 0;
    availableWebsites = 0;
    usernameScore = username;


    const table = document.getElementById("table");
    rowString = `<td class="cell-username">${username}</td>
<td class="cell" id="${username}-email" data-all="y">0</td>
<td class="cell" id="${username}-social" data-all="y">0</td>
<td class="cell" id="${username}-video" data-all="y">0</td>
<td class="cell" id="${username}-dev" data-all="y">0</td>
<td class="cell" id="${username}-gaming" data-all="y">0</td>
<td class="cell" id="${username}-blogging" data-all="y">0</td>
<td class="cell" id="${username}-professional" data-all="y">0</td>
<td class="cell" id="${username}-music" data-all="y">0</td>
<td class="cell" id="${username}-art" data-all="y">0</td>
<td class="cell" id="${username}-gmail" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="n" data-email="y" data-order="0.1"></td>
<td class="cell" id="${username}-yahoo" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="n" data-email="y" data-order="0.2"></td>
<td class="cell" id="${username}-outlook" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="n" data-email="y" data-order="0.3"></td>
<td class="cell" id="${username}-aol" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="n" data-email="y" data-order="0.4"></td>
<td class="cell" id="${username}-proton" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="n" data-email="y" data-order="0.5"></td>
<td class="cell" id="${username}-facebook" data-social="y" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="n" data-email="n" data-order="1"></td>
<td class="cell" id="${username}-instagram" data-social="y" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="y" data-music="n" data-photography="y" data-dev="n" data-email="n" data-order="2"></td>
<td class="cell" id="${username}-twitter" data-social="y" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="n" data-email="n" data-order="3"></td>
<td class="cell" id="${username}-snapchat" data-social="y" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="n" data-email="n" data-order="4"></td>
<td class="cell" id="${username}-mastodon" data-social="y" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="n" data-email="n" data-order="5"></td>
<td class="cell" id="${username}-tiktok" data-social="y" data-video="y" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="n" data-music="y" data-photography="n" data-dev="n" data-email="n" data-order="6"></td>
<td class="cell" id="${username}-youtube" data-social="n" data-video="y" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="n" data-music="y" data-photography="n" data-dev="n" data-email="n" data-order="7"></td>
<td class="cell" id="${username}-twitch" data-social="n" data-video="y" data-blogging="n" data-professional="n"
    data-gaming="y" data-art="n" data-music="n" data-photography="n" data-dev="n" data-email="n" data-order="7.1"></td>
<td class="cell" id="${username}-vimeo" data-social="n" data-video="y" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="n" data-email="n" data-order="8"></td>
<td class="cell" id="${username}-vk" data-social="n" data-video="y" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="n" data-email="n" data-order="8.1"></td>
<td class="cell" id="${username}-linkedin" data-social="n" data-video="n" data-blogging="n" data-professional="y"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="n" data-email="n" data-order="9"></td>
<td class="cell" id="${username}-patreon" data-social="n" data-video="n" data-blogging="n" data-professional="y"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="n" data-email="n" data-order="10"></td>
<td class="cell" id="${username}-fiverr" data-social="n" data-video="n" data-blogging="n" data-professional="y"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="n" data-email="n" data-order="11"></td>
<td class="cell" id="${username}-playstore" data-social="n" data-video="n" data-blogging="n" data-professional="y"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="y" data-email="n" data-order="11.1"></td>
<td class="cell" id="${username}-github" data-social="n" data-video="n" data-blogging="n" data-professional="y"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="y" data-email="n" data-order="12"></td>
<td class="cell" id="${username}-gitlab" data-social="n" data-video="n" data-blogging="n" data-professional="y"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="y" data-email="n" data-order="13"></td>
<td class="cell" id="${username}-reddit" data-social="y" data-video="n" data-blogging="y" data-professional="n"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="n" data-email="n" data-order="14"></td>
<td class="cell" id="${username}-medium" data-social="n" data-video="n" data-blogging="y" data-professional="n"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="n" data-email="n" data-order="15"></td>
<td class="cell" id="${username}-blogger/blogspot" data-social="n" data-video="n" data-blogging="y"
    data-professional="n" data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="n" data-email="n"    data-order="16"></td>
<td class="cell" id="${username}-wordpress" data-social="n" data-video="n" data-blogging="y" data-professional="n"    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="n" data-email="n" data-order="17"></td>
<td class="cell" id="${username}-hackernews" data-social="n" data-video="n" data-blogging="y" data-professional="n"    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="y" data-email="n" data-order="18"></td>
<td class="cell" id="${username}-producthunt" data-social="n" data-video="n" data-blogging="n" data-professional="y"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="n" data-email="n" data-order="19"></td>
<td class="cell" id="${username}-steam" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="y" data-art="n" data-music="n" data-photography="n" data-dev="n" data-email="n" data-order="20"></td>
<td class="cell" id="${username}-xbox" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="y" data-art="n" data-music="n" data-photography="n" data-dev="n" data-email="n" data-order="21"></td>
<td class="cell" id="${username}-playstation" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="y" data-art="n" data-music="n" data-photography="n" data-dev="n" data-email="n" data-order="21.1"></td>
<td class="cell" id="${username}-minecraft" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="y" data-art="n" data-music="n" data-photography="n" data-dev="n" data-email="n" data-order="22"></td>
<td class="cell" id="${username}-roblox" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="y" data-art="n" data-music="n" data-photography="n" data-dev="n" data-email="n" data-order="23"></td>
<td class="cell" id="${username}-osu" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="y" data-art="n" data-music="n" data-photography="n" data-dev="n" data-email="n" data-order="24"></td>
<td class="cell" id="${username}-deviantart" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="y" data-music="n" data-photography="y" data-dev="n" data-email="n" data-order="25"></td>
<td class="cell" id="${username}-spotify" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="n" data-music="y" data-photography="n" data-dev="n" data-email="n" data-order="26"></td>
<td class="cell" id="${username}-soundcloud" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="n" data-music="y" data-photography="n" data-dev="n" data-email="n" data-order="27"></td>
<td class="cell" id="${username}-genius_user" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="n" data-music="y" data-photography="n" data-dev="n" data-email="n" data-order="28"></td>
<td class="cell" id="${username}-genius_artist" data-social="n" data-video="n" data-blogging="n" data-professional="y"
    data-gaming="n" data-art="n" data-music="y" data-photography="n" data-dev="n" data-email="n" data-order="29"></td>
<td class="cell" id="${username}-imgur" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="y" data-music="n" data-photography="n" data-dev="n" data-email="n" data-order="29.1"></td>
<td class="cell" id="${username}-pinterest" data-social="n" data-video="n" data-blogging="y" data-professional="n"
    data-gaming="n" data-art="y" data-music="n" data-photography="y" data-dev="n" data-email="n" data-order="29.2"></td>
<td class="cell" id="${username}-unsplash" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="y" data-music="n" data-photography="y" data-dev="n" data-email="n" data-order="30"></td>
<td class="cell" id="${username}-flickr" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="y" data-music="n" data-photography="y" data-dev="n" data-email="n" data-order="31"></td>
<td class="cell" id="${username}-vsco" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="y" data-music="n" data-photography="y" data-dev="n" data-email="n" data-order="32"></td>
<td class="cell" id="${username}-dribbble" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="y" data-music="n" data-photography="n" data-dev="n" data-email="n" data-order="32.1"></td>
<td class="cell" id="${username}-npm" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="y" data-email="n" data-order="33"></td>
<td class="cell" id="${username}-pypi" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="y" data-email="n" data-order="34"></td>
<td class="cell" id="${username}-rubygems" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="y" data-email="n" data-order="35"></td>
<td class="cell" id="${username}-kaggle" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="y" data-email="n" data-order="36"></td>
<td class="cell" id="${username}-codecademy" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="y" data-email="n" data-order="37"></td>
<td class="cell" id="${username}-geeksforgeeks" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="y" data-email="n" data-order="38"></td>
<td class="cell" id="${username}-leetcode" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="y" data-email="n" data-order="39"></td>
<td class="cell" id="${username}-codepen" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="y" data-email="n" data-order="40"></td>
<td class="cell" id="${username}-hackerrank" data-social="n" data-video="n" data-blogging="n" data-professional="n"
    data-gaming="n" data-art="n" data-music="n" data-photography="n" data-dev="y" data-email="n" data-order="41"></td>`;
    const newRow = document.createElement("tr");
    newRow.innerHTML = rowString;
    table.appendChild(newRow);
    cells = table.querySelectorAll('.cell');
    modalFilterItems();

    const links = document.getElementById("grid-container").querySelectorAll("a");
    for (const link of links) {
        requestSingle(link.id, username);
    }

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
