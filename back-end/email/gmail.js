import puppeteer from "puppeteer";

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

const isValid = (username) => {
    const pattern = /^(?!\.)[a-zA-Z0-9.]{6,30}(?<!\.)$/;
    // Gmail: Must not start with dot. Allowed characters. Length. Must not end with dot.
    return pattern.test(username);
}

const isAvailable = async (username) => {
    console.log(`gmail start check ${username}`);
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto('https://accounts.google.com/SignUp', {
        waitUntil: "networkidle2",
    });

    // name
    await page.waitForSelector('#firstName');
    const names = ['Andrei', 'Johnatan', 'Benson', 'Elijah', 'Sebastian', 'Thomas', 'Edward', 'Alejandro', 'Victor', 'Bogdan', 'Stephen', 'Vincent', 'Paul', 'Trevor', 'George', 'James', 'Jeremy', 'Kyle', 'Alan', 'Loris'];
    await page.$eval('#firstName', (el, names) => {
        el.value = names[Math.floor(Math.random() * 20)];
        // el.value = 'asdss';
    }, names);
    await page.click('button[type="button"]');

    // age
    await page.waitForSelector('#month');
    await page.$eval('#month', el => el.value = Math.floor(Math.random() * 12) + 1);
    // await page.waitForSelector('#day');
    await page.$eval('#day', el => el.value = Math.floor(Math.random() * 28) + 1);
    // await page.waitForSelector('#year');
    await page.$eval('#year', el => el.value = Math.floor(Math.random() * 67) + 1939);
    // await page.waitForSelector('#gender');
    await page.$eval('#gender', el => el.value = 1);
    await page.waitForSelector('button[type="button"]');
    await page.waitForNetworkIdle();
    await page.click('button[type="button"]');
    // return false;

    // new or existing email
    await page.waitForSelector('#selectionc2');
    await page.waitForNetworkIdle();
    await page.click('#selectionc2');
    await page.click('button[type="button"]');

    // suggestion (optional)
    await page.waitForNetworkIdle();

    await page.keyboard.down('ShiftLeft');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.up('ShiftLeft');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowDown');

    // username
    await page.waitForSelector('input[type="text"]');
    await page.$eval('input[type="text"]', (el, username) => {
        el.value = username;
    }, username);
    await page.waitForNetworkIdle();
    await page.click('button[type="button"]');

    // await delay(2000);

    // check if we reached password screen
    await page.waitForNetworkIdle();

    const targetElement = 'input[name="Passwd"]';
    const foundElement = await page.evaluate((targetElement) => {
        const elements = document.querySelector(targetElement);
        if (elements)
            return true;
        return false;
    }, targetElement);

    await browser.close();
    console.log(`gmail finish check ${username}`);
    return foundElement;
}

export const check = async (username) => {
    if (!isValid(username)) {
        return '3invalid';
    }

    return await isAvailable(username) ? '1available' : '4taken';
}