const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        colors: {
            gray: colors.stone,
            indigo: colors.indigo,
            blue: colors.sky,
            red: colors.rose,
            green: colors.emerald,
            primary: colors.fuchsia,
            purple: colors.purple,
            yellow: colors.yellow,
            amber: colors.amber,
            white: "white",
            black: "black",
        },
        extend: {
            fontFamily: {
                sans: "Rubik_400Regular",
                body: "Rubik_400Regular",
                heading: "Bevan_400Regular",
            },
        },
    },
    plugins: [],
}
