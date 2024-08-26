const compareButton = document.getElementById('compareButton');
compareButton.disabled = true;

function updateAvailability(website, username, newStatus) {
    // console.log(`${website} is ${newStatus}`);
    newStatusClass = newStatus.slice(1);
    websiteElement = document.getElementById(website);
    websiteElement.dataset.status = newStatus;
    websiteElement.classList.remove('available');
    websiteElement.classList.remove('available-border');
    websiteElement.classList.remove('manual');
    websiteElement.classList.remove('manual-border');
    websiteElement.classList.remove('invalid');
    websiteElement.classList.remove('invalid-border');
    websiteElement.classList.remove('taken');
    websiteElement.classList.remove('taken-border');
    websiteElement.classList.remove('loading');
    websiteElement.classList.remove('loading-border');
    websiteElement.classList.add(newStatusClass);
    websiteElement.classList.add(`${newStatusClass}-border`);
    let percentage = 0;
    if (totalWebsites != 0 && availableWebsites != 0)
        percentage = Math.round(availableWebsites / totalWebsites * 100);
    scoreText.textContent = `Username ${usernameScore} is available on ${percentage}% of the websites.`;

    smallWebsiteElement = document.getElementById(`${username}-${website}`);
    smallWebsiteElement.classList.add(newStatusClass);
}

async function requestSingle(website, username) {
    try {
        // const serverIP = '34.45.227.251';
        const serverIP = 'localhost';
        const response = await fetch(`http://${serverIP}:3000/requestSingle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usernameInput: username, websiteInput: website })
        });

        const resultString = await response.text();
        updateAvailability(website, username, resultString);
        totalWebsites++;
        if (totalWebsites == 53) {
            loadingBox.style.display = 'none';
            resultBox.style.display = 'flex';
            const usernameEmailElement = document.getElementById(`${username}-email`);
            const usernameSocialElement = document.getElementById(`${username}-social`);
            const usernameVideoElement = document.getElementById(`${username}-video`);
            const usernameBloggingElement = document.getElementById(`${username}-blogging`);
            const usernameProfessionalElement = document.getElementById(`${username}-professional`);
            const usernameGamingElement = document.getElementById(`${username}-gaming`);
            const usernameArtElement = document.getElementById(`${username}-art`);
            const usernameMusicElement = document.getElementById(`${username}-music`);
            const usernameDevElement = document.getElementById(`${username}-dev`);
            gridItems.forEach(item => {
                if (item.dataset.status == '1available') {
                    if (item.dataset.email == 'y') {
                        const oldValue = parseInt(usernameEmailElement.textContent);
                        usernameEmailElement.textContent = oldValue + 1;
                    }
                    if (item.dataset.social == 'y') {
                        const oldValue = parseInt(usernameSocialElement.textContent);
                        usernameSocialElement.textContent = oldValue + 1;
                    }
                    if (item.dataset.video == 'y') {
                        const oldValue = parseInt(usernameVideoElement.textContent);
                        usernameVideoElement.textContent = oldValue + 1;
                    }
                    if (item.dataset.blogging == 'y') {
                        const oldValue = parseInt(usernameBloggingElement.textContent);
                        usernameBloggingElement.textContent = oldValue + 1;
                    }
                    if (item.dataset.professional == 'y') {
                        const oldValue = parseInt(usernameProfessionalElement.textContent);
                        usernameProfessionalElement.textContent = oldValue + 1;
                    }
                    if (item.dataset.gaming == 'y') {
                        const oldValue = parseInt(usernameGamingElement.textContent);
                        usernameGamingElement.textContent = oldValue + 1;
                    }
                    if (item.dataset.art == 'y') {
                        const oldValue = parseInt(usernameArtElement.textContent);
                        usernameArtElement.textContent = oldValue + 1;
                    }
                    if (item.dataset.music == 'y') {
                        const oldValue = parseInt(usernameMusicElement.textContent);
                        usernameMusicElement.textContent = oldValue + 1;
                    }
                    if (item.dataset.dev == 'y') {
                        const oldValue = parseInt(usernameDevElement.textContent);
                        usernameDevElement.textContent = oldValue + 1;
                    }
                }
            });
            compareButton.disabled = false;
        }
        else
            compareButton.disabled = true;

        if (resultString == '1available')
            availableWebsites++;
    } catch (error) {
        console.error('Error:', error);
    }
}

// async function request(username) {
//     try {
//         const serverIP = '34.45.227.251';
//         // const serverIP = 'localhost';
//         const response = await fetch(`http://${serverIP}:3000/request`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ usernameInput: username })
//         });

//         const resultString = await response.text();
//         // console.log(resultString);
//         const result = JSON.parse(resultString);
//         for (const website in result) {
//             updateAvailability(website, result[website]);
//         }
//         // sortSelector.dispatchEvent(new Event("change")); // trigger sort
//         // alert(result);
//     } catch (error) {
//         console.error('Error:', error);
//         alert('Failed to check username availability');
//     }
// }