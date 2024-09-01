import puppeteer from "puppeteer";

const isValid = (username) => {
    // ok
    const pattern = /^(?=.*[a-zA-Z])[a-zA-Z0-9_]{1,64}$/;
    // at least one letter
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`patreon start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    const customUserAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
    await page.setUserAgent(customUserAgent);
    await page.goto(`https://www.patreon.com/${username}/`, {
        waitUntil: "domcontentloaded",
    });

    let usernameAvailable = false;
    const title = await page.title();
    if (title == 'Not found | Patreon' || title == 'This page could not be found — Patreon')
        usernameAvailable = true;

    await browser.close();
    console.log(`patreon finish check ${username}`);
    return usernameAvailable;
}

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    // if (await sanityCheck() === 'failed') {
    //     return 'manual';
    // }

    // return await isAvailable(username) ? '1available' : '4taken';
    return '2manual';
}