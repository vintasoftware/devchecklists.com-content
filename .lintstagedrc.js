const path = require("path");

// Use next linter
const buildEslintCommand = (filenames) =>
    `next lint --fix --file ${filenames
        .map((f) => path.relative(process.cwd(), f))
        .join(" --file ")}`;

module.exports = {
    "*": "prettier --ignore-unknown --write",
    "*.{js,jsx,ts,tsx}": [buildEslintCommand],
};
