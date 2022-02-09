/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  /**
   * @description
   * Since Tailwind no longer uses PurgeCSS under the hood,
   * we’ve renamed the purge option to content to better reflect what it’s for
   */
  content: ['./webview/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
