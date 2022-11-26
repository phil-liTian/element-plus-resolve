## 学习loading组件笔记

### createVNode与h函数作用相同，都是生成一个vNode（是js对象表示一个dom结构，也即虚拟dom），需要注意的是，虽二者作用相同，但就渲染效率而言，vue3对createVNode方法做了优化，渲染速度更快。两个函数都可有三个参数(dom元素, 属性、方法, children[]).

### render函数：render函数作用实际与template模版写法一样，都是创建一个html模板。但是需要注意的是，template语法适用简单逻辑，而当使用场景涉及到冗长繁琐且有大量重复的时候，使用render函数更具优势。
    1. render函数渲染没有编译过程
    2. template语法更易理解，但灵活性不足； render语法对使用者要求更高，学习成本更高
    3. 在render函数中就不再有大胡子语法了，可使用jsx的语法

### vue3自定义指令

```js
const myDirectives = {
  // 事件监听器应用之前
  created(el, binding, vnode, preVnode) {},

  // 在挂载到dom之前执行
  beforeMount(el, binding, vnode, preVnode) {},

  // 挂载到dom之后执行
  mounted(el, binding, vnode, preVnode) {},

  // 父元素更新之前调用
  beforeUpdate(el, binding, vnode, preVnode) {},

  // 更新之后调用
  updated(el, binding, vnode, preVnode) {},

  // 卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},

  // 卸载之后调用
  unmounted(el, binding, vnode, prevVnode) {},
}


// binding有如下属性：value、oldValue、arg、modifiers

/**
 * value为指令传递的值
 * oldValue: 之前的值
 * arg：传递给指令的参数
 * modifiers: 一个包含修饰符的对象
 * instance: 使用该组件的实例
 */
```