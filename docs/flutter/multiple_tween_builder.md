# 各种Tween

```dart
import 'package:flutter/material.dart';

class MultipleTween extends StatefulWidget {
  const MultipleTween({super.key});

  @override
  State<MultipleTween> createState() => _MultipleTweenState();
}

class _MultipleTweenState extends State<MultipleTween> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('各种Tween的动画')),
      body: Column(
        children: [
          TweenAnimationBuilder(
            tween: Tween<double>(begin: 0, end: 1),
            duration: Duration(seconds: 2),
            builder: (ctx, value, widget) {
              return Container(
                width: 200 * value,
                height: 200 * value,
                color: Colors.lightBlueAccent,
              );
            },
          ),
          TweenAnimationBuilder(
            tween: ColorTween(begin: Colors.amber, end: Colors.blue),
            duration: Duration(seconds: 2),
            builder: (ctx, value, widget) {
              return Container(width: 200, height: 200, color: value);
            },
          ),

          TweenAnimationBuilder(
            tween: SizeTween(begin: Size(100, 100), end: Size(300, 200)),
            duration: Duration(seconds: 2),
            builder: (ctx, value, widget) {
              return Container(
                width: value?.height,
                height: value?.width,
                color: Colors.primaries[0],
              );
            },
          ),

          TweenAnimationBuilder(
            tween: BorderRadiusTween(
              begin: BorderRadius.circular(0),
              end: BorderRadius.circular(50),
            ),
            duration: Duration(seconds: 2),
            builder: (ctx, value, widget) {
              return Container(
                width: 200,
                height: 200,

                decoration: BoxDecoration(
                  color: Colors.primaries[1],
                  borderRadius: value,
                ),
              );
            },
          ),

          TweenAnimationBuilder(
            tween: BorderTween(
              begin: Border.all(color: Colors.black, width: 1),
              end: Border.all(color: Colors.orangeAccent, width: 10),
            ),
            duration: Duration(seconds: 2),
            builder: (ctx, value, widget) {
              return Container(
                width: 200,
                height: 200,

                decoration: BoxDecoration(
                  color: Colors.primaries[1],
                  borderRadius: BorderRadius.circular(10),
                  border: value,
                ),
              );
            },
          ),

          TweenAnimationBuilder(
            tween: TextStyleTween(
              begin: TextStyle(
                fontSize: 12,
                color: Colors.amberAccent,
                fontWeight: FontWeight.w100,
              ),
              end: TextStyle(
                fontSize: 50,
                color: Colors.brown,
                fontWeight: FontWeight.w900,
              )
            ),
            duration: Duration(seconds: 2),
            builder: (ctx, value, widget) {
              return Container(
                width: 200,
                height: 200,
                child: Text('TextStyleTween', style: value,),
                decoration: BoxDecoration(
                  color: Colors.primaries[1],
                  borderRadius: BorderRadius.circular(10),
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}


```