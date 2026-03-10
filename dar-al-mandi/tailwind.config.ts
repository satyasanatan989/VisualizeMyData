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
        background: "#F6F3EE", // Cream / Sand
        foreground: "#111111",
        primary: {
          DEFAULT: "#C8A45C", // Deep Arabian Gold
          hover: "#B8924A",
        },
        secondary: {
          DEFAULT: "#111111", // Dark Charcoal
        },
        accent: {
          DEFAULT: "#8B1E1E", // Rich Red
          hover: "#7A1A1A",
        },
        surface: "#FFFFFF",
      },
      fontFamily: {
        heading: ["var(--font-cinzel)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        'pattern': "url('/images/pattern.svg')",
      }
    },
  },
  plugins: [],
};
export default config;
