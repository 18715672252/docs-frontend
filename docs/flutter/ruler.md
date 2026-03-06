# 绘制刻度尺和滚动刻度尺

## 思路
::: info 
每次拖动都平移画布然后重新绘制刻度



:::

## 代码实现
``` dart 
import 'dart:ui' as ui;

import 'package:flutter/foundation.dart';
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
  late ValueNotifier<double> offsetXy;
  double dx = 0;

  double tranlateScale = 0;
  @override
  void initState() {
    super.initState();
    offsetXy = ValueNotifier(0);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: Column(
            children: [
              GestureDetector(
                onPanUpdate: (details) {
                  dx += details.delta.dx;
                  if (dx > 0) {
                    dx = 0.0;
                  }
                  // 4为刻度间隙，2为刻度宽度
                  var limitMax =
                      -(200 - 0) * (4 + 2);
                  if (dx < limitMax) {
                    dx = limitMax.toDouble();
                  }
                  offsetXy.value = dx;
                  setState(() {
                    tranlateScale =  -dx / (4 + 2);
                  });
                },
                child: Container(
                  width: 200,
                  height: 200,
                  color: Colors.grey,
                  child: CustomPaint(
                    painter: ScalePainter(offsetXy),
                  ),
                ),
              ),
              Text('当前移动的刻度：$tranlateScale'),
              Slider(value: tranlateScale, min: 0, max: 200, onChanged: (val) {})
            ],
          ),
        ),
      ),
    );
  }
}

class ScalePainter extends CustomPainter {
  ValueListenable<double> offsetXy;
  ScalePainter(this.offsetXy) : super(repaint: offsetXy);
  static const double _kHeightLevel1 = 20; // 短线长
  static const double _kHeightLevel2 = 25; // 5 线长
  static const double _kHeightLevel3 = 30; //10 线长
  static const double _kPrefixOffSet = 5; // 左侧偏移
  static const double _kVerticalOffSetTop = 12; // 线顶部偏移
  static const double _kStrokeWidth = 2; // 刻度宽
  static const double _kSpacer = 4; // 刻度间隙
  static const List<Color> _kRulerColors = [
    // 渐变色
    Color(0xFF1426FB),
    Color(0xFF6080FB),
    Color(0xFFBEE0FB),
  ];
  static const List<double> _kRulerColorStops = [0.0, 0.2, 0.8];
  static Paint pointPaint = Paint()
    ..color = Colors.purple
    ..strokeWidth = 1
    ..strokeCap = StrokeCap.round;
  static Path p = Path()
    ..moveTo(-5, 0)
    ..lineTo(5, 0)
    ..lineTo(0, 8)
    ..close();
  static Paint scale = Paint()
    ..color = Colors.lightBlue
    ..strokeWidth = _kStrokeWidth
    ..strokeCap = StrokeCap.round
    ..shader = ui.Gradient.radial(
        Offset(0, 0), 25, _kRulerColors, _kRulerColorStops, TileMode.mirror);
  @override
  void paint(Canvas canvas, Size size) {
    canvas.clipRect(Offset.zero & size);
    canvas.translate(_kStrokeWidth / 2 + _kPrefixOffSet, 0);

    // 画刻度
    canvas.save();
    canvas.translate(offsetXy.value, 0);
    // 从刻度0到刻度200
    for (int i = 0; i < 200; i++) {
      // 每5个一个中刻度
      if (i % 5 == 0 && i % 10 != 0) {
        canvas.drawLine(Offset(0, _kVerticalOffSetTop),
            Offset(0, _kHeightLevel2 + _kVerticalOffSetTop), scale);
        // 每10个1个大刻度
      } else if (i % 10 == 0) {
        canvas.drawLine(Offset(0, _kVerticalOffSetTop),
            Offset(0, _kHeightLevel3 + _kVerticalOffSetTop), scale);
        paintText(canvas, i,
            Offset(-_kStrokeWidth, _kHeightLevel3 + _kVerticalOffSetTop));
        // 平常小刻度
      } else {
        canvas.drawLine(Offset(0, _kVerticalOffSetTop),
            Offset(0, _kHeightLevel1 + _kVerticalOffSetTop), scale);
      }

      canvas.translate(_kStrokeWidth + _kSpacer, 0);
    }
    canvas.restore();
    canvas.drawPath(p, pointPaint);
  }

  paintText(Canvas canvas, int text, Offset offset) {
    TextPainter t = TextPainter(
      text: TextSpan(
        text: text.toString(),
        style: TextStyle(color: Colors.black),
      ),
      textDirection: TextDirection.ltr,
    );
    t.layout();
    t.paint(canvas, offset);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return true;
  }
}





```