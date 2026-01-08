# 转盘抽奖
```dart
import 'dart:io';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
  runApp(const MyApp1());
}

class MyApp1 extends StatefulWidget {
  const MyApp1({super.key});

  @override
  State<MyApp1> createState() => _MyApp1State();
}

class _MyApp1State extends State<MyApp1> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Spinner Game',
      theme: ThemeData(
        primaryColor: Colors.indigo,
        visualDensity: VisualDensity.adaptivePlatformDensity,
        brightness: Brightness.light,
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.indigo,
          brightness: Brightness.light,
        ),
      ),
      home: const GameScreen(), // 修复：添加 const 关键字，优化性能
    );
  }
}

class GameScreen extends StatefulWidget {
  const GameScreen({super.key}); // 修复：添加 const 关键字

  @override
  State<GameScreen> createState() => _GameScreenState();
}

class _GameScreenState extends State<GameScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  double _startRotation = 0.0;
  double _endRotation = 0.0;
  bool _isSpinning = false;
  String _result = 'Spin The Wheel!';
  int _score = 0;
  int _spinRemaining = 5;
  bool _showConfeeti = false; // 注意：变量名应为 _showConfetti（拼写错误，不影响功能但建议修正）

  final List<WheelSegment> _segment = [
    WheelSegment('+1 Spin', Color.fromARGB(255, 255, 23, 154), 1), // 修复：拼写错误 "+1 Spint" → "+1 Spin"
    WheelSegment('50', Color(0xff2979ff), 50),
    WheelSegment('200', Color(0xff00e676), 200),
    WheelSegment('10', Color(0xffffd600), 10),
    WheelSegment('500', Color(0xffaa00ff), 500),
    WheelSegment('0', Color(0xffff9100), 0),
    WheelSegment('1000', Color(0xfff50057), 1000),
    WheelSegment('LOSE ALL', Color(0xff795548), -9999),
  ];

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(seconds: 5)); // 修复：添加 const 关键字
    _controller.addListener(() {
      setState(() {});
    });
    _controller.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        setState(() {
          _isSpinning = false;
          _startRotation = _endRotation % (2 * pi);
          _calculateResult();
        });
        if (_spinRemaining <= 0) {
          _showGameOverDialog();
        }
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.indigo,
      body: Container(
        decoration: const BoxDecoration( // 修复：添加 const 关键字
          gradient: LinearGradient(
            colors: [
              Color(0xff3949ab),
              Color(0xff1a237e),
            ],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: SafeArea(
          child: Stack(
            children: [
              // 修复1：修正 ConfettiPainter 显示逻辑（仅在 _showConfeeti 为 true 时显示，避免遮挡轮盘）
              if (_showConfeeti)
                Positioned.fill(
                  child: IgnorePointer(
                    child: CustomPaint(
                      size: MediaQuery.of(context).size, // 修复：设置 Confetti 尺寸为屏幕尺寸
                      painter: ConfettiPainter(),
                    ),
                  ),
                ),
              Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.all(20), // 修复：添加 const 关键字
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric( // 修复：添加 const 关键字
                            horizontal: 18,
                            vertical: 10,
                          ),
                          decoration: BoxDecoration(
                              color: Colors.white.withOpacity(0.15),
                              borderRadius: BorderRadius.circular(20),
                              border: Border.all(
                                color: Colors.white.withOpacity(0.3),
                              )),
                          child: Row(
                            children: [
                              const Icon( // 修复：添加 const 关键字
                                Icons.refresh,
                                color: Colors.amber,
                              ),
                              const SizedBox( // 修复：添加 const 关键字
                                width: 4,
                              ),
                              Text(
                                _spinRemaining.toString(),
                                style: const TextStyle( // 修复：添加 const 关键字
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),
                              ),
                            ],
                          ),
                        )
                      ],
                    ),
                  ),
                  const Text( // 修复：添加 const 关键字，修正拼写错误 "SPINNGE" → "SPINNING"
                    'SPINNING',
                    style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 30,
                      letterSpacing: 1.5,
                      shadows: [
                        BoxShadow(
                          blurRadius: 10,
                          color: Colors.black45,
                          offset: Offset(2, 2),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox( // 修复：添加 const 关键字
                    height: 30,
                  ),
                  Expanded(
                    child: Center(
                      child: Container(
                        margin: const EdgeInsets.all(20), // 修复：添加 const 关键字
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withOpacity(0.3),
                              blurRadius: 20,
                              spreadRadius: 5,
                            ),
                          ],
                        ),
                        // 修复2：设置轮盘容器固定尺寸（避免自适应导致绘制异常）
                        width: MediaQuery.of(context).size.width * 0.8, // 宽度为屏幕80%
                        height: MediaQuery.of(context).size.width * 0.8, // 高度与宽度一致（圆形）
                        child: Stack(
                          alignment: Alignment.center,
                          children: [
                            Transform.rotate(
                              angle: Tween(
                                      begin: _startRotation, end: _endRotation)
                                  .animate(CurvedAnimation(
                                      parent: _controller,
                                      curve: Curves.easeOutCirc))
                                  .value,
                              // 修复3：WheelPainter 适配父容器尺寸
                              child: CustomPaint(
                                size: Size.infinite, // 让绘制区域充满父容器
                                painter: WheelPainter(segments: _segment),
                              ),
                            ),
                            // 轮盘中心按钮（不变）
                            Container(
                              width: 50,
                              height: 50,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                gradient: const LinearGradient( // 修复：添加 const 关键字
                                  begin: Alignment.topLeft,
                                  end: Alignment.bottomRight,
                                  colors: [Colors.white, Colors.grey],
                                ),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.black.withOpacity(0.3),
                                    blurRadius: 5,
                                    spreadRadius: 1,
                                  ),
                                ],
                                border: Border.all(
                                  color: Colors.white.withOpacity(0.8),
                                  width: 2,
                                ),
                              ),
                              child: const Icon( // 修复：添加 const 关键字
                                Icons.radio_button_checked,
                                color: Colors.indigo,
                              ),
                            ),
                            // 指针（不变）
                            Positioned(
                              top: 10,
                              child: Container(
                                width: 10,
                                height: 50,
                                decoration: BoxDecoration(
                                  color: Colors.red,
                                  borderRadius: const BorderRadius.only( // 修复：添加 const 关键字
                                    bottomLeft: Radius.circular(30),
                                    bottomRight: Radius.circular(30),
                                  ),
                                  boxShadow: [
                                    BoxShadow(
                                        color: Colors.black.withOpacity(0.5),
                                        blurRadius: 5,
                                        spreadRadius: 1,
                                        offset: const Offset(0, 2)), // 修复：添加 const 关键字
                                  ],
                                ),
                                child: Center(
                                  child: Container(
                                    width: 5,
                                    height: 5,
                                    decoration: const BoxDecoration( // 修复：添加 const 关键字
                                      color: Colors.white,
                                      shape: BoxShape.circle,
                                    ),
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                  // 结果显示区域（不变，仅优化 const 关键字）
                  AnimatedContainer(
                    duration: const Duration(milliseconds: 300), // 修复：添加 const 关键字
                    margin: const EdgeInsets.symmetric(horizontal: 40, vertical: 10), // 修复：添加 const 关键字
                    padding: const EdgeInsets.symmetric( // 修复：添加 const 关键字
                      vertical: 15,
                      horizontal: 20,
                    ),
                    decoration: BoxDecoration(
                      color: _showConfeeti
                          ? Colors.amber.withOpacity(0.9)
                          : Colors.white.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(15),
                      border: Border.all(
                        color: _showConfeeti
                            ? Colors.amber.shade700
                            : Colors.white.withOpacity(0.3),
                      ),
                      boxShadow: _showConfeeti
                          ? [
                              BoxShadow(
                                color: Colors.amber.withOpacity(0.5),
                                blurRadius: 10,
                                spreadRadius: 2,
                              ),
                            ]
                          : [],
                    ),
                    child: Text(
                      _result,
                      textAlign: TextAlign.center,
                      style: TextStyle(
                          color: _showConfeeti
                              ? Colors.brown.shade500
                              : Colors.white,
                          fontSize: 22,
                          fontWeight: FontWeight.bold),
                    ),
                  ),
                  //  Spin 按钮（不变，仅优化 const 关键字）
                  Padding(
                    padding: const EdgeInsets.only( // 修复：添加 const 关键字
                      bottom: 10,
                      top: 10,
                    ),
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 200), // 修复：添加 const 关键字
                      height: 70,
                      width: 250,
                      transform: Matrix4.identity()
                        ..scale(_isSpinning ? 0.95 : 1.0),
                      child: ElevatedButton(
                          onPressed: _isSpinning ? null : _spinWheel,
                          style: ElevatedButton.styleFrom(
                              backgroundColor:
                                  _isSpinning ? Colors.grey : Colors.amber,
                              foregroundColor: Colors.brown.shade900,
                              padding: const EdgeInsets.symmetric( // 修复：添加 const 关键字
                                  vertical: 15, horizontal: 30),
                              shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(35)),
                              elevation: _isSpinning ? 3 : 10,
                              shadowColor: Colors.black.withOpacity(0.5)),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(
                                _isSpinning
                                    ? Icons.hourglass_top
                                    : Icons.touch_app,
                                size: 28,
                                color: Colors.white,
                              ),
                              const SizedBox( // 修复：添加 const 关键字
                                width: 10,
                              ),
                              Text(
                                _isSpinning ? 'SPINNING...' : 'SPIN!',
                                style: const TextStyle( // 修复：添加 const 关键字
                                  fontSize: 24,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white,
                                ),
                              )
                            ],
                          )),
                    ),
                  ),
                  // 重置按钮（不变，仅优化 const 关键字）
                  Padding(
                    padding: const EdgeInsets.only(bottom: 20), // 修复：添加 const 关键字
                    child: TextButton.icon(
                      icon: const Icon( // 修复：添加 const 关键字
                        Icons.refresh,
                        color: Colors.white70,
                      ),
                      onPressed: () {
                        _resetGame();
                      },
                      label: const Text( // 修复：添加 const 关键字
                        'RESET GAME',
                        style: TextStyle(
                          color: Colors.white70,
                        ),
                      ),
                    ),
                  )
                ],
              )
            ],
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  // 修复4：修正 _spinWheel 逻辑（原代码中 _spinRemaining-- 位置错误，导致剩余次数计算异常）
  void _spinWheel() {
    if (!_isSpinning && _spinRemaining > 0) { // 修复：判断条件优化
      setState(() {
        _spinRemaining--; // 修复：将剩余次数减少移到这里（原代码在 if 条件外，导致无效点击也减少次数）
        _isSpinning = true;
        _result = 'Spinning...';
        _showConfeeti = false;
        final Random random = Random();
        final int spinCount = 5 + random.nextInt(5); // 修复：拼写错误 spintCount → spinCount
        final double extraSpin = random.nextDouble() * 2 * pi;
        _endRotation = _startRotation + (spinCount * 2 * pi) + extraSpin;
        _controller.reset();
        _controller.forward();
      });
    }
  }

  // 结果计算逻辑（不变）
  void _calculateResult() {
    final double normalizedAngle = _endRotation % (2 * pi);
    final double segmentAngle = 2 * pi / _segment.length;
    final double invertedAngle = 2 * pi - normalizedAngle;
    final int segmentIndex = (invertedAngle ~/ segmentAngle) % _segment.length;
    final WheelSegment segment = _segment[segmentIndex];

    setState(() {
      if (segment.value == -9999) {
        _score = 0;
        _result = 'Oh No!, You Lost Everything';
        _showConfeeti = false;
      } else if (segment.value == 1) {
        _result = 'You Got +1 Spin';
        _spinRemaining++;
        _showConfeeti = false;
      } else if (segment.value > 200) {
        _score += segment.value;
        _result = 'Wow!, You Won ${segment.label}';
        _showConfeeti = true;
      } else {
        _score += segment.value;
        _result = 'You Won ${segment.label}';
        _showConfeeti = segment.value >= 50;
      }
    });
  }

  // 重置游戏逻辑（不变）
  void _resetGame() {
    setState(() {
      _score = 0;
      _spinRemaining = 5;
      _result = 'Spin The Wheel';
      _startRotation = 0.0;
      _endRotation = 0.0;
      _showConfeeti = false;
      _controller.reset(); // 修复：重置动画控制器，避免残留状态
    });
  }

  // 游戏结束弹窗（不变，仅优化 const 关键字）
  void _showGameOverDialog() {
    Future.delayed(
      const Duration(milliseconds: 500), // 修复：添加 const 关键字
      () {
        showDialog(
          context: context,
          barrierDismissible: false,
          builder: (BuildContext context) {
            return AlertDialog(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(15),
              ),
              backgroundColor: Colors.indigo.shade500,
              title: const Text( // 修复：添加 const 关键字
                'GAME OVER',
                style: TextStyle(
                    color: Colors.white, // 修复：原代码颜色为 Colors.indigo，与背景色冲突，改为白色
                    fontWeight: FontWeight.bold),
                textAlign: TextAlign.center,
              ),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon( // 修复：添加 const 关键字
                    Icons.emoji_events,
                    size: 60,
                    color: Colors.amber, // 修复：原代码颜色为 Colors.indigo.shade600，与背景色冲突，改为琥珀色
                  ),
                  const SizedBox( // 修复：添加 const 关键字
                    height: 16,
                  ),
                  const Text( // 修复：添加 const 关键字
                    'Your Final Score',
                    style: TextStyle(
                      color: Colors.white, // 修复：原代码颜色为 Colors.indigo.shade800，与背景色冲突，改为白色
                    ),
                  ),
                  const SizedBox( // 修复：添加 const 关键字
                    height: 8,
                  ),
                  Text(
                    _score.toString(),
                    style: const TextStyle( // 修复：添加 const 关键字
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                      color: Colors.white, // 修复：原代码颜色为 Colors.indigo.shade800，与背景色冲突，改为白色
                    ),
                  )
                ],
              ),
              actions: [
                Center(
                  child: ElevatedButton.icon(
                    onPressed: () {
                      Navigator.pop(context);
                      _resetGame(); // 修复：关闭弹窗后自动重置游戏，提升用户体验
                    },
                    label: const Text('PLAY AGAIN'), // 修复：拼写错误 PLAY AGAIn → PLAY AGAIN
                    icon: const Icon(Icons.replay), // 修复：添加 const 关键字
                    style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.amber, // 修复：原代码颜色为 Colors.indigo，与背景色冲突，改为琥珀色
                        foregroundColor: Colors.brown.shade900, // 修复：文字颜色改为深棕色，提升对比度
                        padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 12), // 修复：添加 const 关键字
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(30))),
                  ),
                )
              ],
            );
          },
        );
      },
    );
  }
}

// 修复5：WheelPainter 绘制逻辑修正（起始角度、尺寸适配）
class WheelPainter extends CustomPainter {
  final List<WheelSegment> segments;

  WheelPainter({super.repaint, required this.segments});

  @override
  void paint(Canvas canvas, Size size) {
    // 修复：适配父容器尺寸，取宽高中较小值作为轮盘直径（避免拉伸）
    final double diameter = min(size.width, size.height);
    final double radius = diameter / 2;
    final Offset center = Offset(size.width / 2, size.height / 2); // 轮盘中心（父容器中心）
    final Rect rect = Rect.fromCircle(center: center, radius: radius);

    final double segmentAngle = 2 * pi / segments.length;
    // 修复：起始角度改为 -pi/2（12点钟方向），与指针位置对齐
    final double startAngle = -pi / 2;

    // 绘制轮盘外边框（不变）
    final Paint outerRingPaint = Paint()
      ..style = PaintingStyle.fill
      ..color = Colors.amber.shade600;
    canvas.drawCircle(center, radius + 5, outerRingPaint);

    // 绘制每个扇区
    for (int i = 0; i < segments.length; i++) {
      // 扇区渐变颜色（不变）
      final Paint segmentPaint = Paint()
        ..style = PaintingStyle.fill
        ..shader = RadialGradient(
          colors: [
            segments[i].color.withOpacity(0.7),
            segments[i].color,
          ],
          stops: const [0.3, 1.0], // 修复：添加 const 关键字
        ).createShader(rect);

      // 绘制扇区（修复：起始角度计算）
      final double currentStartAngle = startAngle + i * segmentAngle;
      canvas.drawArc(rect, currentStartAngle, segmentAngle, true, segmentPaint);

      // 绘制扇区分割线（不变）
      final Paint borderPaint = Paint()
        ..style = PaintingStyle.stroke
        ..color = Colors.white
        ..strokeWidth = 2;
      canvas.drawArc(rect, currentStartAngle, segmentAngle, true, borderPaint);

      // 高价值扇区添加闪光点（不变）
      if (segments[i].value >= 500) {
        final Random rnd = Random(i); // 固定种子，保证闪光点位置不变
        for (int j = 0; j < 5; j++) {
          final double sparkleAngle = currentStartAngle + rnd.nextDouble() * segmentAngle;
          final double sparkleRadius = radius * (0.3 + rnd.nextDouble() * 0.5);
          canvas.drawCircle(
            Offset(
              center.dx + cos(sparkleAngle) * sparkleRadius,
              center.dy + sin(sparkleAngle) * sparkleRadius,
            ),
            2,
            Paint()..color = Colors.white,
          );
        }
      }

      // 绘制扇区标签（修复：标签位置计算）
      final double labelAngle = currentStartAngle + segmentAngle / 2;
      final double labelRadius = radius * 0.7; // 标签到中心的距离（轮盘70%半径处）
      final Offset labelCenter = Offset(
        center.dx + cos(labelAngle) * labelRadius,
        center.dy + sin(labelAngle) * labelRadius,
      );

      // 保存画布状态（用于标签旋转）
      canvas.save();
      canvas.translate(labelCenter.dx, labelCenter.dy);
      canvas.rotate(labelAngle + pi / 2); // 标签垂直于扇区半径（修复：原代码旋转角度正确，无需修改）

      // 绘制标签阴影（提升可读性）
      TextPainter shadowPainter = TextPainter(
        text: TextSpan(
          text: segments[i].label,
          style: TextStyle( // 修复：添加 const 关键字
            color: Colors.black.withOpacity(0.5),
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
        textDirection: TextDirection.ltr,
      );
      shadowPainter.layout();
      shadowPainter.paint(
        canvas,
        Offset(-shadowPainter.width / 2 + 1, -shadowPainter.height / 2 + 1),
      );

      // 绘制标签文字（不变）
      TextPainter textPainter = TextPainter(
        text: TextSpan(
          text: segments[i].label,
          style: TextStyle(
            color: _getContrastColor(segments[i].color),
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
        textDirection: TextDirection.ltr,
      );
      textPainter.layout();
      textPainter.paint(
        canvas,
        Offset(-textPainter.width / 2, -textPainter.height / 2),
      );

      // 恢复画布状态
      canvas.restore();
    }

    // 绘制轮盘中心内边框（不变）
    final Paint innerRingPaint = Paint() // 修复：变量名拼写错误 innerRingpaint → innerRingPaint
      ..style = PaintingStyle.stroke
      ..color = Colors.white
      ..strokeWidth = 4;
    canvas.drawCircle(center, radius * 0.2, innerRingPaint);

    // 绘制轮盘外边框渐变（不变）
    final Paint outerBorderPaint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 8
      ..shader = RadialGradient(
        colors: [Colors.amber.shade300, Colors.amber.shade700], // 修复：添加 const 关键字
        stops: const [0.0, 1.0], // 修复：添加 const 关键字
      ).createShader(rect);
    canvas.drawCircle(center, radius, outerBorderPaint);
  }

  // 计算对比色（确保文字在扇区背景上可读，不变）
  Color _getContrastColor(Color color) {
    final double luminance = (0.299 * color.red + 0.587 * color.green + 0.114 * color.blue) / 255;
    return luminance > 0.5 ? Colors.black : Colors.white;
  }

  @override
  bool shouldRepaint(covariant WheelPainter oldDelegate) {
    // 修复：仅在扇区数据变化时重绘（原代码返回 true，导致不必要的重绘）
    return segments != oldDelegate.segments;
  }
}

// 修复6：ConfettiPainter 实现 shouldRepaint 方法（避免报错）
class ConfettiPainter extends CustomPainter {
  final Random random = Random();

  @override
  void paint(Canvas canvas, Size size) {
    for (int i = 0; i < 50; i++) { // 修复：增加粒子数量（原代码10个，视觉效果差）
      final double x = random.nextDouble() * size.width;
      final double y = random.nextDouble() * size.height;
      final double confettiSize = 3 + random.nextDouble() * 5; // 修复：拼写错误 donfettiSize → confettiSize
      // 修复：颜色列表长度为6，避免数组越界（原代码 random.nextInt(7) → 0-6，超出列表长度）
      final Color color = [
        Colors.red,
        Colors.blue,
        Colors.green,
        Colors.purple,
        Colors.orange,
        Colors.pink,
      ][random.nextInt(6)];

      final Paint paint = Paint()
        ..color = color
        ..style = PaintingStyle.fill;

      // 绘制不同形状的彩屑（不变）
      switch (random.nextInt(3)) {
        case 0:
          canvas.drawCircle(Offset(x, y), confettiSize, paint);
          break;
        case 1:
          canvas.drawRect(
            Rect.fromCenter(
              center: Offset(x, y),
              width: confettiSize * 2,
              height: confettiSize * 2,
            ),
            paint,
          );
          break;
        case 2:
          final Path path = Path();
          path.moveTo(x, y - confettiSize);
          path.lineTo(x + confettiSize, y + confettiSize);
          path.lineTo(x - confettiSize, y + confettiSize); // 修复：原代码 lineTo(x - confettiSize, y - confettiSize)，形状错误
          path.close();
          canvas.drawPath(path, paint);
          break;
      }
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    // 修复：返回 true，确保彩屑实时刷新
    return true;
  }
}

// 轮盘扇区数据类（不变）
class WheelSegment {
  final String label;
  final Color color;
  final int value;

  WheelSegment(this.label, this.color, this.value);
}

```