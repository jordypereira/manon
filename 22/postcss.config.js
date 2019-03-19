const purgecss = require("@fullhuman/postcss-purgecss");
const isDev = process.argv.indexOf("serve") !== -1;
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:/]+/g) || [];
  }
}

module.exports = {
  plugins: [
    require("tailwindcss")("./src/tailwind/tailwind.js"),
    isDev
      ? ""
      : purgecss({
          content: ["./src/**/*.html", "./src/**/*.vue"],
          extractors: [
            {
              extractor: TailwindExtractor,
              extensions: ["html", "vue"]
            }
          ]
        }),
    require("autoprefixer")
  ]
};
