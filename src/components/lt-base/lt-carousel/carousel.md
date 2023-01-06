## 笔记

## 轮播实现当当前是第一张的时候，前一张是最后一张的内容，当当前是最后一张的时候，后一张是第一张的内容，具体实现是依赖processIndex方法

### 当前是当前是第一张切循环到最后一张的时候，将下标置为-1

## 还有一个当父组件中内容，依赖自组件中内容的时候，可以结合provide和inject实现，在子组件mounted的时候，通过父组件provide的方法往父组件的变量中push内容，这样一来，在父组件中就可以使用子组件中的内容


## 在composition api中也需注意，ref reactive computed methods watch 钩子函数的位置也需分类放置