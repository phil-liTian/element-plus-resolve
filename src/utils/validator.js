import { isNumber } from "./utils";

// 判断是合法的宽度单位
export const isValidWidthUnit = (val: number | string): boolean => {
  if (isNumber(val)) {
    return true;
  } else {
    return ["%", "vw", "px", "vmin", "vmax", "em", "rem"].some((unit) =>
      val.endsWith(unit)
    );
  }
};

// 统一校验组件的尺寸
export const isValidateComponentSize = (size: string): boolean => {
  return ["", "large", "medium", "small", "mini"].includes(size);
};

// 统一校验datePicker的类型
export const isValidatePickerType = (val: string): boolean => {
  return [
    "year",
    "month",
    "date",
    "dates",
    "week",
    "datetime",
    "datetimerange",
    "daterange",
    "monthrange",
  ].includes(val);
};
