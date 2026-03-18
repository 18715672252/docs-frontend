# 基础组件


## ToggleButtons
```dart
// 多选动效按钮
List<bool> l = [true, false, true];
ToggleButtons(
  color: Colors.red,
  selectedColor: Colors.amber,
  fillColor: Colors.blue,
  isSelected: l,
  splashColor: Colors.blueGrey,
  onPressed: (index) {
    print(index);
    setState(
      () {
        l[index] = !l[index];
      },
    );
  },
  children: [
    Icon(Icons.ac_unit),
    Icon(Icons.dangerous),
    Icon(Icons.wifi)
  ],
)
```

## TextField输入框组件
```dart
const TextField({
  TextEditingController controller, 
  FocusNode focusNode,
  InputDecoration decoration = const InputDecoration(),
  TextInputType keyboardType,
  TextInputAction textInputAction,
  TextStyle style, // 正在编辑的文本样式
  TextAlign textAlign = TextAlign.start, // 输入框内编辑文本在水平方向的对齐方式
  bool autofocus = false, // 是否自动获取焦点。
  bool obscureText = false, // 是否隐藏正在编辑的文本，如用于输入密码的场景等，文本内容会用“•“换。
  int maxLines = 1, // 输入框的最大行数，默认为1；如果为null，则无行数限制
  int maxLength,
  this.maxLengthEnforcement, // 决定当输入文本长度超过maxLength时如何处理，如截断、超出等
  ToolbarOptions? toolbarOptions, // 长按或鼠标右击时出现的菜单，包括 copy、cut、paste 以及 selectAll
  // onEditingComplete和onSubmitted这两个回调都是在输入框输入完成时触发，
  // 比如按了键盘的完成键（对号图标）或搜索键（🔍图标）。
  // 不同的是两个回调签名不同，onSubmitted回调是ValueChanged<String>类型，
  // 它接收当前输入内容做为参数，而onEditingComplete不接收参数。
  ValueChanged<String> onChanged,
  VoidCallback onEditingComplete,
  ValueChanged<String> onSubmitted,
  List<TextInputFormatter> inputFormatters, // 用于指定输入格式；当用户输入内容改变时，会根据指定的格式来校验
  bool enabled,
  // cursorWidth、cursorRadius和cursorColor这三个属性是用于自定义输入框光标宽度、圆角和颜色的
  this.cursorWidth = 2.0,
  this.cursorRadius,
  this.cursorColor,
  this.onTap,
})


```
keyboardType：用于设置该输入框默认的键盘输入类型，取值如下：
| TextInputType枚举值 |      含义      |
| ------------- | :-----------: |
| text | 文本输入键盘 |
| multiline | 多行文本，需和maxLines配合使用(设为null或大于1) |
| number |   数字；会弹出数字键盘    |
| phone |   优化后的电话号码输入键盘；会弹出数字键盘并显示“* #”    |
| datetime |   优化后的日期输入键盘；Android上会显示“: -”    |
| emailAddress | 优化后的电子邮件地址；会显示“@ .” |
| url | 优化后的url输入键盘； 会显示“/ .” |



## 跟随组件
::: info 
CompositedTransformTarget 目标组件<br>
CompositedTransformFollower 跟随组件<br>

当CompositedTransformFollower组件创建时会自动跟随<br>
CompositedTransformTarget组件


* CompositedTransformFollower需在CompositedTransformTarget之后创建

可以实现的常见功能：<br>
创建功能点击的组件使用CompositedTransformTarget包裹
然后弹出对应的信息框，信息框组件使用CompositedTransformFollower包裹

:::



