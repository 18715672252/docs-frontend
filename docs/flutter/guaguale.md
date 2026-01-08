# 刮刮乐效果制作
```dart{100}
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
  Path path = Path();

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Stack(
        children: [
          Positioned.fill(
            child: FittedBox(child: Text('一等奖'),),
          ),
          SizedBox(
            width: double.infinity,
            height: double.infinity,
            child: GestureDetector(
              onPanUpdate: (DragUpdateDetails details) {
                setState(() {
                  path.lineTo(
                      details.localPosition.dx, details.localPosition.dy);
                });
              },
              onPanDown: (details) {
                path.moveTo(details.localPosition.dx, details.localPosition.dy);
              },
              child: CustomPaint(
                size: Size(double.infinity, double.infinity),
                painter: MyCustomPainter123(path),
              ),
            ),
          )
        ],
      ),
    );
  }
}

class MyCustomPainter123 extends CustomPainter {
  MyCustomPainter123(this.path2);

  late Path path2;

  // List<Offset> list;

  Paint p = Paint();

  TextPainter text = TextPainter(
    textDirection: TextDirection.ltr,
    text: TextSpan(
      text: '一等奖',
      style: TextStyle(fontSize: 80, color: Colors.red),
    ),
  );
  @override
  void paint(Canvas canvas, Size size) {
    text.layout();
    final w = size.width;
    final h = size.height;
    p.color = Colors.brown; // 绘制点线面的颜色
    p.style = PaintingStyle.fill; // 填充还是描边
    p.strokeWidth = 10; // 当是描边时边的宽度
    canvas.saveLayer(Rect.fromLTWH(0, 0, w, h), p);
    p.color = Colors.blue;
    // 还是基于原点绘制
    canvas.drawRect(Rect.fromLTWH(0, 0, w, h), p);
    // 绘制的位置显示为透明也会覆盖下面的颜色
    p.blendMode = BlendMode.clear;

    p.color = Colors.black.withAlpha(0);
    p.style = PaintingStyle.stroke;
    p.strokeJoin = StrokeJoin.miter;
    canvas.drawPath(path2, p);

    canvas.restore();
    p.color = Colors.deepPurpleAccent;
    canvas.drawCircle(Offset(0, 0), 40, p);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return true;
  }
}
```