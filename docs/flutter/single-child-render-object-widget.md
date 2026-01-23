# 原始布局类组件-自定义布局

## LeafRenderObjectWidget

## SingleChildRenderObjectWidget
::: info
SingleChildRenderObjectWidget的使用<br>
手写RenderObject

markNeedsLayout();<br>
再RenderBox调用markNeedsLayout会触发重新布局（调用performLayout）
同时也会触发重新绘制（调用paint方法）<br>
触发「布局 + 绘制」（尺寸 / 位置变了，必须重新布局再绘制）<br>

markNeedsPaint();<br>
会触发paint方法<br>
仅触发「绘制」（尺寸 / 位置不变，仅外观变了，如颜色、文本内容）
:::


::: tip
SingleChildRenderObjectWidget中updateRenderObject方法的作用<br>
是当widget重建时会调用updateRenderObject方法更新renderObject对象<br>
里面的数据，然后再下一帧重新绘制
1. 调用updateRenderObject方法会调用RenderObject里面paint方法
2. 但是不会调用performLayout方法
:::
```dart
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';

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
  int a = 0;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          '自定义SingleChildRenderObjectWidget',
          style: TextStyle(color: Colors.white),
        ),
        backgroundColor: Colors.blueAccent,
      ),
      body: SizedBox(
        width: double.infinity,
        height: double.infinity,
        child: Column(
          children: [
            ElevatedButton.icon(
                onPressed: () {
                  setState(() {
                    a++;
                  });
                },
                label: Text('点击++')),
            ColoredBox(
              color: Colors.white,
              child: CustomerWidget(
                distance: a,
                child: FlutterLogo(
                  size: 150,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class CustomerWidget extends SingleChildRenderObjectWidget {
  int distance;
  CustomerWidget({super.key, required Widget child, this.distance = 8})
      : super(child: child);

  @override
  RenderObject createRenderObject(BuildContext context) {
    return RenderCustomerWidget(distance);
  }

  // 当widget重建的时候，更新老的renderObject里免得书记’
  // 然后在下一帧重绘
  @override
  void updateRenderObject(
      BuildContext context, covariant RenderCustomerWidget renderObject) {
    renderObject.distance = distance;
  }
}

//
class RenderCustomerWidget extends RenderBox with RenderObjectWithChildMixin {
  int distance;

  RenderCustomerWidget(this.distance);
  // 如何布局
  @override
  void performLayout() {
    // 给子组件布局，并添加约束
    child!.layout(constraints, parentUsesSize: true); // 添加松约束

    // child!.layout(BoxConstraints.tight(Size(100, 100)), parentUsesSize: true);

    // 获取child的size则child!.layout必须设置parentUsesSize
    final childSize = (child as RenderBox).size;

    // 设置自身的大小
    // size = Size(300, 300);

    // 将自身大小设置为child一样
    size = childSize;
  }

  // 绘制
  @override
  void paint(PaintingContext context, Offset offset) {
    // super.paint(context, offset);
    // offset是基于屏幕的，不是基于当前父组件
    print(offset);

    // 绘制子元素
    context.paintChild(child!, offset);

    // 添加canvas绘制
    context.canvas.drawCircle(
        offset,
        10,
        Paint()
          ..color = Colors.red
          ..style = PaintingStyle.fill);

    // 新开一个图层,绘制子元素
    context.pushOpacity(
      offset,
      127,
      (context, offset) {
        context.paintChild(
            child!, offset + Offset(distance.toDouble(), distance.toDouble()));
      },
    );
  }
}



```