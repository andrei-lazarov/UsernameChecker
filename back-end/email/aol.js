import puppeteer from "puppeteer";

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

const isValid = (username) => {
    const pattern = /^(?![\._0-9])[a-zA-Z0-9._]{4,32}(?<![\._])$/;
    // Aol: Must start with letter. Allowed characters: letters, numbers, full stops and underscores. Length min 4 max 32. Must end with letter or number.
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`aol start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto('https://login.aol.com/account/create', {
        waitUntil: "networkidle2",
    });

    // find username field and fill it
    const usernameElement = '#usernamereg-userId';
    await page.waitForSelector(usernameElement);
    await page.focus(usernameElement);
    await page.$eval(usernameElement, (el, username) => {
        el.value = username;
    }, username);

    // move focus so it checks availability
    await page.focus('#usernamereg-password');
    await page.waitForNetworkIdle();

    // check availability result
    const result = await page.$eval(usernameElement, el => {
        return (el.ariaInvalid === 'false');
    });

    await browser.close();
    console.log(`aol finish check ${username}`);
    return result;
}

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    return await isAvailable(username) ? '1available' : '4taken';
}