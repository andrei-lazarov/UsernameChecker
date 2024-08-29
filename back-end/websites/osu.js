import puppeteer from "puppeteer";

const isValid = (username) => {
    // also space
    const pattern = /^[a-zA-Z0-9\-_[]]{3,15}$/;
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`osu start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto(`https://osu.ppy.sh/users/${username}`, {
        waitUntil: "domcontentloaded",
    });

    let usernameAvailable = false;
    const title = await page.title();
    if (title === 'player info | osu!')
        usernameAvailable = true;

    await browser.close();
    console.log(`osu finish check ${username}`);
    return usernameAvailable;
}

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    return await isAvailable(username) ? '1available' : '4taken';
}