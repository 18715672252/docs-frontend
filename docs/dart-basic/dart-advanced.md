# dart高级


## 扩展（extension关键字）
::: info 
extension可以扩展对象的内容<br>
扩展不仅可以定义方法，还可以定义getter，setter，operator
:::
```dart
// 在字符串类上添加方法
// 类似于在JS构造函数的prototype添加方法
extension StringExtension on String {
  parseInt() {
    return int.parse(this);
  }
}

```



## call
::: info
把类的实例当作函数来使用会默认调用类的call方法
:::
```dart
class Ios {
  call(int a) {
    print(a)
  }
}
var a = Ios();
// 把实例当作函数执行会默认执行类的call方法
a(1);



```

## onSuchMethod
::: info 
当调用一个类的未定义的方法时，dart会默认调用onSuchMethod
使用前提：<br>
1. 类中声明了onSuchMethod，否在调用默认的
2. 实例化的对象必须用dynamic来声明

:::


## hashCode
::: info 
1. hashCode是dart对象的唯一标识
2. hashCode表现为一串数字
3. Dart中每个对象都有hashCode
4. 可以通过hashCode来判断两个对象是否相等

:::



## typedef 
```dart
// 相当于ts的type，可以声明函数的类型
typedef int fn(int a, int b);
class Adb {
  final fn callBack;

  final v fn1;

  Adb(this.callBack);
}


```

## Future
::: info 
 * Future的三种状态
   * 1. Uncompleted
   * 2. then --> Completed with data
   * 3. catchError --> Completed with error
   * 4. thenComplete --> 错误和正确都会走
 
  * Future的执行顺序
    * 1. Future.sync(computation) 同步任务
    * 2. Future.microtask(computation) 微任务
    * 3. Future.value(val)
      * val是常量等同于microtask
      * val是异步，按照异步的处理逻辑
    * 4. Future((){}) 宏任务
  * Future多任务
    * 1. Future.any(futures) 相当于Promise.race
    * 2. Future.wait(futures) 相当于Promise.all
    * 3. Future.doWhile() // 按条件执行多个future
    * 4. Future.forEach
:::
```dart




```
### Future.builder
```dart



```



## 生成器

### 同步生成器
```dart


 
Iterable<int> getNumber(int n) sync* {
  int i = 0;
  while(i < n) {
    yield i++;
  }
}


main () {
  var res = getNumber(5).iterator;
  // res.moveNext();
  // print(res.current); // 0 
  // res.moveNext();
  // print(res.current); // 1


  while(res.moveNext()) {
    print(res.current);
  }
} 
```

### 异步生成器