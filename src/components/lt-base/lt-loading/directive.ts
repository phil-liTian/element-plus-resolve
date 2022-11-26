import Loading from "./ltloading";

const createInstance = (el, binding) => {
  // 获取属性值,之所以这么处理的原因在于，modifiers传递的属性太多，在外部元素上也不太美观
  const textExr = el.getAttribute("lt-text");
  const customClassExr = el.getAttribute("lt-customClass");
  const backgroundExr = el.getAttribute("lt-background");

  const vm = el.instance;

  el.instance = Loading({
    text: (vm && vm[textExr]) || textExr,
    customClass: (vm && vm[customClassExr]) || customClassExr,
    background: (vm && vm[backgroundExr]) || backgroundExr,
    fullscreen: !!binding.value.fullscreen,
    target: binding.modifiers.fullscreen ? null : el,
    lock: !!binding.modifiers.lock,
    body: !!binding.modifiers.body,
    visible: true,
  });
};

const vLoading = {
  mounted(el, binding) {
    if (binding.value) {
      createInstance(el, binding);
    }
  },

  updated(el, binding) {
    const instance = el.instance;
    if (binding.oldValue !== binding.value) {
      if (binding.value) {
        createInstance(el, binding);
      } else {
        instance.close();
      }
    }
  },

  unmounted(el) {
    el?.instance.close();
  },
};

export default vLoading;
