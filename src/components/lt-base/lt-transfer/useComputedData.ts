import { computed } from "vue";

export const useComputedData = (props) => {
  const propsKey = computed(() => props.props.key);

  const dataObj = computed(() => {
    return props.data.reduce((o, cur) => {
      o[cur[propsKey.value]] = cur;
      return o;
    }, {});
  });

  const sourceData = computed(() => {
    return props.data.filter(
      (item) => !props.modelValue.includes(item[propsKey.value])
    );
  });

  const targetData = computed(() => {
    let res = [];

    if (props.targetOrder === "original") {
      res = props.data.filter((item) =>
        props.modelValue.includes(item[propsKey.value])
      );
    } else {
      res = props.data.reduce((pre, cur) => {
        const value = dataObj.value[cur];
        if (value) {
          pre.push(value);
        }
        return pre;
      }, []);
    }

    return res;
  });

  return {
    propsKey,
    sourceData,
    targetData,
  };
};
