import * as facebook from "./websites/facebook.js";
import * as github from "./websites/github.js";
import * as instagram from "./websites/instagram.js";
import * as tiktok from "./websites/tiktok.js";
import * as twitter from "./websites/twitter.js";
import * as snapchat from "./websites/snapchat.js"
import * as mastodon from "./websites/mastodon.js"
import * as youtube from "./websites/youtube.js"
import * as vimeo from "./websites/vimeo.js"
import * as patreon from "./websites/patreon.js"
import * as fiverr from "./websites/fiverr.js"
import * as gitlab from "./websites/gitlab.js"
import * as reddit from "./websites/reddit.js"
import * as medium from "./websites/medium.js"
import * as blogger from "./websites/blogger.js"
import * as wordpress from "./websites/wordpress.js"
import * as hackernews from "./websites/hackernews.js"
import * as producthunt from "./websites/producthunt.js"
import * as steam from "./websites/steam.js"
import * as xbox from "./websites/xbox.js"
import * as minecraft from "./websites/minecraft.js"
import * as roblox from "./websites/roblox.js"
import * as osu from "./websites/osu.js"
import * as deviantart from "./websites/deviantart.js"
// import * as spotify from "./websites/spotify.js"
import * as soundcloud from "./websites/soundcloud.js"
import * as genius_user from "./websites/genius_user.js"
import * as genius_artist from "./websites/genius_artist.js"
import * as unsplash from "./websites/unsplash.js"
import * as flickr from "./websites/flickr.js"
import * as vsco from "./websites/vsco.js"
import * as npm from "./websites/npm.js"
import * as pypi from "./websites/pypi.js"
import * as rubygems from "./websites/rubygems.js"
import * as kaggle from "./websites/kaggle.js"
import * as codecademy from "./websites/codecademy.js"
import * as geeksforgeeks from "./websites/geeksforgeeks.js"
import * as leetcode from "./websites/leetcode.js"
import * as codepen from "./websites/codepen.js"
import * as hackerrank from "./websites/hackerrank.js"
import * as pinterest from "./websites/pinterest.js"
import * as imgur from "./websites/imgur.js"
import * as vk from "./websites/vk.js"
import * as playstation from "./websites/playstation.js"
import * as dribbble from "./websites/dribbble.js"
// import * as playstore from "./websites/playstore.js"
import * as linkedin from "./websites/linkedin.js"
import * as twitch from "./websites/twitch.js"

import * as gmail from "./email/gmail.js"
import * as yahoo from "./email/yahoo.js"
import * as aol from "./email/aol.js"
import * as outlook from "./email/outlook.js"
import * as proton from "./email/proton.js"


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
    vimeo: vimeo.check,
    patreon: patreon.check,
    fiverr: fiverr.check,
    gitlab: gitlab.check,
    reddit: reddit.check,
    medium: medium.check,
    "blogger/blogspot": blogger.check,
    wordpress: wordpress.check,
    hackernews: hackernews.check,
    producthunt: producthunt.check,
    steam: steam.check,
    xbox: xbox.check,
    minecraft: minecraft.check,
    roblox: roblox.check,
    osu: osu.check,
    deviantart: deviantart.check,
    // spotify: spotify.check,
    soundcloud: soundcloud.check,
    genius_user: genius_user.check,
    genius_artist: genius_artist.check,
    unsplash: unsplash.check,
    flickr: flickr.check,
    vsco: vsco.check,
    npm: npm.check,
    pypi: pypi.check,
    rubygems: rubygems.check,
    kaggle: kaggle.check,
    codecademy: codecademy.check,
    geeksforgeeks: geeksforgeeks.check,
    leetcode: leetcode.check,
    codepen: codepen.check,
    hackerrank: hackerrank.check,
    pinterest: pinterest.check,
    imgur: imgur.check,
    vk: vk.check,
    playstation: playstation.check,
    dribbble: dribbble.check,
    // playstore: playstore.check,
    linkedin: linkedin.check,
    twitch: twitch.check,
    gmail: gmail.check,
    yahoo: yahoo.check,
    outlook: outlook.check,
    proton: proton.check,
    aol: aol.check
}

export const checkSingle = async (website, username) => {
    let result = '2manual';
    if (functionMap[website])
        result = await functionMap[website](username);

    return result;
}

// const test1 = 'Aandreiilaazzarov';
// console.log(await outlook.check(test1));
// const test2 = 'andrei';
// console.log(await outlook.check(test2));
