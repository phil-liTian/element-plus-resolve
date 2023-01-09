## 基于dayjs封装日历组件


## dayjs 学习笔记

1. dayjs() 可获取dayjs定义的格式的时间，dayjs格式的对象可以链式调用
2. dayjs可通过add(num, type)、subtract(num, type) 方法 实现日期的增减操作
3. 可以通过isSame(dayjs: Dayjs, type) 来比较两个时间是否相同
4. 使用endOf(type)、startOf(type)获取开始或者结束时间
5. 使用day()可以获取当前时间是周几，使用date()获取当前是几号 == 一系列操作对时间的处理非常方便