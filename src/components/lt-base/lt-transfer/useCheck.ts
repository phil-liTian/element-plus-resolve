import { computed, watch } from "vue";

export const CHECKED_CHANGE_EVENT = "checked-change";

export const useCheck = (props, panelState, emit) => {
  // computed
  const labelProp = computed(() => props.props?.label || "label");

  const keyProp = computed(() => props.props.key || "key");

  const disabledProp = computed(() => props.props.disabled || "disabled");

  // 经过筛选之后的数据
  const filteredData = computed(() => {
    return props.data.filter((item) => {
      if (typeof props.filterMethod === "function") {
        return props.filterMethod(panelState.query, item);
      } else {
        // label => key: 有label则按label匹配，否则按照key匹配
        const label = item[labelProp.value] || item[keyProp.value].toString();
        return label.toLowerCase().includes(panelState.query.toLowerCase());
      }
    });
  });

  // 可改变状态的数据
  const checkableData = computed(() => {
    return filteredData.value.filter((item) => !item[disabledProp.value]);
  });

  // methods
  const handleAllCheckChange = (value) => {
    panelState.check = value
      ? checkableData.value.map((item) => item[keyProp.value])
      : [];
  };

  // 更新全选按钮的状态
  const updateAllChecked = () => {
    // 可选中的data的key集合
    const checkableDataKeys = checkableData.value.map(
      (item) => item[keyProp.value]
    );
    panelState.allChecked =
      checkableDataKeys.length &&
      checkableDataKeys.every((item) => props.checked.includes(item));
  };

  // watch
  watch(
    () => panelState.checked,
    (val, oldVal) => {
      updateAllChecked();

      if (panelState.checkChangeByUser) {
        // 此时需区分出当前改动的数据，因为targetOrder可指定插入的数据位置
        const movedKeys = val
          .concat(oldVal)
          .filter((v) => !val.includes(v) || !oldVal.includes(v));
        emit(CHECKED_CHANGE_EVENT, val, movedKeys);
      } else {
        emit(CHECKED_CHANGE_EVENT, val);
        panelState.checkChangeByUser = true;
      }
    }
  );

  return {
    labelProp,
    keyProp,
    disabledProp,
    filteredData,
    checkableData,
    handleAllCheckChange,
  };
};
