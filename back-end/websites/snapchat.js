import puppeteer from "puppeteer";

const isValid = (username) => {
    const pattern = /^(?![\-._])[a-zA-Z0-9\-_.]{3,15}(?<![\-._])$/;
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`snapchat start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto(`https://www.snapchat.com/add/${username}/`, {
        waitUntil: "domcontentloaded",
    });

    let usernameAvailable = false;
    const title = await page.title();
    if (title === 'Snapchat')
        usernameAvailable = true;

    await browser.close();
    console.log(`snapchat finish check ${username}`);
    return usernameAvailable;
};

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    return await isAvailable(username) ? '1available' : '4taken';
}
