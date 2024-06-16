import puppeteer from "puppeteer";

const isValid = (username) => {
    // to do
    const pattern = /^(?!\.)[a-zA-Z0-9.\-_]{3,30}$/;
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`blogger start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    // const customUserAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
    // await page.setUserAgent(customUserAgent);
    await page.goto(`https://${username}.blogspot.com/`, {
        waitUntil: "domcontentloaded",
    });

    // const html = await page.content();
    // console.log(html);

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

    // if (await sanityCheck() === 'failed') {
    //     return 'manual';
    // }

    return await isAvailable(username) ? '1available' : '4taken';
}