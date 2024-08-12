import puppeteer from "puppeteer";

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

const isValid = (username) => {
    const pattern = /^[a-zA-Z0-9_]{0,15}$/;
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`twitter start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto(`https://www.twitter.com/${username}/`, {
        waitUntil: "networkidle2",
    });

    let usernameAvailable = false;
    await delay(2000);
    const title = await page.title();
    console.log(title);
    if (title === 'Profile / X')
        usernameAvailable = true;

    await browser.close();
    console.log(`twitter finish check ${username}`);
    return usernameAvailable;
};

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    // if (await sanityCheck() === 'failed') {
    //     return 'manual';
    // }

    return await isAvailable(username) ? '1available' : '4taken';
}

// Try with available and taken usernames
// checkTwitterUsername("fajfhldka");
// checkTwitterUsername("elonmusk");
// checkTwitterUsername("andrei_lazarov");

