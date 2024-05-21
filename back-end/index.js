import * as facebook from "./websites/facebook.js";

const testUsername = 'andrei12';
console.log(`Checking ${testUsername}...`);
console.log(await facebook.check(testUsername));