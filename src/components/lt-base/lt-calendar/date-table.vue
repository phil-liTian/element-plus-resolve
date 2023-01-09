<template>
  <table
    class="lt-calendar__table"
    :class="{ 'is-range': isInRange }"
    cellpadding="0"
    cellspacing="0"
  >
    <thead v-if="!hideHeader">
      <th v-for="day in weekDays" :key="day">{{ day }}</th>
    </thead>
    <tbody>
      <tr v-for="(row, index) in rows" :key="index">
        <td
          v-for="(cell, key) in row"
          :key="key"
          :class="getCellClass(cell)"
          @click="pickDay(cell)"
        >
          <div class="lt-calendar-day">
            <slot name="dateCell" :data="getSlotData(cell)">
              <span>{{ cell.text }}</span>
            </slot>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "@vue/runtime-core";
import localeData from "dayjs/plugin/localeData";
import { rangeArr } from "../lt-time-picker/common/date-utils";
import dayjs, { Dayjs } from "dayjs";
import { dateTableProps } from "./calendar";
import { log } from "console";
dayjs.extend(localeData);

// 获取上个月的最后几天
export const getPrevMonthLastDays = (date: Dayjs, amount) => {
  // 用于获取最后一天是几号
  const lastDay = date.subtract(1, "month").endOf("month").date();

  const res = rangeArr(amount).map(
    (_, index) => lastDay - (amount - index - 1)
  );

  return res;
};

// 获取当月天数
export const getMonthDays = (date: Dayjs) => {
  const days = date.daysInMonth();
  return rangeArr(days).map((_, index) => index + 1);
};

export default defineComponent({
  name: "DateTable",
  props: dateTableProps,
  emits: ["pick"],
  setup(props, { emit }) {
    const now = dayjs();

    const WEEK_DAYS = ref(dayjs().localeData().weekdaysShort()); // 周几的英文缩略名称

    const firstDayOfWeek = (now as any).$locale().weekStart || 0; // 每周默认开始的时间，默认是从周末开始
    // methods
    const toNestedArr = (days) => {
      return rangeArr(days.length / 7).map((_, index) => {
        const start = index * 7;
        return days.slice(start, start + 7);
      });
    };

    const getFormattedDate = (day, type): Dayjs => {
      let result;

      if (type === "prev") {
        result = props.date.startOf("month").subtract(1, "month").date(day);
      } else if (type === "next") {
        result = props.date.startOf("month").add(1, "month").date(day);
      } else {
        result = props.date.date(day);
      }

      return result;
    };

    // 给每个单元格动态添加类
    const getCellClass = ({ text, type }) => {
      const classes = [type];
      if (type === "current") {
        const _date = getFormattedDate(text, type);

        // 选中的日期增加is-selected类
        if (_date.isSame(props.selectedDay, "day")) {
          classes.push("is-selected");
        }

        // 默认选中今天
        if (_date.isSame(now, "day")) {
          classes.push("is-today");
        }
      }

      return classes;
    };

    // 选中时间
    const pickDay = ({ text, type }) => {
      const date = getFormattedDate(text, type);
      emit("pick", date);
    };

    const getSlotData = ({ text, type }) => {
      const day = getFormattedDate(text, type);
      return {
        isSelected: day.isSame(props.selectedDay),
        date: day.toDate(),
        day: day.format("YYYY-MM-DD"),
        type: `${type}-month`,
      };
    };

    // computed
    const isInRange = computed(() => {
      return props.range && props.range.length;
    });

    const rows = computed(() => {
      let days = [];
      if (isInRange.value) {
        // 指定时间范围
        const [start, end] = props.range;
        // console.log("start", start.toDate(), end.toDate());
        // console.log("end", start.endOf("month").date());
        const diffDay = dayjs(end.format("YYYY-MM-DD")).diff(
          start.format("YYYY-MM-DD"),
          "day"
        );
        console.log("diff", diffDay);

        const currentMonthRange = rangeArr(diffDay).map((_, index) => ({
          text: start.add(index, "day").date(),
          type: "current",
        }));

        console.log("currentMonthRange", currentMonthRange);

        let remaining = currentMonthRange.length % 7;
        remaining = remaining === 0 ? 0 : 7 - remaining;

        const nextMonthRange = rangeArr(remaining).map((_, index) => ({
          text: start.add(index + diffDay, "day").date(),
          type: "next",
        }));
        console.log("nextMonthRange", nextMonthRange);

        days = currentMonthRange.concat(nextMonthRange);
      } else {
        // 计算当前月的第一天是周几
        const firstDay = props.date.startOf("month").day();
        // 上个月的天数
        const prevMonthDays = getPrevMonthLastDays(
          props.date,
          firstDay - firstDayOfWeek
        ).map((day, index) => ({ text: day, type: "prev" }));

        // 当前月的天数
        const currentMonthDays = getMonthDays(props.date).map((day) => ({
          text: day,
          type: "current",
        }));

        days = [...prevMonthDays, ...currentMonthDays];

        // 下个月的天数(总共显示42条数据)
        let totalDays = days.length > 35 ? 42 : 35;
        const nextMonthDays = rangeArr(totalDays - days.length).map(
          (_, index) => ({
            type: "next",
            text: index + 1,
          })
        );

        days = days.concat(nextMonthDays);
      }
      console.log("days", days);

      return toNestedArr(days);
    });

    // 周一 - 周末的排列顺序：默认从 周末 - 周一, 可动态调整
    const weekDays = computed(() => {
      const start = firstDayOfWeek;
      if (start === 0) {
        return WEEK_DAYS.value;
      } else {
        // TODO
      }
    });

    return {
      rows,
      weekDays,
      isInRange,
      getCellClass,
      getSlotData,
      pickDay,
    };
  },
});
</script>

<style lang="scss"></style>
