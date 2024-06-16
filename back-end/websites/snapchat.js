import puppeteer from "puppeteer";

const isValid = (username) => {
    //to do
    const pattern = /^[a-zA-Z0-9_]{0,15}$/;
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`snapchat start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto(`https://www.snapchat.com/add/${username}/`, {
        waitUntil: "networkidle2",
    });

    const errorMessage = "This content was not found.";
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
    console.log(`snapchat finish check ${username}`);
    return foundElement;
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

