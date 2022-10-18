// vite
// const requireComponent = import.meta.globEager("./*/*.vue");
import message from "@c/lt-base/lt-message/message.ts";

const requireComponent = require.context("./", true, /\.vue$/);

const install = (app) => {
  app.config.globalProperties.$ltMessage = message;

  requireComponent.keys().forEach((fileName) => {
    const config = requireComponent(fileName);
    const componentName = fileName.replace(
      /^\.\/([\w-]+)\/([\w-]+)\.vue$/,
      `$2`
    );
    app.component(componentName, config.default || config);
  });
};

export default install;
