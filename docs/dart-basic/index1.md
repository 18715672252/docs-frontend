# dart基础


## 数据类型
```dart
// 1. Number
// 2. String 
// 3. Boolen
// 4. List
// 5. Set
// 6. Map
```


## Number
```dart
// 数字可以用三种关键声明
num a = 100;
int a = 200;
double a = 100.0;
// num可以整数也可以是小数

// double转整形是向下取整

// .round() 四舍五入
// .toStringAsFixed(4) 四舍五入小数点后四位

// 10.remainder(4) 10除4的余数

// 4.compareTo(12) 4和12比较大小，返回1前面的大，返回-1后面的大，返回0一样大

// 12.gcb(18) 返回12和18的最大公约数

// 1000.toStringAsExponential(2) 科学计数法



```


## 字符串类型
:::info
单引号和双引号都可以<br>
三个引号可以声明可以包含换行符

:::
```dart
var str = ''''aaaaa
7777777
kkkkk
'''


str.isEmpty // 判断字符串是否为空

str.isNotEmpty // 字符串不为空返回false


str.replaceAll('a', 'b') // 把a替换成b

str.contains('e') // 字符串是否包含字母e



```


## List  数组
```dart
List l1 = []; // 不限制数组中类型

List<int> l2 = []; // 声明泛型数组

// 不限制长度的空列表，growable标识数组是否具有成长性
List list = List.empty(growable: true); 

List list = List.filled(3, 0); // 数组长度3，元素都是0


l1.add() // 添加元素



[...?l6] // 兼容l6是否可扩展



l1.reversed // 数组颠倒，返回值不是数组，是个可迭代对象


l1.addAll([4,5,6]) // 添加多个元素

l1.remove() // 删除指定的元素

l1.removeAt() // 根据下标删除元素

l1.insert(1,9) // 在指定位置添加元素，原来位置的元素会向后移动一位

l1.clear() // 清空数组

l1.isEmpty // 判断数组是否为空


// 数组的遍历

l1.forEach() // 遍历

l1.map() // 遍历并处理元素，返回新的列表

l1.where() // 返回满足条件的数据

l1.any() // 只要有一项满足条件，即返回true

every // 每一项都满足条件，才返回true

l1.expand((item) => item).toList(); // 数组拉平


// 判断元素存不存在
List l = [1,2,3];
l.contains(1);


```



## Set 元素唯一，无序集合
::: warning
集合不能通过下表获取
:::
```dart
Set<int> s = {1, 2, 4};

Set<int> s1 = {4,5,6}

s.add() // 添加元素


s.toList() // 转化为数组
arr.toSet() // 转为集合，自动去重

s.addAll(['q', 'q']) // 添加元素


s.intersection(s1) // 求交集


s.union(s2) // 求并集

s.difference(s1) // 求差集

s.first // 返回第一个元素

s.last // 返回最后一个元素

```


## Map(字典，哈希)
```dart
Map<String, int> m = { 'a':  1}
m['b'] = 9;

// 判断key是否存在
m.containsKey('a') // 返回true

// 如果key不存在才赋值
m.putIfAbsent('c', () => 20)


m.keys //获取所有key

m.values // 获取所有的values

m.remove(key) // 删除元素

m.removeWhere((key, value) => true) // 哪一项返回true，哪一项删除



```


## 运算符
```dart

10 ~/ 4 // 除法的结果向下取整

is // 判断变量属于那种对象

?? // b ?? 10 b为null返回10，b不为null则返回b

??= // d ??= 100 d为null时才对d进行赋值

?.




```


## 函数
::: warning
函数的参数有两大类，四小类<br>
一：必填参数
二：可选参数
1. 必填默认参数
2. 可选参数
3. 命名可选参数
4. 命名必填参数
:::
```dart
// 默认必填参数
String user(String name) {}

// 默认必填参数和可选参数，并给可选参数添加默认值
String user(String name, [int age = 100]) {}
// 默认必填参数和可选参数并加上空安全
String user(String name, [int? age]) {}


// 默认必填参数, 可选参数，命名可选参数并添加默认值
String user(String name, [int age], { String sex = 200 }) {}

// 默认必填参数, 可选参数，命名可选参数并添加默认值
String user(String name, [int age], { required String sex = 200 }) {}


```


## 函数的泛型
```dart
// 泛型T
T getData<T>(T a) {
  return a;
}



```

## 枚举
::: info
数量固定的常量值，通过enum关键字声明
:::

```dart
enum Color {
  red,
  green,
  blue
}


// 获取枚举中所有的value
List<Color> colors = Color.values;

// 通过index获取枚举元素的索引值
int i = Color.green.index





```


## 第三方库的引入-仅引入部分内容
::: info
1. 包含引入
2. 排除引入
当库名命名冲突时，通过as声明别名

文件头部通过：<br>
libartry util 声明库名(util时库的名称)
:::

```dart
// 只将包中f1和f3暴露，来提供使用
import 'packed' show f1, f3; 

// 将包中f1和f3隐藏，包中的其他内容都可以使用
import 'packed' hide f1, f3; 


// 给增加别名，解决库名冲突的问题
import 'packed' as packed;
packed.f1()


// 延迟加载库（懒加载库）
import 'packed' deferred as pack;
Future greet() async {
  // 加载库
  await pack.loadLibrary()
  // 使用库中方法
  pack.f1()
}

```


## 分库与主库，part与part of
::: info
在分库文件中使用part of util;与主库建立联系
在主库文件中使用part 'sub1.dart';与分库建立联系
:::
```dart




```

