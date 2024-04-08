const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.entry("app").clear().add("/src/plugins/app/_config/main.js");
  },
  devServer: {
    proxy: {
      "/api": {
        target: "https://shoppinglist.wezeo.dev/cms/",
        changeOrigin: true,
      },
    },
  },
});
