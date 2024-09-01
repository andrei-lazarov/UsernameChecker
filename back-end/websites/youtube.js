import puppeteer from "puppeteer";

const isValid = (username) => {
    // ok
    const pattern = /^(?![._-])[a-zA-Z0-9.\-_]{3,30}(?<![-_.])$/;
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`youtube start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto(`https://www.youtube.com/@${username}/`, {
        waitUntil: "networkidle2",
    });

    // Decline cookies
    const declineButton = 'button[aria-label="Reject all"]'
    await page.waitForSelector(declineButton);
    await page.click(declineButton);
    console.log('waiting');
    await page.waitForNetworkIdle();
    console.log('checking');

    let usernameAvailable = false;
    const title = await page.title();
    if (title == '404 Not Found')
        usernameAvailable = true;

    await browser.close();
    console.log(`youtube finish check ${username}`);
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