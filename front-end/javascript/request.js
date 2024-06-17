function updateAvailability(website, newStatus) {
    // console.log(`${website} is ${newStatus}`);
    websiteElement = document.getElementById(website);
    websiteElement.dataset.status = newStatus;
    websiteElement.classList.remove('available');
    websiteElement.classList.remove('manual');
    websiteElement.classList.remove('invalid');
    websiteElement.classList.remove('taken');
    websiteElement.classList.remove('loading');
    websiteElement.classList.add(newStatus.slice(1));
    let percentage = 0;
    if (totalWebsites != 0 && availableWebsites != 0)
        percentage = Math.round(availableWebsites / totalWebsites * 100);
    scoreText.textContent = `Username ${usernameScore} is available on ${percentage}% of the websites`;
}

async function request(username) {
    try {
        const response = await fetch('http://localhost:3000/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usernameInput: username })
        });

        const resultString = await response.text();
        // console.log(resultString);
        const result = JSON.parse(resultString);
        for (const website in result) {
            updateAvailability(website, result[website]);
        }
        // sortSelector.dispatchEvent(new Event("change")); // trigger sort
        // alert(result);
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to check username availability');
    }
}

async function requestSingle(website, username) {
    try {
        const response = await fetch('http://localhost:3000/requestSingle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usernameInput: username, websiteInput: website })
        });

        const resultString = await response.text();
        // console.log(resultString);
        // const result = JSON.parse(resultString);
        updateAvailability(website, resultString);
        totalWebsites++;
        if (resultString == '1available')
            availableWebsites++;
        // sortSelector.dispatchEvent(new Event("change")); // trigger sort
        // alert(result);
    } catch (error) {
        console.error('Error:', error);
        // alert('Failed to check username availability');
    }
}

