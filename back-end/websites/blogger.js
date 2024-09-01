import puppeteer from "puppeteer";

const isValid = (username) => {
    const pattern = /^(?!\-)[a-zA-Z0-9-]{1,37}(?<!\-)$/;
    // ok
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`blogger start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto(`https://${username}.blogspot.com/`, {
        waitUntil: "domcontentloaded",
    });

    const errorMessage = "Blog negăsit";
    const foundElement = await page.evaluate((errorMessage) => {
        const elements = document.querySelectorAll('h1');
        for (const element of elements) {
            if (element.textContent.trim() === errorMessage) {
                return true;
            }
        }
        return false;
    }, errorMessage);

    await browser.close();
    console.log(`blogger finish check ${username}`);
    return foundElement;
}

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    // return await isAvailable(username) ? '1available' : '4taken';
    return '2manual';
}