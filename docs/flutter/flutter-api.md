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

## 监听数据改变
```dart
ValueNotifier<List<int>> count = ValueNotifier([]);
ValueNotifier<int> count = ValueNotifier(100);


// 当数据发生变化时ListenableBuilder得builder函数就会重新构建
// 当是引用类型时必须时和react一样，必须重新赋值才能触发更新
Expanded(
  child: ListenableBuilder(
    listenable: count,
    builder: (context, child) {
      return ListView.builder(
        itemCount: count.value.length,
        itemExtent: 80,
        itemBuilder: (context, index) {
          
          return Container(
            color: Colors.primaries[index % 17],
            child: Text(count.value[index].toString()),
          );
        }
      );
    },
  ),
),
```


## 应用的声明周期1
```dart
class AppObserverAtcive extends StatefulWidget {
  const AppObserverAtcive({super.key});

  @override
  State<AppObserverAtcive> createState() => _AppObserverAtciveState();
}

class _AppObserverAtciveState extends State<AppObserverAtcive> with WidgetsBindingObserver {


  String showText = '前台';
  @override
  void initState() {
    super.initState();
    // 添加观察者
    WidgetsBinding.instance.addObserver(this);
  }

  @override
  void dispose() {
    super.dispose();
    // 移除观察者
    WidgetsBinding.instance.removeObserver(this);
  }


  // 监听APP的声明周期
  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    super.didChangeAppLifecycleState(state);
    // print('当前状态APP $state');
    switch(state) {
      case AppLifecycleState.detached:
        print('清理资源');
        break;
      case AppLifecycleState.resumed:
        print('应用在前台 恢复动画 网络等');
        break;
      case AppLifecycleState.inactive:
        print('应用不活跃 失去焦点');
        break;
      case AppLifecycleState.paused:
        print('应用进入后台');
        break;
      case AppLifecycleState.hidden:
        print('应用隐藏');
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('app的声明周期'),
        
      ),
    );
  }
}

```


## 应用的声明周期2
```dart
class AppObserverAtcive extends StatefulWidget {
  const AppObserverAtcive({super.key});

  @override
  State<AppObserverAtcive> createState() => _AppObserverAtciveState();
}

class _AppObserverAtciveState extends State<AppObserverAtcive> {
  late AppLifecycleListener _appLifecycleListener;

  @override
  void initState() {
    super.initState();
    _appLifecycleListener = AppLifecycleListener(
      onShow: () {
        print('应用显示');
      },
      onHide: () {
        print('应用隐藏');
      },
      onResume: () {
        print('应用恢复可用');
      },
      onPause: () {
        print('应用暂停');
      },
      onInactive: () {
        print('应用可见 但失去焦点');
      },
      onDetach: () {
        print('应用退出');
      },
      onStateChange: (value) {
        print('当前章台：$value');
      },
      onRestart: () {
        print('应用重启');
      },
    );
  }

  @override
  void dispose() {
    super.dispose();
    _appLifecycleListener.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('app的声明周期'),
      ),
    );
  }
}
```


## Button按钮的各种操作状态设置颜色
```dart


ElevatedButton(
  onPressed: () {},
  child: Text('提交'),
  style: ButtonStyle(
    overlayColor: WidgetStateColor.resolveWith(
      (state) {
        if (state.contains(WidgetState.pressed)) {
          return Colors.blueAccent;
        }
        if (state.contains(WidgetState.focused)) {
          return Colors.black;
        }
        if (state.contains(WidgetState.dragged)) {
          return Colors.cyanAccent;
        }
        return Color(0xffb23234);
      },
    ),
  ),
)
```


## this.nextTick
```dart
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:logger/logger.dart';

void main() {
  // WidgetsFlutterBinding.ensureInitialized();
  // SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
  runApp(const MyApp());
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
      debugShowCheckedModeBanner: false,
      title: 'API-WidgetsBindingObserver',
      home: MyAPI(),
    );
  }
}

class MyAPI extends StatefulWidget {
  const MyAPI({super.key});

  @override
  State<MyAPI> createState() => _MyAPIState();
}

class _MyAPIState extends State<MyAPI> with WidgetsBindingObserver {
  GlobalKey ckey = GlobalKey();

  Random r = Random();

  late ScrollController _scrollController;

  @override
  void initState() {
    super.initState();
    _scrollController = ScrollController();
    /**
     * addPostFrameCallback 是 WidgetsBinding 类提供的帧回调方法，
     * 属于 Flutter 帧生命周期中的 “后处理阶段” 回调，其核心定位是：
     * 在当前帧的 UI 树完全构建（build）并渲染（paint）到屏幕后，执行一次特定逻辑，且不会触发新的帧请求
     * 当前帧绘制完成后执行
     * 1.在initState获取元素的宽高，直接通过key获取宽高currentContext为null，需要在组件渲染完毕后获取
     * 
     * 
    */
    // 在initState获取元素的宽高，直接通过key获取宽高currentContext为null，需要在组件渲染完毕后获取，即下一帧
    WidgetsBinding.instance.addPostFrameCallback((Duration timestamp) {
      final ele = ckey.currentContext?.findRenderObject() as RenderBox;

      // 在 initState 中直接调用 showDialog 或 Navigator.push
      //会因 context 未完全初始化而报错；通过该回调，可确保 context 可用
      showDialog(
        context: context,
        builder: (context) {
          return Dialog(
            child: Container(
              width: 300,
              height: 300,
              color: Colors.amberAccent,
            ),
          );
        },
      );

      // 渲染后恢复滚动位置
      _scrollController.jumpTo(320);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('API-WidgetsBindingObserver'),
        backgroundColor: Theme.of(context).highlightColor,
      ),
      body: Column(
        children: [
          Container(
            key: ckey,
            width: 100,
            height: 100,
            color: Colors.red,
          ),
          Expanded(
              child: ListView.builder(
                  controller: _scrollController,
                  itemCount: 100,
                  itemExtent: 80,
                  itemBuilder: (context, index) {
                    int r1 = r.nextInt(266);
                    int g1 = r.nextInt(266);
                    int b1 = r.nextInt(266);
                    return ColoredBox(
                      color: Color.fromRGBO(r1, g1, b1, 1),
                      child: Text(
                        '$r1-$g1-$b1-$index',
                        style: TextStyle(color: Colors.white),
                      ),
                    );
                  }))
        ],
      ),
    );
  }
}
```

## Flutter中key与作用
::: tip
1.ValueKey 通过传入任何数据类型创建一个key来标识元素，用于diff，ValueKey(arg)
:::
```dart



```


## MediaQuery 查询设备屏幕信息
```dart
// 获取设备尺寸
MediaQuery.of(context).size

// 获取当前设备的横竖屏状态
MediaQuery.of(context).orientation
// 竖屏
Orientation.portrait
// 横屏
Orientation.landscape

// 像素密度
MediaQuery.of(context).devicePixelRatio

//  屏幕的物理缺陷。刘海屏
MediaQuery.of(context).viewPadding

// 系统级别的遮挡如弹出的键盘
MediaQuery.of(context).viewInsets

// viewInsets和viewPadding的综合
MediaQuery.of(context).padding

// 用户偏好设置
MediaQuery.of(context).platformBrigthness




```


## NotificationListener 通知拦截
```dart




```