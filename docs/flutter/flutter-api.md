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
/*
单帧的执行顺序
1. 调度阶段：SchedulerBinding 调度当前帧开始执行
2. Build 构建阶段：执行 Widget 的 build() 方法，生成 / 更新 Element、RenderObject 树
3. Layout 布局阶段：根据 RenderObject 的约束，计算所有控件的大小和位置
4 .Paint 绘制阶段：将计算好布局的控件，绘制到画布（Canvas）上，完成「屏幕像素渲染」
5 .✅ addPostFrameCallback 回调执行：当前帧绘制完成、还未结束时，执行注册的回调函数
帧结束：当前帧的所有任务完成，等待下一帧调度

只有在 addPostFrameCallback 的回调里，因为「布局 + 绘制都已完成」，能拿到控件最终、真实、渲染完成后的尺寸和位置信息
*/
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
     * 当前帧绘制完成前执行
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
::: info 
与nextFrame：返回一个 Future，会等待 当前帧完全结束，然后在 下一帧开始之前 执行回调，属于「下一帧的前置任务」<br>
与addPersistentFrameCallback：「永久帧回调」，每一帧都会执行一次

:::

## Flutter中key与作用
::: info
1. ValueKey 通过传入任何数据类型创建一个key来标识元素，用于diff，ValueKey(arg)
ValueKey生成的key看是否相同传入的参数，如果参数相同则生成的key也相同，局部key再同一级别必须具有唯一性
2. ObjectKey根据传入的对象来生成key，如果传入的对象指向同一个地址，则会生成相同的key
3. UniqueKey永远不会有两个相同的
:::



## Flutter中全局key的作用
::: info
class _BoxState extends State<br>
GlobalKey必须再整个APP唯一的key把GlobalKey给到widget，层级改变也能让某个widget保持状态<br>
final element = _globalKey.currentState as _BoxState;获取子组件所对应的Element中所有的state和方法<br>
element.setState()调用子组件的setState方法<br>
element.a = 100 修改子组件的状态<br>
element.fn() 调用子组件widget所对应的element的方法<br>


final dom =  key1.currentContext?.findRenderObject() as RenderBox;   // 获取子组件的渲染属性
print(dom.localToGlobal(Offset.zero)); // 获取元素相对于屏幕的位置
print(dom.size); // 获取元素的大小包括margin和padding
:::
::: warning
不要再build中创建key和initState中赋值key，
最好放在stateFluWidget中的state类中，
当作state类中的成员变量来初始化key<br>
key不是命名参数，直接传入即可【Foo(key: key1)】
:::
```dart


/// 
import 'package:flutter/material.dart'; 


/// widget和element的关系
/// widget是一个描述UI的类（是一个蓝图），element是widget的实例化对象
/// 每个widget都会对应一个element，样式和外观是由widget决定的，状态（state）是由element决定的

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final _globalKey = GlobalKey();
  void _incrementCounter() {
    // _globalKey.currentContext
    // _globalKey.currentState
    // _globalKey.currentWidget
    // 获取某个widget的状态
    final state = _globalKey.currentState as _BoxState;
    
    state._counter;
    state.setState((){})
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
              // 使用GlobalKey对子组件进行标记
              Box(color: Colors.red, title: 'red', key: _globalKey,)
          ]
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}

// 声明一个组件继承widget自动带了key参数（命名参数），使用该组件直接传入需要的key即可
class Box extends StatefulWidget {
  const Box({super.key, required this.title, required this.color});
  final String title;
  final Color color;

  @override
  State<Box> createState() => _BoxState();
}

class _BoxState extends State<Box> {
  int _counter = 0;
  @override
  Widget build(BuildContext context) {
    return Container(width: 200, height: 200, color: widget.color,child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(widget.title),
        Text('计数器：$_counter'),
        ElevatedButton(
          style: ElevatedButton.styleFrom(
            // backgroundColor: widget.color,
            shape: BeveledRectangleBorder()
          ),
          onPressed: () {
            setState(() {
              _counter++;
            });
          },
          child: const Text('Increment'),
        ),
      ],
    ));
  }
}


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
// dispatch的BuildContext必须是NotificationListener子级的context
import 'dart:math';

import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Text Path Animation',
      theme: ThemeData(primarySwatch: Colors.blue),
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
  List<bool> l = [true, false, true];

  dynamic mes = '';

  showSnackBarS(BuildContext ctx) {
    final s = SnackBar(content: Text('提示雄安锡'));
    ScaffoldMessenger.maybeOf(ctx)!.showSnackBar(s);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('小组件'),
      ),
      body: NotificationListener(
        onNotification: (notification) {
          if (notification is MyNot) {
            setState(() {
              mes = notification.message;
            });
            return true; // 拦截不再冒泡
          }
          return false; // 继续向上冒泡
        },
        child: Column(
          children: [
            Text('接受的消息：${mes}'),
            Builder(builder: (ctx) {
              return ElevatedButton(
                onPressed: () {
                  MyNot(Random().nextInt(200)).dispatch(ctx);
                },
                child: Text('发送消息'),
              );
            }),
          ],
        ),
      ),
    );
  }
}

class MyNot extends Notification {
  final dynamic message;
  MyNot(this.message);
}



```


## TextPainter获取文本的Size
::: info
在文本不绘制到屏幕上的情况下
获取文本的大小
在容器中占多少行，每行的宽度等等
:::
```dart
TextPainter tp = TextPainter(
      text: TextSpan(
        text: _text,
        style: TextStyle(color: Colors.red, fontSize: 20),
      ),
      textDirection: TextDirection.ltr,
    );
tp.layout(maxWidth: 200);


// 计算文本有多少行
List lines = tp.computeLineMetrics();


// 计算某一行文本的宽度（高度同理）
lines[index].width



```



## markNeedsLayout、markNeedsPaint、markNeedsBuild
::: tip
1. markNeedsBuild:Build → Layout → Paint Widget 状态变化（如 setState）、依赖更新
调用方式：final ele = (context as Element).markNeedsBuild();
2. markNeedsLayout:Layout → Paint 尺寸 / 位置变化（如宽度、字体大小、子节点排列）
3. markNeedsPaint:Paint 外观变化（如颜色、透明度、文本内容，尺寸不变）

:::

| 方法        |      作用对象      |  调用方式 |
| ------------- | :-----------: | ----: |
| markNeedsBuild() | Element（元素树节点） | context调用 |
| markNeedsLayout()	| RenderObject（渲染树节点）| RenderObject类中直接调用 |
| markNeedsPaint()	 | RenderObject（渲染树节点 | RenderObject类中直接调用 |