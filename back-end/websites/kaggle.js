import puppeteer from "puppeteer";

const isValid = (username) => {
    // ok
    const pattern = /^(?![0-9])[a-zA-Z0-9]{6,20}$/;
    // Must not start with char.
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`kaggle start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto(`https://kaggle.com/${username}`, {
        waitUntil: "domcontentloaded",
    });

    let usernameAvailable = false;
    const title = await page.title();
    if (title === 'Kaggle: Your Home for Data Science')
        usernameAvailable = true;

    await browser.close();
    console.log(`kaggle finish check ${username}`);
    return usernameAvailable;
}

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    return await isAvailable(username) ? '1available' : '4taken';
}