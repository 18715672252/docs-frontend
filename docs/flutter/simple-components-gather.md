# 简单组件集合

## 高斯模糊组件 {#高斯模糊组件}
```dart
ImageFiltered(
  imageFilter: ImageFilter.blur(sigmaX: 1, sigmaY: 1),
  child: Container(
    width: 100,
    height: 100,
    color: Colors.red,
  ),
)

```

## 阴影组件 {#阴影组件}
```dart
PhysicalModel(
  color: Colors.deepPurpleAccent, // 组件颜色
  shape: BoxShape.circle, // 组件性状
  clipBehavior: Clip.antiAliasWithSaveLayer, // 对子组件的裁剪行为
  shadowColor: Colors.teal, // 阴影颜色
  child: Container(
    width: 300,
    height: 300,
    child: Text('123'),
  ),
  elevation: 4, // 井深
)
```
## 网络图片加载逐渐进入的动画 {#网络图片加载逐渐进入的动画}
```dart
FadeInImage(
  placeholder: AssetImage('assets/images/loding.jpg'),
  image: NetworkImage('https://picsum.photos/200/200'),
)



```

## 宽高比例因子动画 {#宽高比例因子动画}
```dart
AnimatedFractionallySizedBox(
  duration: Duration(seconds: 1),
  widthFactor: 0.8,
  heightFactor: 0.8,
  child: Container(
    color: Colors.amberAccent,
  ),
)

```

## 位移动画 {#位移动画}
```dart
// 相对与自生宽高平移
AnimatedSlide(
  offset: Offset(-1, 0),
  duration: Duration(seconds: 1),
  child: Container(
    width: 200,
    height: 500,
    color: Colors.amberAccent,
  ),
)

```

## 缩放动画组件 {#缩放动画组件}
```dart
class Demo extends StatefulWidget {
  const Demo({super.key});

  @override
  State<Demo> createState() => _DemoState();
}

class _DemoState extends State<Demo> with SingleTickerProviderStateMixin {
  late AnimationController _animationController;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      vsync: this,
      duration: Duration(seconds: 1),
      lowerBound: 1,
      upperBound: 2,
    );

    // _animationController.repeat();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Column(
        children: [
          AnimatedSlide(
            offset: Offset(0.5, 0),
            duration: Duration(seconds: 1),
            child: Container(
              width: 200,
              height: 200,
              color: Colors.amberAccent,
            ),
          ),
          ScaleTransition(
              scale: _animationController,
              child: Container(
                width: 100,
                height: 100,
                color: Colors.blue,
              )),
        ],
      ),
    );
  }
}

```

