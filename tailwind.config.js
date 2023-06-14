/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    safelist: ["inline-block", "ml-1"],
    theme: {
        fontFamily: {
            sans: ["Roboto", "Arial", "sans-serif"],
            mono: ["Roboto Mono", "monospace"],
        },
        colors: {
            black: "#000000",
            "light-black": "#15191C",
            "dark-gray": "#22252A",
            gray: "#2F3238",
            "light-gray": "#888888",
            "light-gray2": "#e2e2e2",
            green: "#52D171",
            "dark-green": "#2D8943",
            blue: "#46BCDF",
            "dark-blue": "#003366",
            red: "#E95065",
            pink: "#E91E63",
            orange: "#E57251",
            yellow: "#E3C551",
        },
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
