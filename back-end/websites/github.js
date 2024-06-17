import puppeteer from "puppeteer";

const isValid = (username) => {
    const pattern = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`github start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto(`https://www.github.com/${username}/`, {
        waitUntil: "domcontentloaded",
    });

    // Check for 404 image
    // const foundElement = await page.evaluate(() => {
    //     const element = document.querySelector('img[alt="404 “This is not the web page you are looking for”"]');
    //     return (element !== null);
    // });

    let usernameAvailable = false;
    const title = await page.title();
    if (title === 'Page not found · GitHub · GitHub')
        usernameAvailable = true;

    await browser.close();
    console.log(`github finish check ${username}`);
    return usernameAvailable;
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
// checkGithubUsername("fajfhldkajlfkdajflkj");
// checkGithubUsername("andrei-lazarov");
