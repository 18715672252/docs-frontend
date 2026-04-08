# setState异步原理

## 老版本setState原理


::: info 
理解：
老版本的会通过batchedUpdates调用点击事件的<br>
回调函数，调用之前会用一个变量保存异步的标志位<br>
当点击事件调用完成后，又会将这个变量置为同步的标志位<br>

如果点击事件的回调函数中有异步任务（回调）的话，<br>
那这个异步任务就会在标志位变为同步的时候执行<br>

这也是为什么react16之前，在合成事件内部setState是异步的<br>
在setTimeout中是同步的原因<br>


React16以后再合成事件内部和setTimeout中都是异步的原因是<br>
遇到优先级相同的就直接return



:::

``` js 
// 老版本源码
export function batchedUpdates<A, R>(fn: A => R, a: A): R {
  const prevExecutionContext = executionContext;
  // 可以获取获取到BatchedContext这个上下文，异步执行
  executionContext |= BatchedContext;
  try {
    // fn即为点击事件的回掉函数
    // 如果fn里面有异步操作，就会等到executionContext变成原始的prevExecutionContext在执行
    // 所以变成同步了
    return fn(a);
  } finally {
    // executionContext置为原来的上下文，即同步执行
    executionContext = prevExecutionContext;
    if (executionContext === NoContext) {
      // Flush the immediate callbacks that were scheduled during this batch
      resetRenderTimer();
      flushSyncCallbackQueue();
    }
  }
}
```