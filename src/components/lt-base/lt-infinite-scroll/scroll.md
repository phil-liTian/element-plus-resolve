# 注意理解scrollTop、scrollHeight、clientHeight的概念

## scrollTop是距离顶部滚动的距离，这个距离是包含滚动条的

## scrollHeight是滚动的高，包含由于溢出导致的不可见的内容

## clientHeight是内部元素高度，包含padding区域，不包含滚动条，边框和外边距


# MutationObserver的实例方法

## observe 启动监听（node: 观察的dom节点, config: 配置信息是一个对象）

```js
1. childList：子节点的变动（指新增，删除或者更改）。
2. subtree：布尔值，表示是否将该观察器应用于该节点的所有后代节点。
3. attributes：属性的变动。
```
## disconnect用来停止观察


# 自定义指令