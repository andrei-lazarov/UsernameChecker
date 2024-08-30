import puppeteer from "puppeteer";

const isValid = (username) => {
    // ok
    const pattern = /^(?![0-9\-_])[a-zA-Z0-9\-_]{2,40}$/;
    // start with letter
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`rubygems start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto(`https://rubygems.org/profiles/${username}`, {
        waitUntil: "domcontentloaded",
    });

    let usernameAvailable = false;
    const title = await page.title();
    if (title === 'Page not found | RubyGems.org')
        usernameAvailable = true;

    await browser.close();
    console.log(`rubygems finish check ${username}`);
    return usernameAvailable;
}

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    return await isAvailable(username) ? '1available' : '4taken';
}