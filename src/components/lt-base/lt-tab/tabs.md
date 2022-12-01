## tabs组件学习笔记

### 就tabs组件整体架构而言，对于复杂逻辑的组件,使用render来实现会更好。在vue3中使用render来实现组件，render函数与setup函数同级别。在render函数中可以使用this，在render函数的this中，可以解构出setup函数返回的内容。

### 当父组件中的内容需要由子组件中的内容确定的时候，可以使用provide和inject。这里需要注意的是，inject的函数可以在子组件被创建的时候执行，这是会触发父组件中的方法，从而实现在父组件中使用子组件的内容。在父组件中需要使用到子组件的时候，可以直接使用子组件的uid做唯一标识

### 当使用render函数的时候，可以从当前组件实例的subTree里面的children来获取所有的子元素，即instance.subTree.children

### 就v-model双向绑定的值而言，我们希望在这个双向绑定的值发生变化前执行某中逻辑的时候，props可以接受一个方法，这个方法可以是一个promise对象，当promise被resolve之后才能改变v-model的值

### ref中的值可以是一个函数的返回值

### 使用provide和inject可实现跨级组件通讯

### h函数的第二个参数可用来进行父传子，传递参数；且可以调用方法，注意这里方法是以on开头，@不可用；当某个属性可能需要被强制更新时，可采用传参forcuUpdate实现
