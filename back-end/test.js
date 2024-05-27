import * as global from './global.js';

const testUsername = 'andreilazarovlazarfov';
console.log(`Checking ${testUsername}...`);
console.log(await global.check(testUsername));