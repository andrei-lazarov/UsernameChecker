import puppeteer from "puppeteer";

const isValid = (username) => {
    const pattern = /^(?!\.)[a-zA-Z0-9.]{5,50}(?<!\.com)$/;
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
    const foundElement = await page.evaluate(() => {
        const message = "Couldn't find this account";
        const elements = document.querySelectorAll('p');
        for (const element of elements) {
            if (element.textContent.trim() === message) {
                return true;
            }
        }
        return false;
    });

    await browser.close();
    console.log(`tiktok finish check ${username}`);
    return foundElement;
};

export const check = async (username) => {
    if (!isValid(username)) {
        return 'invalid';
    }

    // if (await sanityCheck() === 'failed') {
    //     return 'manual';
    // }

    return await isAvailable(username) ? 'available' : 'taken';
}

// Try with available and taken usernames
// checkTiktokUsername("fajfhldka");
// checkTiktokUsername("mandrutz");

