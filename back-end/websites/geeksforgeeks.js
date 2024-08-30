import puppeteer from "puppeteer";

const isValid = (username) => {
    // ok
    const pattern = /^[a-zA-Z0-9]{1,40}$/;
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`geeksforgeeks start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto(`https://www.geeksforgeeks.org/user/${username}`, {
        waitUntil: "domcontentloaded",
    });

    let usernameAvailable = false;
    const title = await page.title();
    if (title === 'Page Not Found - GeeksforGeeks')
        usernameAvailable = true;

    await browser.close();
    console.log(`geeksforgeeks finish check ${username}`);
    return usernameAvailable;
}

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    return await isAvailable(username) ? '1available' : '4taken';
}