/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                oswald: ['"Oswald"', 'sans-serif'],
                roboto: ['"Roboto Condensed"', 'sans-serif'],
            },
        },
    },
    plugins: [],
}