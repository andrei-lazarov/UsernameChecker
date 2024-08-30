import puppeteer from "puppeteer";

const isValid = (username) => {
    // should also allow spaces
    const pattern = /^(?![0-9])[a-zA-Z0-9]{2,12}$/;
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`xbox start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    // const customUserAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
    // await page.setUserAgent(customUserAgent);
    await page.goto(`https://xboxgamertag.com/search/${username}`, {
        waitUntil: "domcontentloaded",
    });

    let usernameAvailable = false;
    const title = await page.title();
    if (title === 'Xbox Gamertag - Search Xbox Live Profiles, Xbox Clips, Gamertags, Gamertag Suggestions, Xbox Tracker & More')
        usernameAvailable = true;
    if (title === '500 Internal Server Error - Xbox Gamertag')
        return 'unknown';


    await browser.close();
    console.log(`xbox finish check ${username}`);
    return usernameAvailable;
}

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    // if (await sanityCheck() === 'failed') {
    //     return 'manual';
    // }

    const result = await isAvailable(username);
    if (result == true)
        return '1available';
    if (result == false)
        return '4taken';
    return '6unknown';
}