import puppeteer from "puppeteer";

const isValid = (username) => {
    // ok hopefully
    const pattern1 = /^(?![_.])[a-zA-Z0-9._]{5,32}(?<![_.])$/;
    const pattern2 = /\.[a-zA-Z]{1,3}$/;
    const pattern3 = /\.[a-zA-Z]{2,2}\./;
    const pattern4 = /\.\./;
    const pattern5 = /^[0-9]{3,}/;
    if (!pattern1.test(username))
        return false;
    if (pattern2.test(username))
        return false;
    if (pattern3.test(username))
        return false;
    if (pattern4.test(username))
        return false;
    if (pattern5.test(username))
        return false;
    return true;
}

const isAvailable = async (username) => {
    console.log(`vk start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    // const customUserAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
    // await page.setUserAgent(customUserAgent);
    await page.goto(`https://vk.com/${username}`, {
        waitUntil: "domcontentloaded",
    });

    let usernameAvailable = false;
    const title = await page.title();
    if (title === '404 Not Found')
        usernameAvailable = true;

    await browser.close();
    console.log(`vk finish check ${username}`);
    return usernameAvailable;
}

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    return await isAvailable(username) ? '1available' : '4taken';
}