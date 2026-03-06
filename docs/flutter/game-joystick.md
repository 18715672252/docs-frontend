# 游戏摇杆的实现

## 基本思路
::: info 
如下图所示，是控制柄的四个瞬间，灰色区域是组件的占位空间。小圆的圆心只能在大圆的区域内运动。 所以组件尺寸 size 和小圆半径 handleRadius 可以确定大圆半径bgR = size/2 - handleRadius 在移动过程中，获取到触点位置，计算小圆偏移即可。

:::

## 通过手势控制实现摇杆效果
::: info 
通过 GestureDetector 可以监听到手指在组件上的触碰信息。
在 onPanUpdate 时可以获取触点信息，onPanEnd 是手指离开时，可以重置偏移。
将 ValueNotifier 对象传入画板中用来触发画布更新。
:::


## 代码实现

``` dart 
import 'dart:async';
import 'dart:math';
import 'dart:ui';

import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    debugShowCheckedModeBanner: false,
    home: MyApp(),
  ));
}


class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<StatefulWidget> createState() => MyAppState();
}

class MyAppState extends State<MyApp> {
  late ValueNotifier<Offset> offsetXy;

  double angle = 0.0;

  double dis = 0.0;

  @override
  void initState() {
    super.initState();
    offsetXy = ValueNotifier(Offset.zero);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: Column(
            children: [
              GestureDetector(
                onPanEnd: (details) {
                  offsetXy.value = Offset(0.0, 0.0);
                },
                onPanUpdate: (details) {
                  final offset = details.localPosition;
                  double dx = 0.0;
                  double dy = 0.0;
                  // 150为大圆宽度
                  dx = offset.dx - 150;
                  dy = offset.dy - 150;
                  var rad = atan2(dx, dy);
                  if (dx < 0) {
                    rad += 2 * pi;
                  }
                  // 大圆的宽度减去小圆的宽度
                  var bgR = 150 - 30;
                  var thta = rad - pi / 2; //旋转坐标系90度
                  var d = sqrt(dx * dx + dy * dy);
                  if (d > bgR) {
                    dx = bgR * cos(thta);
                    dy = -bgR * sin(thta);
                  }
                  setState(() {
                    angle = rad;
                    dis = d;
                  });
                  offsetXy.value = Offset(dx, dy);
                },
                child: Container(
                  width: 300,
                  height: 300,
                  color: Colors.grey,
                  child: CustomPaint(
                    painter: Joystick(offsetXy),
                  ),
                ),
              ),
              Text('角度：$angle'),
              Transform.rotate(
                angle: angle,
                child: Container( color: Colors.blue, width: 100, height: 100),
              ),
              Text('距离：$dis'),
              Slider(value: dis, min: 0.0, max: 200, onChanged: (val) {})
            ],
          ),
        ),
      ),
    );
  }
}

class Joystick extends CustomPainter {
  ValueNotifier<Offset> aa;
  Joystick(this.aa) : super(repaint: aa);
  Paint outCircle = Paint()
    ..style = PaintingStyle.fill
    ..isAntiAlias = true;
  double handleR = 30;
  @override
  void paint(Canvas canvas, Size size) {
    canvas.save();
    canvas.translate(size.width / 2, size.height / 2);
    canvas.drawCircle(Offset.zero, size.width / 2 - handleR,
        outCircle..color = Colors.blue.withAlpha(100));
    canvas.drawCircle(
        aa.value, handleR, outCircle..color = Colors.blue.withAlpha(200));
    canvas.drawLine(
        Offset.zero,
        aa.value,
        Paint()
          ..color = Colors.red
          ..strokeWidth = 2);
    canvas.restore();
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return true;
  }
}



```