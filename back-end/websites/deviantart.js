import puppeteer from "puppeteer";

const isValid = (username) => {
    // ok
    const pattern = /^[a-zA-Z0-9]{3,20}$/;
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`deviantart start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto(`https://www.deviantart.com/${username}`, {
        waitUntil: "domcontentloaded",
    });

    let usernameAvailable = false;
    const title = await page.title();
    if (title === 'DeviantArt: 404')
        usernameAvailable = true;

    await browser.close();
    console.log(`deviantart finish check ${username}`);
    return usernameAvailable;
}

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    return await isAvailable(username) ? '1available' : '4taken';
}