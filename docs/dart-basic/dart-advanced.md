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