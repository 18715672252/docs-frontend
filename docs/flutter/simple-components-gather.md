# 简单组件集合

## 高斯模糊组件
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

## 阴影组件
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