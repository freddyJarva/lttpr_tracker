const sveltePreprocess = require("svelte-preprocess");

module.exports = {
  preprocess: sveltePreprocess({
    postcss: require("./postcss.config"),
  }),
};
