import type { Config } from "tailwindcss";
const sharedConfig = require("../../tailwind.shared.js");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    ...sharedConfig.theme,
  },
  plugins: sharedConfig.plugins,
};

export default config;