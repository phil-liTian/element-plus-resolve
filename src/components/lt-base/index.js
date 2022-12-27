// vite
// const requireComponent = import.meta.globEager("./*/*.vue");
import message from "@c/lt-base/lt-message/message.ts";
import notify from "@c/lt-base/lt-notify/notify.ts";
import ltLoading from "./lt-loading/ltloading";
import myLoading from "./lt-loading/directive";
import myInfiniteScroll from "./lt-infinite-scroll/lt-infinite-scroll";

const requireComponent = require.context("./", true, /\.vue$/);

const install = (app) => {
  app.config.globalProperties.$ltMessage = message;
  app.config.globalProperties.$ltNotify = notify;
  app.config.globalProperties.$ltLoading = ltLoading;

  app.directive("myLoading", myLoading);
  app.directive("myInfiniteScroll", myInfiniteScroll);

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
