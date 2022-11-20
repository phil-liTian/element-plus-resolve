import { typeToString } from "@u/types.ts";
import { computed, inject, ref, getCurrentInstance } from "vue";
import { ICheckboxGroupInstance } from "./checkbox.type";
import { UPDATE_MODEL_EVENT } from "@u/constant.ts";

// 用于处理checkboxGroup传入数据
export const useCheckboxGroup = () => {
  // group通过provide传递进来的信息
  const checkboxGroup = inject<ICheckboxGroupInstance>("CheckboxGroup", {});

  // 用于判断是否是被group包裹的checkbox
  const isGroup = computed(
    () => checkboxGroup && checkboxGroup?.name === "LtCheckboxGroup"
  );

  return {
    checkboxGroup,
    isGroup,
  };
};

// 用于处理model双向绑定的值
export const useModel = (props) => {
  const { isGroup, checkboxGroup } = useCheckboxGroup();
  const { emit } = getCurrentInstance();
  const selfModel = ref(false);
  // 用于标识当前选中的checkbox是否超出限制
  const isLimitExceeded = ref(false);

  // 如果有checkboxGroup则直接使用
  const store = computed(() =>
    checkboxGroup ? checkboxGroup.modelValue?.value : props.value
  );
  const model = computed({
    get() {
      // 如果是被Group包裹起来的，如果group有双向绑定的数据，则直接使用该数据，否则使用value
      return isGroup.value ? store.value : props.modelValue ?? selfModel.value;
    },
    set(val) {
      if (isGroup.value && Array.isArray(val)) {
        // 如果是被group包裹起来的checkbox，这时候的checkbox应当是一个array
        isLimitExceeded.value = false;

        if (
          checkboxGroup.max !== undefined &&
          val.length > checkboxGroup.max.value
        ) {
          isLimitExceeded.value = true;
        }

        if (
          checkboxGroup.min !== undefined &&
          val.length < checkboxGroup.min.value
        ) {
          isLimitExceeded.value = true;
        }

        isLimitExceeded.value === false && checkboxGroup?.changeEvent(val);
      } else {
        // 单独使用checkbox，则双向绑定的值在checkbox本身元素上
        emit(UPDATE_MODEL_EVENT, val);
        selfModel.value = val as boolean;
      }
    },
  });

  return {
    model,
    isLimitExceeded,
  };
};

// 用于处理checkbox中的事件
const useEvent = (props, { isLimitExceeded }) => {
  const { emit } = getCurrentInstance();
  const handleChange = (e: InputEvent) => {
    if (isLimitExceeded.value) return;
    const target = e.target as HTMLInputElement;
    const value = target.checked
      ? props.trueLabel ?? true
      : props.falseLable ?? false;

    emit("change", value, e);
  };

  return {
    handleChange,
  };
};

// 用于处理checkbox的状态信息
const useCheckboxStatus = (props, { model }) => {
  // 是否聚焦
  const focus = ref(false);
  // 当前checkbox是否是选中状态，选中状态可以是父组件传入的，也可以是当前checkbox传入的值
  const isChecked = computed(() => {
    const value = model.value;

    if (typeToString(value) === "[object Boolean]") {
      return value;
    } else if (Array.isArray(value)) {
      // 这里value可以是一个数组，被group包裹时可选中多个
      return value.includes(props.label);
    }
    return "";
  });

  // 禁用状态
  const isDisabled = computed(() => {
    const { isGroup, checkboxGroup } = useCheckboxGroup();
    // 处理由于限制了选中数量范围而导致禁用的状态
    const isLimitedDisabled = computed(() => {
      const max = checkboxGroup.max?.value;
      const min = checkboxGroup.min?.value;
      return (
        (!!(max || min) && model.value.length >= max && !isChecked.value) ||
        (model.value.length <= min && isChecked.value)
      );
    });

    const disabled = props.disabled;

    if (isGroup.value) {
      return (
        checkboxGroup.disabled?.value || disabled || isLimitedDisabled.value
      );
    } else {
      return disabled;
    }
  });

  const checkboxSize = computed(() => {
    const { isGroup, checkboxGroup } = useCheckboxGroup();
    const temCheckboxSize = props.size;
    return isGroup.value
      ? checkboxGroup?.checkboxGroupSize.value || temCheckboxSize
      : temCheckboxSize;
  });

  return {
    focus,
    isChecked,
    isDisabled,
    checkboxSize,
  };
};

// 最终使用到的还是这个hook
export const useCheckbox = (props) => {
  const { model, isLimitExceeded } = useModel(props);
  const { handleChange } = useEvent(props, { isLimitExceeded });
  const { isChecked, isDisabled, focus, checkboxSize } = useCheckboxStatus(
    props,
    { model }
  );

  return {
    model,
    isChecked,
    isDisabled,
    checkboxSize,
    handleChange,
    focus,
  };
};
