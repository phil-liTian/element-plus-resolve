import type { ObjectDirective, DirectiveBinding, ComponentPublicInstance } from 'vue'
import { on } from '@u/dom.ts'

type Nullable<T> = null | T

type DocumentHandler = <T extends MouseEvent>(mouseup: T, mousedown: T) => void

type FlushList = Map<
  HTMLElement,
  {
    documentHandler: DocumentHandler,
    bindingFn: any 
  }[]
>

let nodeList: FlushList = new Map()
let startClick: MouseEvent

on(document, 'mousedown', (e: MouseEvent) => startClick = e)
on(document, 'mouseup', (e: MouseEvent) => {
  for( const handlers of nodeList.values() ) {
    for( const { documentHandler } of handlers ) {
      // e鼠标抬起时的事件对象 startClick是鼠标按下时的事件对象
      documentHandler(e, startClick)
    }
  }
})

const createDocumentHandler = (el: HTMLElement, binding: DirectiveBinding) : DocumentHandler => {
  let excludes: HTMLElement[] = [] 


  return (mouseup, mousedown) => {
    const poperRef = (binding.instance as ComponentPublicInstance<{ poperRef: Nullable<HTMLElement> }>).poperRef
    const mouseupTarget = mouseup?.target as Node
    const mousedownTarget = mousedown?.target as Node
    const isSelf = el === mouseupTarget
    if( isSelf ) return
    binding.value(mouseup, mousedown)
  }
}


const ClickOutside: ObjectDirective = {
  beforeMount(el, binding) {
    // binding 是一个对象 包含属性有:
    // value 传递给指令的值
    // oldValue 之前的值
    // arg: 传递给指令的参数 v-directive:foo ==> arg: 'foo'
    // modifiers: 包含修饰符的对象 v-directive.foo.bar ==> modifiers: { foo: true; bar: true }
    // instance: 使用该指令的组件实例
    // dir: 指令的定义对象
    if( !nodeList.has(el) ) {
      nodeList.set(el, [])
    }

    nodeList.get(el).push({
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value
    })
  },

  updated(el, binding) {
    if( !nodeList.has(el) ) {
      nodeList.set(el, [])
    }

    const handlers= nodeList.get(el)
    const oldHandlerIndex = handlers.findIndex(item => item.bindingFn === binding.oldValue)
    const newHandler = {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value
    }
    if( oldHandlerIndex > -1 ) {
      // 如果已有，则替换
      handlers.splice(oldHandlerIndex, 1, newHandler)
    } else {
      handlers.push(newHandler)
    }
  },

  unmounted(el) {
    nodeList.delete(el)
  }
}

export default ClickOutside