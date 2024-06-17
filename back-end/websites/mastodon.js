import puppeteer from "puppeteer";

const isValid = (username) => {
    //to do
    const pattern = /^[a-zA-Z0-9_]{0,15}$/;
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`mastodon start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto(`https://www.mastodon.social/@${username}/`, {
        waitUntil: "domcontentloaded",
    });

    // const foundElement = await page.evaluate(() => {
    //     const element = document.querySelector('.dialog__message h1');
    //     return (element !== null);
    // });

    let usernameAvailable = false;
    const title = await page.title();
    if (title === "The page you are looking for isn't here. - Mastodon")
        usernameAvailable = true;

    await browser.close();
    console.log(`mastodon finish check ${username}`);
    return usernameAvailable;
};

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    // if (await sanityCheck() === 'failed') {
    //     return 'manual';
    // }

    return await isAvailable(username) ? '1available' : '4taken';
}

// Try with available and taken usernames
// checkTwitterUsername("fajfhldka");
// checkTwitterUsername("elonmusk");
// checkTwitterUsername("andrei_lazarov");

