import puppeteer from "puppeteer";

const isValid = (username) => {
    // to do
    const pattern = /^(?!\.)[a-zA-Z0-9\-_]{3,30}$/;
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`hackerrank start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    const customUserAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
    await page.setUserAgent(customUserAgent);
    await page.goto(`https://hackerrank.com/${username}`, {
        waitUntil: "networkidle2",
    });

    let usernameAvailable = false;
    const title = await page.title();
    if (title === 'HTTP 404: Page Not Found | HackerRank')
        usernameAvailable = true;

    await browser.close();
    console.log(`hackerrank finish check ${username}`);
    return usernameAvailable;
}

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    return await isAvailable(username) ? '1available' : '4taken';
}