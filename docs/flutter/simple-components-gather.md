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
## LimitedBox {#LimitedBox}
```dart
Column(
  children: [
    LimitedBox(
      maxHeight: 100,
      child: Container(color: Colors.red)
    )
  ]
)
```

::: tip
LimitedBox
在父级约束无边界的情况下，使用LimitedBox 可为子组件设置一个尺寸上限。
例如在二个Column 或竖者滾动的 ListView容器里，垂直方向的约束是无边界的（最大尺寸约束为证无穷），
此时可用 LimitedBox 的 maxHeight 属性为子组件设置高度

值得注意的是，maxHeight属性，并不是最大高度的意思，而是指遇到父级约束无边界时，采用的高度。
若父级约束有边界，则LimitedBox则完全不会有效果，也并不会妨碍其child
选择一个高于LimitedBox的maxHeigth的高度，但不违反LimitedBox的父级约束的值
:::


## AnimatedSwitcher {#AnimatedSwitcher}
```dart
AnimatedSwitcher(
  duration: Duration(sedonds: 2),
  child: flag : Text(1) : FlutterLog()
)

// 简化版的AnimatedSwitcher,
// 有点组件类型相同没有也会有动画效果
AnimatedCrossFade(
  duration: Duration(sedonds: 2),
  firstChild: Text(1),
  secondChild: Text(2)
)

```
::: tip
AnimatedSwitcher组件的主要作用就是新旧组件切换时的动画
然后若两个组件类型相同又没有设置key则新旧组件切换没有动画效果
如需对相同类型的组件添加切换效果，可以给两个组件添加不同的key
:::


## CurvedAnimation {#CurvedAnimation}
```dart
CurvedAnimation(parent: _controller, curve: curve)

```