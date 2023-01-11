<template>
  <div class="lt-calendar">
    <div class="lt-calendar__header">
      <div class="lt-calendar__title">{{ iDate }}</div>
      <div v-if="!validateRange.length" class="lt-calendar__button-group">
        <lt-button-group>
          <lt-button size="mini" @click="selectDate('prev-month')"
            >prevMonth</lt-button
          >
          <lt-button size="mini" @click="selectDate('today')">today</lt-button>
          <lt-button size="mini" @click="selectDate('next-month')"
            >nextMonth</lt-button
          >
        </lt-button-group>
      </div>
    </div>
    <div v-if="validateRange.length === 0" class="lt-calendar__body">
      <date-table :date="date" :selected-day="realSelectedDay" @pick="pickDay">
        <template v-if="$slots.dateCell" #dateCell="data">
          <slot name="dateCell" v-bind="data"></slot>
        </template>
      </date-table>
    </div>

    <div v-else class="lt-calendar__body">
      <date-table
        v-for="(_range, index) in validateRange"
        :key="index"
        :date="_range[0]"
        :range="_range"
        :hide-header="index !== 0"
        @pick="pickDay"
      >
        <template v-if="$slots.dateCell" #dateCell="data">
          <slot name="dateCell" v-bind="data"></slot>
        </template>
      </date-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "@vue/runtime-core";
import DateTable from "./date-table.vue";
import { useLocalInject } from "../hooks/use-locale";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/zh-cn";
import { props, DateType } from "./calendar";
import { UPDATE_MODEL_EVENT } from "@u/constant.ts";

export default defineComponent({
  name: "LtCalendar",
  components: { DateTable },
  props,
  setup(props, { emit }) {
    const { t } = useLocalInject();
    const selectedDay = ref(null);
    const now = dayjs();

    // computed
    // 上一个月
    const prevMonthDayjs = computed(() => {
      return date.value.subtract(1, "month");
    });

    // 下一个月
    const nextMonthDayjs = computed(() => {
      return date.value.add(1, "month");
    });

    const realSelectedDay = computed({
      get() {
        if (!props.modelValue) return selectedDay.value;
        return date.value;
      },

      set(val: Dayjs) {
        selectedDay.value = val;
        const result = val.toDate();
        emit(UPDATE_MODEL_EVENT, result);
        emit("input", result);
      },
    });

    // 当前显示的时间
    const iDate = computed(() => {
      return `${date.value.year()} ${date.value.format("M")}月`;
    });

    const date = computed(() => {
      if (props.modelValue) {
        return dayjs(props.modelValue);
      } else {
        // 没有传入modelValue
        if (realSelectedDay.value) {
          return realSelectedDay.value;
        } else if (validateRange.value.length) {
          return validateRange.value[0][0];
        }
        return now;
      }
    });

    // 返回一个二维数组
    const validateRange = computed(() => {
      if (!props.range) return [];
      const rangeArrDayjs = props.range.map((_) => dayjs(_));
      const [startDayjs, endDayjs] = rangeArrDayjs;
      // 结束时间必须大于开始时间
      if (startDayjs.isAfter(endDayjs)) {
        console.warn("end time should be greater than start time");
        return [];
      }

      if (startDayjs.isSame(endDayjs, "month")) {
        // 开始时间和结束时间是同一个月, 这是展示的时间范围为开始时间所在周的开始到结束时间所在周的结束
        return [[startDayjs.startOf("week"), endDayjs.endOf("week")]];
      } else {
        // TODO: 月份不同
        if (startDayjs.add(1, "month").month() !== endDayjs.month()) {
          // 相差不是一个月
          console.warn(
            "start time and end time interval must not exceed two month"
          );
          return [];
        }
        // 结束时间月份的第一天
        const endMonthFirstDay = endDayjs.startOf("month");
        // 结束时间月份第一天的这周的开始日期
        const endMonthFirstWeekDay = endMonthFirstDay.startOf("week");
        let endMonthStart = endMonthFirstDay;
        // 如果开始时间的最后一天和结束时间的第一天是同一个月，这时结束月份的第一天应是开始月份最后一天加1
        if (!endMonthFirstDay.isSame(endMonthFirstWeekDay, "month")) {
          endMonthStart = endMonthFirstDay.endOf("week").add(1, "day");
        }

        const res = [
          [startDayjs.startOf("week"), startDayjs.endOf("month")],
          [endMonthStart, endDayjs.endOf("week")],
        ];

        return res;
      }
    });

    // 改变实际选中的日期
    const pickDay = (day: Dayjs) => {
      realSelectedDay.value = day;
    };

    // 选择时间
    const selectDate = (type: DateType) => {
      let day: Dayjs;
      if (type === "prev-month") {
        day = prevMonthDayjs.value;
      } else if (type === "next-month") {
        day = nextMonthDayjs.value;
      } else {
        day = now;
      }

      if (day.isSame(date.value, "day")) return;
      pickDay(day);
    };

    return {
      date,
      iDate, // 左上角显示的时间
      realSelectedDay, // 选中的时间
      selectDate, // 选择时间
      pickDay,
      validateRange,
    };
  },
});
</script>

<style lang="scss">
@import "./lt-calendar.scss";
</style>
