# 合成事件原理


## React17以后和以前的区别

::: info 
React17及以后的版本是委托给根节点#root
React17以前委托给document



JSX中：onClick是给JSX元素绑定属性，不是绑定事件

1.在组件渲染的时候，如果发现有onXXX（例：onClick）这样的属性，不会给当前元素绑定事件，
只是把绑定方法赋值给元素的相关onXXX（onClick）的属性

2.然后对#root做了事件绑定。来做事件委托
:::




## 源码

``` js 
// 伪代码
#root.addEventListener('click', (ev) => { // 冒泡阶段
    let path = ev.path // 事件触发所经过的所有元素的数组
    path.fortEach(ele => {
        let handle = ele.onClick
        if (handel) handle()    
    })
}, false)
#root.addEventListener('click'. (ev) => { // 铺货
    let path = ev.path // 事件触发所经过的所有元素的数组
    [...path].reverse.fortEach(ele => {
        let handle = ele.onClickCapture
        if (handel) handle()    
    })
}, true)


```

::: info 
1.视图渲染的时候，遇到React的合成事件绑定，并没有给元素绑定事件，而是把相应的函数当属性值绑定给了onXXX（onClick）<br>
2.给#root绑定了，铺货和冒泡<br>
    + 在事件触发的时候会冒泡或者铺货到给#root绑定的方法中（冒泡方法和铺货方法）<br>
    + 在给#root绑定这两个方法中，会获取事件触发所经过的所有元素<br>
    + 获取到事件触发所经过的所有元素后，会查看这些有没有onXXX（onClick）这些属性，有的话获取这些属性的属性值，并执行<br>
    
总结：合成事件绑定，并没有给元素绑定事件，而是给元素这是onXXX（onClick这样属性），再把要执行的函数赋值给这个属性。<br>
当事件行为触发，根据原生事件的传播机制，都会传播到root容器上，React内部给#root做了事件绑定（铺货与冒泡）<br>
当事件传播到root的时候，会根据ev.path分析事件传播的路径，并获取这条路经上的所有元素，<br>
然后再依次获取这些元素的onXXX属性，并执行<br>

说明：这也是为什么同onClick绑定方法，要经过处理，不然里面的this会获取不到<br>


:::