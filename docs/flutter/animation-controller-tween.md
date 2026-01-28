# 动画控制器结合Tween


## 方法一
::: tip 
通过控制器的drive方法:<br>
_controller.drive(Tween(begin: Offset(0, 0), end: Offset(1, 1))),
:::
```dart
import 'package:flutter/material.dart';

void main(List<String> args) {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Demo(),
    );
  }
}

class Demo extends StatefulWidget {
  final String widgets = '祖先widget里面的数据';
  const Demo({super.key});

  @override
  State<Demo> createState() => _DemoState();
}

class _DemoState extends State<Demo> with SingleTickerProviderStateMixin{

  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: Duration(seconds: 2));
    _controller.forward();

  }

  @override
  Widget build(BuildContext context) {
    
    
    return Scaffold(
      body: SizedBox(
        width: double.infinity,
        height: double.infinity,
        child: Column(
          children: [
            SlideTransition(
              position: _controller.drive(Tween(begin: Offset(0, 0), end: Offset(1, 1))),
              child: Container(
                width: 100,
                height: 100,
                color: Colors.red,
              ),
            )
          ],
        ),
      ),
    );
  }
}


```

## 方法二
::: tip 
通过Tween的animate方法：<br>
Tween(begin: Offset(0, 0), end: Offset(1, 1)).animate(_controller)
:::
```dart
import 'package:flutter/material.dart';

void main(List<String> args) {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Demo(),
    );
  }
}

class Demo extends StatefulWidget {
  final String widgets = '祖先widget里面的数据';
  const Demo({super.key});

  @override
  State<Demo> createState() => _DemoState();
}

class _DemoState extends State<Demo> with SingleTickerProviderStateMixin{

  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: Duration(seconds: 2));
    _controller.forward();

  }

  @override
  Widget build(BuildContext context) {
    
    
    return Scaffold(
      body: SizedBox(
        width: double.infinity,
        height: double.infinity,
        child: Column(
          children: [
            SlideTransition(
              position: Tween(begin: Offset(0, 0), end: Offset(1, 1)).animate(_controller),
              child: Container(
                width: 100,
                height: 100,
                color: Colors.red,
              ),
            )
          ],
        ),
      ),
    );
  }
}



```


## Tween驱动动画的进阶用法
```dart
// 指定Tween的动画曲线
Tween(begin: Offset(0, 0), end: Offset(1, 1))
  .chain(CurveTween(curve: Curves.bounceInOut))
  .animate(_controller)



// 指定Tween的执行动画的时间区域CurveTween(curve: Interval(0.5, 1))
// 动画控制器执行总时间的前一半什么动画都不执行
// 后一半时间用来执行动画
Tween(begin: Offset(0, 0), end: Offset(1, 1))
  .chain(CurveTween(curve: Interval(0.5, 1)))
  .animate(_controller)
```

