# CutomPaint结合Path的路径动画

```dart
import 'package:flutter/material.dart';

class CanvasBtn extends StatefulWidget {
  const CanvasBtn({super.key});

  @override
  State<CanvasBtn> createState() => _CanvasBtnState();
}

class _CanvasBtnState extends State<CanvasBtn>
    with SingleTickerProviderStateMixin {
  late AnimationController an;

  int anDuration = 5;

  @override
  void initState() {
    super.initState();

    an = AnimationController(
      vsync: this,
      duration: Duration(seconds: anDuration),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('自定义按钮组件')),
      body: Center(
        child: AnimatedBorderButton(
          an: an,
          w: 150,
          h: 60,
          radius: 30,
          anDuration: anDuration,
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          if (an.isCompleted) {
            an.reverse();
          } else {
            an.forward();
          }

          print(an.status);
        },
        child: Icon(Icons.start),
      ),
    );
  }
}

class AnimatedBorderButton extends StatelessWidget {
  const AnimatedBorderButton({
    super.key,
    required this.an,
    required this.w,
    required this.h,
    required this.radius,
    required this.anDuration,
  });

  final AnimationController an;

  final double w;

  final double h;

  final double radius;

  final int anDuration;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: w,
      height: h,
      child: Stack(
        children: [
          Positioned.fill(
            child: CustomPaint(
              size: Size(w, h),
              painter: BtnPainter(an, radius: radius, anDuration: anDuration),
            ),
          ),
          Material(
            shape: RoundedRectangleBorder(
              // side: BorderSide(
              //   // color: Colors.black,
              //   width: 1,
              //   style: BorderStyle.solid,
              // ),
              borderRadius: BorderRadius.circular(radius),
            ),
            color: Colors.blue,
            child: InkWell(
              borderRadius: BorderRadius.circular(radius),
              splashColor: Colors.red,
              highlightColor: Colors.amberAccent,
              onTap: () {
                an.forward();
              },
              child: SizedBox(
                width: w,
                height: h,
                child: 
                Center(
                  child: AnimatedBuilder(
                    animation: an,
                    builder: (ctx, widget) {
                      return Text('确认${(an.value * anDuration).toInt()}s');
                    },
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
      // CustomPaint(size: Size(300, 300), painter: BtnPainter(an)),
    );
  }
}

class BtnPainter extends CustomPainter {
  BtnPainter(this.an, {this.radius = 0, this.anDuration = 10})
    : super(repaint: an);

  double radius;

  Animation an;

  int anDuration;
  final Paint _paint =
      Paint()
        ..strokeWidth = 4
        ..color = Colors.red
        ..style = PaintingStyle.stroke; // 画出的图形不填充内部
  @override
  void paint(Canvas canvas, Size size) {
    Path path = Path();

    path.addRRect(
      RRect.fromRectAndRadius(
        Rect.fromCenter(
          center: size.center(Offset.zero),
          width: size.width,
          height: size.height,
        ),
        Radius.circular(radius),
      ),
    );

    // path路径单元的集合
    PathMetrics pathMetrics = path.computeMetrics();

    // 获取第一个路径单元的路径信息
    PathMetric pathMetric = pathMetrics.first;

    // 截取第一个路径单元的信息
    Path extractPath = pathMetric.extractPath(
      0.0,
      // pathMetric.length
      pathMetric.length * an.value,
    );

    canvas.drawPath(extractPath, _paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return true;
  }
}


```