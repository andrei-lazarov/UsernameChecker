import puppeteer from "puppeteer";

const isValid = (username) => {
    const pattern = /^(?!\.)[a-zA-Z0-9.]{5,50}(?<!\.com)$/;
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`instagram start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto(`https://www.instagram.com/${username}/`, {
        waitUntil: "domcontentloaded",
    });

    // Decline cookies
    const declineButton = 'button._a9--._ap36._a9_1';
    await page.waitForSelector(declineButton);
    await page.click(declineButton);

    // Check for "Sorry, this page isn't available." element
    const errorMessage = "Sorry, this page isn't available.";
    const foundElement = await page.evaluate((errorMessage) => {
        const elements = document.querySelectorAll('span');
        for (const element of elements) {
            if (element.textContent.trim() === errorMessage) {
                return true;
            }
        }
        return false;
    }, errorMessage);

    await browser.close();
    console.log(`instagram finish check ${username}`);
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
// checkInstagramUsername("fajfhldkajlfkdajflkj");
// checkInstagramUsername("andrei.lazarov");
