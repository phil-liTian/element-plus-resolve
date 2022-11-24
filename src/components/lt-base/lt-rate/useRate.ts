import { computed, getCurrentInstance, ref } from "vue";
import { isObject, isArray } from "@vue/shared";
import { UPDATE_MODEL_EVENT } from "@u/constant.ts";
import { hasClass } from "@u/dom.ts";

export const useRate = (props) => {
  // 当前hover的元素的下标
  const hoverIndex = ref(-1);
  // 当前的value值
  const currentValue = ref(props.modelValue);
  const pointerAtLeftHalf = ref(true);
  const { emit } = getCurrentInstance();

  // rate的禁用状态
  const rateDisabled = computed(() => {
    return props.disabled;
  });

  // 工具方法：从map中获取value值
  const getValueFromMap = (value: unknown, map: Record<string, unknown>) => {
    const matchedKey = Object.keys(map)
      .filter((key) => {
        const val = map[key];
        const excluded = isObject(val) ? val.excluded : false;
        return excluded ? value < key : value <= key;
      })
      .sort((a: never, b: never) => a - b);

    const matchedValue = map[matchedKey[0]];

    return isObject(matchedValue) ? matchedValue.value : matchedValue || "";
  };

  // 处理颜色样式,传入的colors可以是数组也可以是对象
  // 如果是数组的话最多可以传入三个元素，如果是对象键为界限值
  const colorMap = computed(() => {
    return Array.isArray(props.colors)
      ? {
          [props.lowThreshold]: props.colors[0],
          [props.highThreshold]: props.colors[1],
          [props.max]: props.colors[2],
        }
      : props.colors;
  });

  // 处理icon样式, 原则同colorMap
  const iconMap = computed(() => {
    return isArray(props.iconClasses)
      ? {
          [props.lowThreshold]: props.iconClasses[0],
          [props.highThreshold]: {
            value: props.iconClasses[1],
            excluded: true,
          },
          [props.max]: props.iconClasses[2],
        }
      : props.iconClasses;
  });

  // 激活的icon类名
  const activeClass = computed(() =>
    getValueFromMap(currentValue.value, iconMap.value)
  );

  // 未激活的icon
  const voidClass = computed(() =>
    rateDisabled.value ? props.disabledVoidIconClass : props.voidIconClass
  );

  // 激活的icon颜色
  const activeColor = computed(() =>
    getValueFromMap(currentValue.value, colorMap.value)
  );

  // 实际渲染的icon的类数组
  const classes = computed(() => {
    const result = Array(props.max);
    const threshold = currentValue.value;
    result.fill(activeClass.value, 0, threshold);
    result.fill(voidClass.value, threshold, props.max);
    return result;
  });

  // 处理当前icon的样式
  const getIconStyle = (item: number) => {
    const voidColor = rateDisabled.value
      ? props.disabledVoidIconClass
      : props.voidColor;

    return {
      color: item <= currentValue.value ? activeColor.value : voidColor,
    };
  };

  // 处理当前decimal的icon
  const decimalIconClass = computed(() =>
    getValueFromMap(props.modelValue, iconMap.value)
  );

  // 当前decimal的值
  const valueDecimal = computed(
    () => props.modelValue * 100 - Math.floor(props.modelValue) * 100
  );

  // decimal的样式
  const decimalStyle = computed(() => {
    let width = "";
    if (props.allowHalf) {
      width = "50%";
    }

    return {
      width,
      color: voidClass.value,
    };
  });

  // 是否展示decimal
  const showDecimalIcon = (item: number) => {
    const showWhenAllowHalf =
      props.allowHalf &&
      pointerAtLeftHalf.value &&
      item - 0.5 <= currentValue.value &&
      item > currentValue.value;

    return showWhenAllowHalf;
  };

  // 设置当前值，hover的时候触发
  const setCurrentValue = (item: number, evt: MouseEvent) => {
    // 禁用状态
    if (rateDisabled.value) return;

    if (props.allowHalf) {
      // 可选一半
      let target = evt.target as HTMLElement;

      if (hasClass(target, "lt-rate__item")) {
        target = target.querySelector(".lt-rate__icon");
      }
      // 当decimal展示的时候，鼠标可能会移至decimal上，这时候需要找到其父元素
      // 待计算的宽度永远是icon的宽度
      if (hasClass(target, "lt-rate__decimal")) {
        target = target.parentNode as HTMLElement;
      }
      // 鼠标的位置小于整个target的宽度的一半
      pointerAtLeftHalf.value = evt.offsetX * 2 <= target.clientWidth;
      currentValue.value = pointerAtLeftHalf.value ? item - 0.5 : item;
    } else {
      // 当前值
      currentValue.value = item;
    }

    // 调整hover的元素下标
    hoverIndex.value = item;
  };

  // 重置当前值
  const resetCurrentValue = () => {
    // 禁用状态
    if (rateDisabled.value) return;

    if (props.allowHalf) {
      pointerAtLeftHalf.value =
        props.modelValue !== Math.floor(currentValue.value);
    }

    // 重置当前值
    currentValue.value = props.modelValue;

    // 重置hover值
    hoverIndex.value = -1;
  };

  // 设置当前值
  const selectValue = (value: number) => {
    if (rateDisabled.value) return;
    if (props.allowHalf) {
      emit(UPDATE_MODEL_EVENT, currentValue.value);
      if (props.modelValue !== currentValue.value) {
        emit("change", value);
      }
    } else {
      emit(UPDATE_MODEL_EVENT, currentValue.value);
      // 如果当前值和点击的value值不相等，则出发change事件
      if (props.modelValue !== value) {
        emit("change", value);
      }
    }
  };

  // 说明文字
  const text = computed(() => {
    let result = "";
    if (props.showText) {
      result = props.texts[currentValue.value - 1];
    } else if (props.showScore) {
      result = props.scoreTemplate.replace(
        /\{\s*value\s*\}/,
        // modelValue是父组件传进来的值，未点击的话，这个值是不变的
        // currentValue是hover到元素上即变的
        rateDisabled.value ? props.modelValue : currentValue.value
      );
    }

    return result;
  });

  return {
    rateDisabled,
    text,
    hoverIndex,
    classes,
    setCurrentValue,
    resetCurrentValue,
    getIconStyle,
    selectValue,
    decimalIconClass,
    decimalStyle,
    showDecimalIcon,
    currentValue,
  };
};
