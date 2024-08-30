import puppeteer from "puppeteer";

const isValid = (username) => {
    // ok
    const pattern = /^(?!_)[a-zA-Z0-9_]{3,20}(?<!_)$/;
    // must not start or end with _
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`roblox start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto(`https://www.roblox.com/user.aspx?username=${username}`, {
        waitUntil: "domcontentloaded",
    });

    let usernameAvailable = false;
    const title = await page.title();
    if (title === 'Roblox')
        usernameAvailable = true;

    await browser.close();
    console.log(`roblox finish check ${username}`);
    return usernameAvailable;
}

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    return await isAvailable(username) ? '1available' : '4taken';
}