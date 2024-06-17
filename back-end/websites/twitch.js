import puppeteer from "puppeteer";

const isValid = (username) => {
    // to do
    const pattern = /^(?!\.)[a-zA-Z0-9.\-_]{3,30}$/;
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`twitch start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto(`https://twitch.tv/${username}`, {
        waitUntil: "load",
    });

    const foundElement = await page.evaluate(() => {
        const element = document.querySelector('p[data-a-target="core-error-message"]');
        console.log("element:" + element);
        return element && element.textContent === "Sorry. Unless you've got a time machine, that content is unavailable.";
    });

    await browser.close();
    console.log(`twitch finish check ${username}`);
    return foundElement;
}

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    return await isAvailable(username) ? '1available' : '4taken';
}