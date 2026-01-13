# 自定义滚动时到边缘的效果


## 触底颜色
```dart
import 'dart:math';

import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Text Path Animation',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: Demo(),
    );
  }
}

class Demo extends StatefulWidget {
  const Demo({super.key});

  @override
  State<Demo> createState() => _DemoState();
}

class _DemoState extends State<Demo> {
  List<bool> l = [true, false, true];

  showSnackBarS(BuildContext ctx) {
    final s = SnackBar(content: Text('提示雄安锡'));
    ScaffoldMessenger.maybeOf(ctx)!.showSnackBar(s);
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('小组件'),
      ),
      body: Scrollbar(
        child: ScrollConfiguration(
          behavior: MyBehavior(),
          child: ListView.builder(
            itemExtent: 80,
            itemCount: 30,
            itemBuilder: (BuildContext ctx, int index) {
              return Container(
                width: double.infinity,
                color: Colors.primaries[Random().nextInt(18)],
                child: Text('$index'),
              );
            }
          ),
        ),
      ),
    );
  }
}


class MyBehavior extends ScrollBehavior {

  @override
  Widget buildOverscrollIndicator(ctx, child, axis) {
    return GlowingOverscrollIndicator(
      axisDirection: axis.direction, 
      color: Colors.black26,
      child: child
    );
  }

  @override
  ScrollPhysics getScrollPhysics(BuildContext context) {
    return ClampingScrollPhysics(parent: RangeMaintainingScrollPhysics());
  }

}

```