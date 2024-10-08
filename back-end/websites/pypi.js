import puppeteer from "puppeteer";

const isValid = (username) => {
    // ok
    const pattern = /^(?![.\-_])[a-zA-Z0-9.\-_]{1,50}(?<![.\-_])$/;
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`pypi start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto(`https://pypi.org/user/${username}`, {
        waitUntil: "domcontentloaded",
    });

    let usernameAvailable = false;
    const title = await page.title();
    if (title === 'Page Not Found (404) · PyPI')
        usernameAvailable = true;

    await browser.close();
    console.log(`pypi finish check ${username}`);
    return usernameAvailable;
}

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    return await isAvailable(username) ? '1available' : '4taken';
}