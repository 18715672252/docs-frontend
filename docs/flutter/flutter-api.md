# 各种简单的Flutter API


## 获取元素的位置和点击事件的位置
```dart
import 'package:flutter/material.dart';
// import '../components/home_page_list.dart';

TextStyle titleStyle = TextStyle(
  fontWeight: FontWeight.w500,
  fontSize: 18,
  color: Color(0xff61080A),
);

class Home extends StatefulWidget {
  static String name = '/';
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  final gkey = GlobalKey();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        color: Colors.blueGrey,
        child: Center(
          child: GestureDetector(
            onTapDown: (details) {
              final RenderBox? renderBox =
                  gkey.currentContext?.findRenderObject() as RenderBox?;
              // 元素的大小
              Size EleSize = renderBox!.size;
              print(EleSize);


              final EleXyScreenOffset = renderBox?.localToGlobal(Offset.zero);
              print(EleXyScreenOffset);


              // 点击的位置相对与屏幕左上角
              print(details.globalPosition);
              // 点击的位置相对与点击事件元素的左上角
              print(details.localPosition);
            },
            child: Container(
              key: gkey,
              width: 60,
              height: 60,
              color: Colors.red,
            ),
          ),
        ),
      ),
    );
  }
}

```