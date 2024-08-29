import puppeteer from "puppeteer";

const isValid = (username) => {
    // ok
    const pattern = /^(?![\-_])[a-zA-Z0-9\-_]{3,25}(?<![\-_])$/;
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`soundcloud start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto(`https://soundcloud.com/${username}`, {
        waitUntil: "networkidle2",
    });

    let usernameAvailable = false;
    const title = await page.title();
    if (title === 'Something went wrong on SoundCloud')
        usernameAvailable = true;

    await browser.close();
    console.log(`soundcloud finish check ${username}`);
    return usernameAvailable;
}

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    return await isAvailable(username) ? '1available' : '4taken';
}