# 类与对象


## 构造函数-默认构造函数
::: warning
与类名同名的函数，再实例化时，自动调用
:::
```dart
class Person {


  num x, y;

  // 默认构造函数
  Person(num x, num y) {
    this.x = x;
    this.y = y;
  }
}


```

## 构造函数-命名构造函数
```dart
class Person {


  num x, y;

  // 命名构造函数
  Person.origin() {
    x = 0;
    y = 0;
  }

}

// 使用命名构造函数创建对象
var p = Person.origin();
```

## 构造函数-工厂构造函数(单例模式)
::: warning
工厂构造函数不会自动生成实例，需要代码的判断来决定返回的实例<br>
使用factory关键字声明工厂构造函数<br>
工厂函数中不能使用this<br>
不能使用new，如果想要实例化，可以在工厂构造函数中返回一个子实例<br>
:::
```dart

class Person {


  String name;

  static Person? instance;



  factory Person(String name) {
    Person.instance ??= Person.self(name);

    return Person.instance!;
  }

  Person.self(this.name);
}


void main(List<String> args) {
  var p = Person('孙');

  print(p);
}

```


## 访问修饰符
::: warning
类中属性不加修饰符默认是public<br>
私有的在属性前面加下划线<br>
文件级别的私有属性<br>
私有属性只能类内部才能访问，实例化的子类想要访问，可使用get<br>
:::
```dart
class Person {


  String name;
  

  // 私有属性
  int _age;


  // 私有的方法
  void _wifi() {
    return 200;
  }


  // 私有属性的Getter，解决外部无法访问的问题
  int get age {
    return _age;
  }

  // Setter
  set age(int value) {
    _age = value;

  }

  Person(this.name, this._age);
}



```


## 初始化列表和重定向构造函数
```dart
class Rect {
  int w;
  int h;

  Rect(this.w, this.h);
  

  // 初始化列表
  // Rect(): w = 20, h = 20 {
  //   print(w);
  //   print(h);
  // }

  // 重定向构造函数
  Rect.r1(int h, int w): this(h, w);
}



```


## 静态属性和方法
::: warning
静态方法中不能使用this关键字,，只能通过名字访问<br>
不能使用this关键字访问静态属性<br>
静态方法不能访问非静态的属性<br>
非静态的方法可以访问任何属性
:::


## 继承
::: info
1. 继承后，子类可以使用父类中可见的内容<br>
2. 子类中可以通过@override“覆写”方法<br>
3. 子类中可以通过super关键字来引用父类中的可见内容（属性，普通方法，普通构造函数，命名构造函数）<br>


:::

```dart
class Father {
  String name;
  int money;
  int? dd;
  Father(this.name, this.money, [this.dd]);

  Father.orinig(this.name, this.money, [this.dd]);
}


class Son extends Father {
  int a;
  String name;
  int money;
  // 通过 super继承父类的普通构造函数
  // Son(this.a, this.money, this.name):super(name, money, 9999);


  // 通过 super继承父类的命名构造函数
  Son(this.a, this.money, this.name):super.orinig(name, money);

  // 命名构造函数 通过super继承父类的命名构造函数
  Son.origin(this.a, this.money, this.name):super.orinig(name, money);
}



void main(List<String> args) {

  var a = Son(999, 99, 'llll');
  print(a.a);
  print(a.dd);
}

```

## 抽象类

::: info 
1. 抽象类用abstract关键字修饰的类
2. 抽象类的作用是当作普通类的模板，约定一些必要的属性和方法
3. 抽象方法是值没有方法体的方法
4. 抽象类不能被实例化
5. 抽象类还可以当作接口（implements）被实现


:::
```dart
abstract class Phone {

  double price;

  Phone(this.price);
  // 抽象方法
  void processer();

  // 抽象方法
  void camera();
}


class Xiaomi extends Phone {

  double weight;

  // 赋值自己的属性和调用super赋值父类的属性
  Xiaomi(this.weight, double price):super(price);

  @override
  void camera() {
  }

  @override
  void processer() {
  }
  
}



void main(List<String> args) {
  var a = Xiaomi(200, 1999);


  print(a.weight);

  print(a.price);

}


```

## 接口
::: info
1. 接口可以是任意的类，但是一般使用抽象类
2. 一个类可以实现多个接口，多个接口用逗号分隔
3. 接口可以看作一个个小零件，类实现接口就相当于组装零件
4. 普通类实现接口后，必须实现接口中的所有属性和方法
:::

```dart

abstract class Processer {
  late String cores;

  arch(String name);

}


abstract class Camera {
  late String res;

  brand(String name);
}


//  普通类实现接口后，必须实现接口中的所有属性和方法
class Phone implements Processer, Camera {
  @override
  String cores;

  @override
  String res;

  Phone(this.cores, this.res);

  @override
  arch(String name) {
  }

  @override
  brand(String name) {
  }
}



```


## 混入
::: info
1. 将类当作混入的话，这个类只能继承自Object，不能继承其他类
2. 作为混入的类不能有构造函数
3. 可以通过mixin关键字声名混入，使用with使用混入
4. 后引入的混入权限高

:::
```dart
mixin A {
  late String a;
}


mixin B {
  late String b;

}


class Abc with A, B {
  Abc(String a, String b) {
    this.a = a;
    this.b = b;
  }


  ss() {
    print(a);
  }
}


```
