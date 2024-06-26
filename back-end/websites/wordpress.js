import puppeteer from "puppeteer";

const isValid = (username) => {
    // to do
    const pattern = /^(?!\-)[a-zA-Z0-9-]{1,37}(?<!\-)$/;
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`wordpress start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto(`https://${username}.wordpress.com/`, {
        waitUntil: "domcontentloaded",
    });

    let usernameAvailable = false;
    const title = await page.title();
    if (title == 'WordPress.com')
        usernameAvailable = true;

    await browser.close();
    console.log(`wordpress finish check ${username}`);
    return usernameAvailable;
}

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    return await isAvailable(username) ? '1available' : '4taken';
}