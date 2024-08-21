import puppeteer from "puppeteer";

const isValid = (username) => {
    const pattern = /^(?!\.)[a-zA-Z0-9._]{0,30}(?<!\.com)$/;
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
        waitUntil: "networkidle2",
    });

    // Decline cookies
    // const declineButton = 'button._a9--._ap36._a9_1';
    // await page.waitForSelector(declineButton);
    // await page.click(declineButton);

    // Check for "Sorry, this page isn't available." element
    // const errorMessage = "Sorry, this page isn't available.";
    // const foundElement = await page.evaluate((errorMessage) => {
    //     const elements = document.querySelectorAll('span');
    //     for (const element of elements) {
    //         if (element.textContent.trim() === errorMessage) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }, errorMessage);

    let usernameAvailable = false;
    const title = await page.title();
    console.log(title);
    if (title === 'Page not found • Instagram')
        usernameAvailable = true;

    await browser.close();
    console.log(`instagram finish check ${username}`);
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
// checkInstagramUsername("fajfhldkajlfkdajflkj");
// checkInstagramUsername("andrei.lazarov");
