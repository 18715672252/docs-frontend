# 弹框交互


## 根据平台展示对话框
```js
showAdaptiveDialogOpen() async {
  final result = await showAdaptiveDialog(
    context: context,
    barrierDismissible: true,
    builder: (ctx) {
      return AlertDialog.adaptive(
        title: Text('哈哈'),
        actions: [
          TextButton(onPressed: () {}, child: Text('取消')),
          ColoredBox(
            color: Colors.red,
            child: TextButton(
              style: ButtonStyle(
                padding: WidgetStatePropertyAll(EdgeInsets.zero),
              ),
              onPressed: () {
                // 第二个参数为传递Future得返回值
                Navigator.pop(context, '确定');
              },
              child: Text('确定'),
            ),
          )
        ],
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text('天街小雨润如酥'),
            Text('天街小雨润如酥'),
          ],
        ),
      );
    },
  );
  print(result);
  // print(a);
}
```

## 自定义弹框内容 Dialog组件的使用 :fire:
```dart
showDialog(
  context: context,
  builder: (ctx) {
    return Dialog(
      shape: BeveledRectangleBorder(
        borderRadius: BorderRadius.circular(4)
      ),
      child: ConstrainedBox(
        constraints: BoxConstraints.loose(
          Size(200, 200),
        ),
        child: SingleChildScrollView(
          child: Column(
            children: [Text('哈韩' * 30)],
          ),
        ),
      ),
    );
  },
);
```

## 底部弹框 :cyclone:
```dart
showBottom(BuildContext context) {
    // 弹出弹框
    final aa = showBottomSheet(
      context: context,
      // constraints: BoxConstraints(minHeight: 200, maxHeight: 600),
      showDragHandle: true,
      enableDrag: false,
      builder: (ctx) {
        return Container(
          width: double.infinity,
          height: 400,
          color: Colors.red,
        );
      },
    );

    // 关闭弹框
    Timer(Duration(seconds: 5), () {
      aa.close();
    });
  }
```

```dart
// 底部弹框带遮罩层
showBottom(BuildContext context) async {
  final aa = await showModalBottomSheet(
    context: context,
    // constraints: BoxConstraints(minHeight: 200, maxHeight: 600),
    showDragHandle: true,
    enableDrag: false,
    builder: (ctx) {
      return Container(
        width: double.infinity,
        height: 400,
        color: Colors.red,
        child: TextButton(onPressed: () {
          Navigator.of(context).pop('关闭弹框');
        }, child: Text('点击关闭')),
      );
    },
  );
  print(aa);
}
```

```dart
// 底部弹框日期选择
// 需要使用flutter_picker_plus这个库
import 'package:flutter_picker_plus/picker.dart';
bottomPickerTime1(context) {
  final picker = Picker(
    cancelText: '取消',
    confirmText: '确认',
    headerDecoration: BoxDecoration(
      borderRadius: BorderRadius.only(
          topLeft: Radius.circular(20), topRight: Radius.circular(20)),
      color: Colors.white,
      border: Border.all(
        color: Colors.red.withAlpha(0),
      ),
    ),
    height: 200,
    selectedTextStyle: TextStyle(color: Color(0xffb23234)),
    backgroundColor: Colors.white,
    headerColor: Colors.white,
    adapter: DateTimePickerAdapter(
      type: PickerDateTimeType.kYMDHM,
      minuteInterval: 1,
      isNumberMonth: true,
      yearSuffix: "年",
      monthSuffix: "月",
      daySuffix: "日",
      hourSuffix: "时",
      minuteSuffix: "分",
      // secondSuffix: "秒",
      minHour: 0,
      maxHour: 24,
      yearBegin: 2024,
      yearEnd: 2100,
    ),
    title: Text("开始日期"),
    onConfirm: (Picker picker, List value) {
      // setState(() {
      //   meetingStartTime = picker.adapter.text.substring(0, 16);
      // });
    },
    onSelect: (Picker picker, int index, List<int> selected) {
      // showMsg(picker.adapter.toString());
    },
  );

  picker.showModal(context);
}

```

```dart
// 底部弹框单选
// 需要使用flutter_picker_plus这个库
bottomPickerNum(context) {
  Picker(
    adapter: NumberPickerAdapter(
        data: [NumberPickerColumn(begin: 20, end: 100, jump: 10)]),
    hideHeader: false,
    cancelText: '取消',
    confirmText: '确认',
    headerDecoration: BoxDecoration(
      borderRadius: BorderRadius.only(
          topLeft: Radius.circular(20), topRight: Radius.circular(20)),
      color: Colors.white,
      border: Border.all(
        color: Colors.red.withAlpha(0),
      ),
    ),
    height: 200,
    selectedTextStyle: TextStyle(color: Color(0xffb23234)),
    backgroundColor: Colors.white,
    title: Text("会议人数上限"),
    onConfirm: (Picker picker, List value) {
      setState(() {
        maxNum = picker.getSelectedValues()[0].toString();
      });
    },
  ).showModal(context);
}

```

## flutter自带的日期选择
```dart
// 日期选择弹框。日历面板形式
// showDatePicker(context: context, firstDate: DateTime(2023), lastDate: DateTime(2026));
// 日期间隔选择。日历面板形式
// showDateRangePicker(context: context, firstDate: DateTime(2023), lastDate: DateTime(2026));

// 时间选择，圆盘展示
// showTimePicker(context: context, initialTime: TimeOfDay.now());
```


## 自定义从头部弹出的弹框
```dart
showGeneralDialog(
  barrierDismissible: true,
  barrierLabel: 'rrr',
  context: context,
  pageBuilder: (ctx, enterAn, leaveAn) {
    return UnconstrainedBox(
      alignment: Alignment(-1, -1),
      constrainedAxis: Axis.horizontal, // 配置那个方向应遵循约束
      child: SafeArea(
        child: Container(
          width: double.infinity,
          height: 200,
          color: Colors.red,
        ),
      ),
    );
  },
  transitionBuilder:
      (context, animation, secondaryAnimation, child) {
    const begin = Offset(0.0, -1);
    const end = Offset(0.0, 0.0);
    const curve = Curves.ease;
    final tween = Tween(begin: begin, end: end)
        .chain(CurveTween(curve: curve));
    final offsetAnimation = animation.drive(tween);

    return SlideTransition(
      position: offsetAnimation,
      child: child,
    );
  },
);

```

# Tooltip
```dart
// 提示信息组件，用户长安给出提示信息
Tooltip(
  meesage: '提示信息'，
  child: 
)


```