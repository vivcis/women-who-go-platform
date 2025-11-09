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
        primary: {
          DEFAULT: "#c026d3",
          dark: "#a21caf",
          light: "#e879f9",
        },
        secondary: {
          DEFAULT: "#581c87",
          dark: "#3b0764",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-purple": "linear-gradient(135deg, #581c87 0%, #c026d3 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
