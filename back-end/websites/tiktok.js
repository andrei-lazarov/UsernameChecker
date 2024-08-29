import puppeteer from "puppeteer";

const isValid = (username) => {
    const pattern = /^(?!.*\.$)[a-zA-Z0-9_.]{2,24}$/; //ok
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`tiktok start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto(`https://www.tiktok.com/@${username}/`, {
        waitUntil: "networkidle2",
    });

    // Check for Couldn't find this account text
    // const foundElement = await page.evaluate(() => {
    //     const message = "Couldn't find this account";
    //     const elements = document.querySelectorAll('p');
    //     for (const element of elements) {
    //         if (element.textContent.trim() === message) {
    //             return true;
    //         }
    //     }
    //     return false;
    // });

    let usernameAvailable = false;
    const title = await page.title();
    if (title === 'Couldn’t find this account. Visit TikTok to discover more trending creators, hashtags, and sounds.')
        usernameAvailable = true;

    await browser.close();
    console.log(`tiktok finish check ${username}`);
    return usernameAvailable;
};

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    // if (await sanityCheck() === 'failed') {
    //     return 'manual';
    // }

    return await isAvailable(username) ? '2manual' : '4taken';
}

// Try with available and taken usernames
// checkTiktokUsername("fajfhldka");
// checkTiktokUsername("mandrutz");

