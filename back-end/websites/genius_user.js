import puppeteer from "puppeteer";

const isValid = (username) => {
    // to do
    const pattern = /^(?!\.)[a-zA-Z0-9\-_]{3,30}$/;
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`genius_user start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto(`https://genius.com/${username}`, {
        waitUntil: "domcontentloaded",
    });

    let usernameAvailable = false;
    const title = await page.title();
    if (title === 'Burrr! | Genius')
        usernameAvailable = true;

    await browser.close();
    console.log(`genius_user finish check ${username}`);
    return usernameAvailable;
}

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    return await isAvailable(username) ? '1available' : '4taken';
}