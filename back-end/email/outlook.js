import puppeteer from "puppeteer";

const isValid = (username) => {
    const pattern = /^(?![\._0-9\-])[a-zA-Z0-9.\-_]{1,64}(?<!\.)$/;
    // Must start with letter. Allowed characters. Length. Must not end with dot.
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`outlook start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto('https://signup.live.com/', {
        waitUntil: "domcontentloaded",
    });

    // create account
    await page.waitForSelector('#liveSwitch');
    await page.click('#liveSwitch');
    await page.waitForNetworkIdle();

    // username
    await page.waitForSelector('#usernameInput');
    await page.focus('#usernameInput');
    await page.type('#usernameInput', username, { delay: 50 });
    await page.click('#nextButton');

    // check if we reached password screen
    await page.waitForNetworkIdle();

    const targetElement = '#passwordCollectionViewTitle';
    const foundElement = await page.evaluate((targetElement) => {
        const elements = document.querySelector(targetElement);
        if (elements)
            return true;
        return false;
    }, targetElement);

    await browser.close();
    console.log(`outlook finish check ${username}`);
    return foundElement;
}

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    return await isAvailable(username) ? '1available' : '4taken';
}