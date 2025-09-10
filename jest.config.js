const nextJest = require('next/jest');
const dotenv = require('dotenv');

dotenv.config({
    path: '.env',
})
const createJestConfig = nextJest();
const jestConfig = createJestConfig({
    dir: ".",
    moduleDirectories: ['node_modules','<rootDir>']

});

module.exports = jestConfig;