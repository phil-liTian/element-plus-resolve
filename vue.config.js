// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  devServer: {
    open: true,
    port: 3000,
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", path.resolve(__dirname, "./src"))
      .set("@c", path.resolve(__dirname, "./src/components"))
      .set("@u", path.resolve(__dirname, "./src/utils"))
      .set("@s", path.resolve(__dirname, "./src/style"));
  },

  // pluginOptions: {
  //   "style-resources-loader": {
  //     preProcessor: "scss",
  //     patterns: [
  //       path.resolve(__dirname, "./src/style/mixins/mixins.scss"),
  //       path.resolve(__dirname, "./src/style/mixins/_var.scss"),
  //       path.resolve(__dirname, "./src/style/common/var.scss"),
  //     ],
  //   },
  // },
};
