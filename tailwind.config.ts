import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                parchment: {
                    light: "#efe5d1",
                    DEFAULT: "#e6d5b0", // Main parchment color
                    dark: "#d1c098",
                },
                ink: {
                    light: "#4a4a4a",
                    DEFAULT: "#2d2a26", // Main text color
                    dark: "#1a1a1a",
                },
                gold: {
                    DEFAULT: "#d4af37",
                    hover: "#fcc200",
                },
                stone: {
                    DEFAULT: "#7a7a7a",
                    dark: "#4a4a4a",
                },
                danger: {
                    DEFAULT: "#8b0000",
                },
                magic: {
                    DEFAULT: "#4169e1", // Royal Blue for logic/magic
                }
            },
            fontFamily: {
                fantasy: ["var(--font-cinzel)", "serif"],
                mono: ["var(--font-courier)", "monospace"],
                lore: ["var(--font-lore)", "serif"],
            },
            backgroundImage: {
                "parchment-texture": "url('/parchment-bg.png')",
            },
        },
    },
    plugins: [],
};
export default config;
