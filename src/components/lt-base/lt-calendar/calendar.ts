import type { PropType } from "vue";
import { Dayjs } from "dayjs";

export type DateType = "prev-month" | "today" | "next-month";

export const props = {
  modelValue: {
    type: Date,
  },
  // range长度必须为2, 并且每个元素必须都是时间对象
  range: {
    type: Array as PropType<Date[]>,
    validator: (range): boolean => {
      if (Array.isArray(range)) {
        return (
          range.length === 2 && range.every((item) => item instanceof Date)
        );
      }

      return false;
    },
  },
};

export const dateTableProps = {
  selectedDay: {
    type: Object as PropType<Dayjs>,
  },
  date: {
    type: Object as PropType<Dayjs>,
  },
  range: {
    type: Array as PropType<Dayjs[]>,
  },
  hideHeader: Boolean,
};
