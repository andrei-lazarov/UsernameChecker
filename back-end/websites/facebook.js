import puppeteer from "puppeteer";

const isValid = (username) => {
    const pattern = /^(?!\.)[a-zA-Z0-9.]{5,50}(?<!\.com)$/; //ok
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

    let usernameAvailable = false;
    const title = await page.title();
    if (title === 'Facebook')
        usernameAvailable = true;

    await browser.close();
    console.log(`facebook finish check ${username}`);
    return usernameAvailable;
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