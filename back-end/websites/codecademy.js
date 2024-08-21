import puppeteer from "puppeteer";

const isValid = (username) => {
    const pattern = /^[a-zA-Z0-9.\-_]{1,256}$/; //ok
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`codecademy start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto(`https://codecademy.com/profiles/${username}`, {
        waitUntil: "domcontentloaded",
    });

    let usernameAvailable = false;
    const title = await page.title();
    if (title === 'Profile Not Found | Codecademy')
        usernameAvailable = true;

    await browser.close();
    console.log(`codecademy finish check ${username}`);
    return usernameAvailable;
}

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    return await isAvailable(username) ? '1available' : '4taken';
}