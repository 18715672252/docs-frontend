# CustomPaint是一个绘图组件类似与html的Canvas

```dart
// 基础用法
class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: MyCustomPaint(),
    );
  }
}

class MyCustomPaint extends StatefulWidget {
  const MyCustomPaint({super.key});

  @override
  State<MyCustomPaint> createState() => _MyCustomPaintState();
}

class _MyCustomPaintState extends State<MyCustomPaint> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SizedBox(
          width: double.infinity,
          height: double.infinity,
          child: CustomPaint(
            painter: MyCanvas(),
          ),
        ),
      ),
    );
  }
}

class MyCanvas extends CustomPainter {
  // 创建画笔
  final _paint = Paint()..color 
               = Colors.red..strokeWidth 
               = 3..style = PaintingStyle.stroke;
  @override
  void paint(Canvas canvas, Size size) {
    // 填充模式
    _paint.style = PaintingStyle.fill;
    canvas.drawCircle(size.center(Offset.zero), 100, _paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return true;  
  }

}

```

## 高级用法
::: tip
CustomPainter类可以接收一个动画控制器
当前动画开始执行的时候，CustomPainter类的paint方法将不断重绘
:::
```dart
class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: MyCustomPaint(),
    );
  }
}

class MyCustomPaint extends StatefulWidget {
  const MyCustomPaint({super.key});

  @override
  State<MyCustomPaint> createState() => _MyCustomPaintState();
}

class _MyCustomPaintState extends State<MyCustomPaint>
    with SingleTickerProviderStateMixin {
  late AnimationController an;

  @override
  void initState() {
    super.initState();
    an = AnimationController(vsync: this, duration: Duration(seconds: 2));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SizedBox(
          width: double.infinity,
          height: double.infinity,
          child: CustomPaint(
            painter: MyCanvas(an),
          ),
        ),
      ),
      floatingActionButton: IconButton(
        onPressed: () {
          an.forward();
        },
        icon: Icon(Icons.start),
      ),
    );
  }
}

class MyCanvas extends CustomPainter {
  // 创建画笔
  final _paint = Paint()
    ..color = Colors.red
    ..strokeWidth = 3
    ..style = PaintingStyle.stroke;

  Animation an;
  MyCanvas(this.an) : super(repaint: an);
  @override
  void paint(Canvas canvas, Size size) {
    // 填充模式
    _paint.style = PaintingStyle.fill;
    // canvas.drawCircle(size.center(Offset.zero), 100, _paint);
    double rad = 6.28;
    canvas.drawArc(
        Rect.fromCircle(center: size.center(Offset.zero), radius: 100),
        0,
        rad * an.value,
        true,
        _paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return true;
  }
}
```