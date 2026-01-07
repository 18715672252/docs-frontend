# 自定义APPBar高度 :spider_web:

```dart
Scaffold(
  appBar: PreferredSize(
    preferredSize: Size.fromHeight(160), 
    child: Container(
      width: double.infinity,
      height: 160,
      color: Colors.blue,
    )
  ),
  body: SafeArea(
    child: SizedBox(
      width: double.infinity,
      height: double.infinity,
      child: GestureDetector(
        onPanUpdate: (DragUpdateDetails details) {
          setState(() {
            path.lineTo(details.localPosition.dx, details.localPosition.dy);
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
    ),
  ),
);
```
