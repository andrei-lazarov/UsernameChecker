import puppeteer from "puppeteer";

export const checkTiktokUsername = async (username) => {
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

    console.log(`Username ${username} is ${foundElement ? 'available' : 'taken'}`);

    await browser.close();
};

// Try with available and taken usernames
checkTiktokUsername("fajfhldka");
checkTiktokUsername("mandrutz");

