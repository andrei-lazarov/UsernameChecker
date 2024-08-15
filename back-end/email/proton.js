import puppeteer from "puppeteer";

const isValid = (username) => {
    const pattern = /^(?![\._0-9\-])[a-zA-Z0-9.\-_]{1,64}(?<!\.)$/;
    // Must start with letter. Allowed characters. Length. Must not end with dot.
    return pattern.test(username);
}

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

const isAvailable = async (username) => {
    console.log(`proton start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto('https://account.proton.me/mail/signup', {
        waitUntil: "networkidle2",
    });

    // type
    await page.waitForSelector('#email');
    await page.waitForNetworkIdle();
    await page.type('#email', username, { delay: 50 });
    await page.type('#password', 'meatballs', { delay: 50 });
    await page.type('#repeat-password', 'meatballs', { delay: 50 });

    await page.click('button[type="submit"]');

    // check if we reached password screen
    await page.waitForNetworkIdle();

    const targetElement = 'h1';
    const foundElement = await page.evaluate((targetElement) => {
        const element = document.querySelector(targetElement);
        if (element.textContent == 'Free')
            return true;
        return false;
    }, targetElement);

    await browser.close();
    console.log(`proton finish check ${username}`);
    return foundElement;
}

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    return await isAvailable(username) ? '1available' : '4taken';
}