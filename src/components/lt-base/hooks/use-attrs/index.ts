import { reactive, getCurrentInstance, shallowRef, watchEffect } from "vue";
import { entries } from "@u/utils.ts";
/**
 * 用户获取组件身上除excludeKeys和DEFAULT_EXCLUDE_KEYS以外的所有属性
 */
interface Params {
  excludeListeners?: boolean;
  excludeKeys?: string[];
}

const DEFAULT_EXCLUDE_KEYS = ["class", "style"];
const LISTENER_PREFIX = /^on[A-Z]/;

export default (params: Params = {}) => {
  const { excludeListeners = false, excludeKeys = [] } = params;
  const instance = getCurrentInstance();
  const attrs = shallowRef({});
  // 排除的属性key的数组
  const allExcludeKeys = excludeKeys.concat(DEFAULT_EXCLUDE_KEYS);

  watchEffect(() => {
    const res = entries(instance.attrs).reduce((pre, [key, val]) => {
      if (
        !allExcludeKeys.includes(key) &&
        // 排除事件
        !(excludeListeners && LISTENER_PREFIX.test(key))
      ) {
        pre[key] = val;
      }

      return pre;
    }, {});

    attrs.value = res;
  });

  return attrs;
};
