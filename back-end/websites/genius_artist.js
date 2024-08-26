import puppeteer from "puppeteer";

const isValid = (username) => {
    // probably same as user
    const pattern = /^(?=.*[a-zA-Z])[a-zA-Z0-9\-_]{1,50}$/;
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`genius_artist start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    const customUserAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';
    await page.setUserAgent(customUserAgent);
    await page.goto(`https://genius.com/artists/${username}`, {
        waitUntil: "domcontentloaded",
    });

    let usernameAvailable = false;
    const title = await page.title();
    if (title === 'Burrr! | Genius')
        usernameAvailable = true;

    await browser.close();
    console.log(`genius_artist finish check ${username}`);
    return usernameAvailable;
}

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    return await isAvailable(username) ? '1available' : '4taken';
}