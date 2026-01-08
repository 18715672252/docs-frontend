# 字体的斑马效果
```dart
ShaderMask(
  shaderCallback: (Rect bounds) {
    return LinearGradient(
      begin: Alignment(-1, 1),
      end: Alignment(-0.9, 1),
      colors: [Colors.black, Colors.white],
      tileMode: TileMode.repeated,
    ).createShader(bounds);
  },
  child: Text(
    '斑马效果',
    style: TextStyle(fontSize: 82, color: Colors.white),
  ),
),

```