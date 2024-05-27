import * as facebook from "./websites/facebook.js";

export const check = async (username) => {
    let result = {
        username: username,
        facebook: 'unknown',
        github: 'unknown',
        instagram: 'unknown',
        tiktok: 'unknown',
        twitter: 'unknown'
    };

    result.facebook = await facebook.check(username);

    return result;
}

