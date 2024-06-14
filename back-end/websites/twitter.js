import puppeteer from "puppeteer";

export const checkTwitterUsername = async (username) => {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto(`https://www.twitter.com/${username}/`, {
        waitUntil: "networkidle2",
    });

    // Check for empty state element
    const foundElement = await page.evaluate(() => {
        const element = document.querySelector('div[data-testid="emptyState"]');
        return (element !== null);
    });

    console.log(`Username ${username} is ${foundElement ? 'available' : 'taken'}`);

    await browser.close();
};

// Try with available and taken usernames
checkTwitterUsername("fajfhldka");
checkTwitterUsername("elonmusk");
checkTwitterUsername("andrei_lazarov");

