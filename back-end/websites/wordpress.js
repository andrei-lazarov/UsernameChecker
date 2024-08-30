import puppeteer from "puppeteer";

const isValid = (username) => {
    // ok
    const pattern = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{1,60}$/;
    // at least one letter
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`wordpress start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto(`https://${username}.wordpress.com/`, {
        waitUntil: "domcontentloaded",
    });

    let usernameAvailable = false;
    const title = await page.title();
    if (title != 'WordPress.com')
        usernameAvailable = false;
    else {
        const foundElement = await page.evaluate(() => {
            const element = document.querySelector('p.get-it');
            if (element)
                return true
            return false;
        });
        usernameAvailable = foundElement;
    }

    await browser.close();
    console.log(`wordpress finish check ${username}`);
    return usernameAvailable;
}

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    return await isAvailable(username) ? '1available' : '4taken';
}