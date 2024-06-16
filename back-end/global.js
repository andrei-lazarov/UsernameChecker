import * as facebook from "./websites/facebook.js";
import * as github from "./websites/github.js";
import * as instagram from "./websites/instagram.js";
import * as tiktok from "./websites/tiktok.js";
import * as twitter from "./websites/twitter.js";
import * as snapchat from "./websites/snapchat.js"
import * as mastodon from "./websites/mastodon.js"
import * as youtube from "./websites/youtube.js"

// export const check = async (username) => {
//     let result = {
//         // username: username,
//         facebook: "6unknown",
//         github: "6unknown",
//         instagram: "6unknown",
//         tiktok: "6unknown",
//         twitter: "6unknown",
//     };

//     // Create promises for each check
//     const facebookPromise = facebook.check(username);
//     const githubPromise = github.check(username);
//     const instagramPromise = instagram.check(username);
//     const tiktokPromise = tiktok.check(username);
//     const twitterPromise = twitter.check(username);

//     // Use Promise.all to wait for both checks to finish concurrently
//     const [facebookResult, githubResult, instagramResult, tiktokResult, twitterResult] = await Promise.all([
//         facebookPromise,
//         githubPromise,
//         instagramPromise,
//         tiktokPromise,
//         twitterPromise,
//     ]);

//     // Update results after both promises resolve
//     result.facebook = facebookResult;
//     result.github = githubResult;
//     result.instagram = instagramResult;
//     result.tiktok = tiktokResult;
//     result.twitter = twitterResult;

//     return result;
// };

const functionMap = {
    facebook: facebook.check,
    github: github.check,
    instagram: instagram.check,
    tiktok: tiktok.check,
    twitter: twitter.check,
    snapchat: snapchat.check,
    mastodon: mastodon.check,
    youtube: youtube.check,
}

export const checkSingle = async (website, username) => {
    let result = '2manual';
    if (functionMap[website])
        result = await functionMap[website](username);

    return result;
}

const test1 = 'andrei';
console.log(await youtube.check(test1));