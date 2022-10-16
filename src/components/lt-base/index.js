// vite
// const requireComponent = import.meta.globEager("./*/*.vue");

const requireComponent = require.context("./", true, /\.vue$/);

const install = (app) => {
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
