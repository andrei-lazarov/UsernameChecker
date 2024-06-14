import puppeteer from "puppeteer";

export const checkGithubUsername = async (username) => {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto(`https://www.github.com/${username}/`, {
        waitUntil: "domcontentloaded",
    });

    // Check for 404 image
    const foundElement = await page.evaluate(() => {
        const element = document.querySelector('img[alt="404 “This is not the web page you are looking for”"]');
        return (element !== null);
    });

    console.log(`Username ${username} is ${foundElement ? 'available' : 'taken'}`);

    await browser.close();
};

// Try with available and taken usernames
checkGithubUsername("fajfhldkajlfkdajflkj");
checkGithubUsername("andrei-lazarov");
