import puppeteer from "puppeteer";

const isValid = (username) => {
    const pattern = /^(?!\.)[a-zA-Z0-9.]{5,50}(?<!\.com)$/;
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`facebook start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto(`https://www.facebook.com/${username}/`, {
        waitUntil: "domcontentloaded",
    });

    // Decline cookies
    const declineButton = 'div[aria-label="Decline optional cookies"]'
    await page.waitForSelector(declineButton);
    await page.click(declineButton);

    // Close the login popup
    await page.keyboard.press('Escape');

    // Check for "This content isn't available" element
    const foundElement = await page.evaluate(() => {
        const element = document.querySelector('span.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x10flsy6.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.x4zkp8e.x41vudc.x1603h9y.x1u7k74.x1xlr1w8.xi81zsa.x2b8uid');
        return (element !== null);
    });

    await browser.close();
    console.log(`facebook finish check ${username}`);
    return foundElement;
}

const sanityCheck = async () => {
    const availableUsername = "fajfhldkajlfkdajflkj";
    const takenUsername = "lazarovandrei";

    const [isAvailableAvailableUsername, isAvailableTakenUsername] = await Promise.all([
        isAvailable(availableUsername),
        isAvailable(takenUsername)
    ]);

    if (!isAvailableAvailableUsername) {
        return 'failed';
    }
    console.log(`${availableUsername} is available`);

    if (isAvailableTakenUsername) {
        return 'failed';
    }
    console.log(`${takenUsername} is taken`);

    return 'passed';
}

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    // if (await sanityCheck() === 'failed') {
    //     return 'manual';
    // }

    return await isAvailable(username) ? '2manual' : '4taken';
}