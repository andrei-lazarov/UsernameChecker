import puppeteer from "puppeteer";

const isValid = (username) => {
    const pattern = /^(?![.\-_])[a-zA-Z0-9.\-_]{2,255}$/; //ok
    // Must not start with chars. Allowed chars. Length.
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`gitlab start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    // const customUserAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
    // await page.setUserAgent(customUserAgent);
    await page.goto(`https://www.gitlab.com/${username}/`, {
        waitUntil: "domcontentloaded",
    });

    let usernameAvailable = false;
    const title = await page.title();
    // const html = await page.content();
    // console.log(html);
    if (title == 'Just a moment...')
        usernameAvailable = true;

    await browser.close();
    console.log(`gitlab finish check ${username}`);
    return usernameAvailable;
}

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    // if (await sanityCheck() === 'failed') {
    //     return 'manual';
    // }

    return await isAvailable(username) ? '1available' : '4taken';
}