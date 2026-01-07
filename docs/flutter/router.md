# Flutter 路由详解

## 路由跳转方式

::: tip
Navigator是一个路由管理的组件，它提供了打开和退出路由页方法。
Navigator通过一个栈来管理活动路由集合。通常当前屏幕显示的页面就是栈顶的路由<br>
Navigator类中第一个参数为context的静态方法都对应一个Navigator的实例方法， 比如Navigator.push(BuildContext context, Route route)等价于Navigator.of(context).push(Route route) ，下面命名路由相关的方法也是一样的。
:::

**跳转方式1**
```dart
Navigator.pushNamed(context, '/page1'); // 命名路由跳转
```

**跳转方式2**

```dart
// 直接设置组件为路由，不设置name
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (ctx) => Page1(),
    settings: RouteSettings()
  ),
);
```
```dart
// 直接设置组件为路由，设置name
Navigator.push(context, MaterialPageRoute(
  builder: (ctx) => Text('123'),
  settings: RouteSettings(name: '/demo')
  )
);
```
::: tip
MaterialPageRoute继承自PageRoute类，
PageRoute类是一个抽象类，表示占有整个屏幕空间的一个模态路由页面，
它还定义了路由构建及切换时过渡动画的相关接口及属性。
<Badge type="tip" text="下面我们介绍一下MaterialPageRoute 构造函数的各个参数的意义：" />:tada: :100:
```dart
MaterialPageRoute({
  WidgetBuilder builder,
  RouteSettings settings,
  bool maintainState = true,
  bool fullscreenDialog = false,
})
```
<Badge type="info">builder</Badge> 是一个WidgetBuilder类型的回调函数，它的作用是构建路由页面的具体内容，返回值是一个 widget。我们通常要实现此回调，返回新路由的实例<br>
<Badge type="info">seeting</Badge> 包含路由的配置信息，如路由名称、是否初始路由（首页）。<br>
<Badge type="info">maintainState</Badge> 默认情况下，当入栈一个新路由时，原来的路由仍然会被保存在内存中，如果想在路由没用的时候释放其所占用的所有资源，可以设置maintainState为 false<br>
<Badge type="info">fullscreenDialog</Badge> 表示新的路由页面是否是一个全屏的模态对话框，在 iOS 中，如果fullscreenDialog为true，新页面将会从屏幕底部滑入（而不是水平方向）。
:::

**跳转方式3** <Badge type="danger" text="caution" />
```dart
// 前往page1路由，并弹出/page1栈顶上的路由
Navigator.popUntil(context, ModalRoute.withName('/page1'));
```
```dart
// 返回true停止并跳转到这个路由
// routers为栈中所有的路由
Navigator.popUntil(context, (routes) {
  print(routes);
  if (routes.settings.name == '/') {
    return true;
  }
  return false;
});
```

**跳转方式4**
```dart
// 去往page4页面，并把page1后面(在page1上面)的路由栈全部清除
Navigator.pushAndRemoveUntil(
  context,
  MaterialPageRoute(
    builder: (ctx) {
      return Page4();
    },
    settings: RouteSettings(name: '/page4')
  ),
  ModalRoute.withName('/page1'),
);
// 同pushAndRemoveUntil，第二参数为字符串
Navigator.pushNamedAndRemoveUntil(context, newRouteName, predicate)
```

**跳转方式5**
```dart
// 弹出当前路由并push进一个新路由，并把老路由在栈中的位置替代
Navigator.popAndPushNamed(context, '/meeting_details');
```

**跳转方式6**
```dart
// vueRouter的replace
Navigator.pushReplacement(context, newRoute);
Navigator.pushReplacementNamed(context, routeName)
```

**跳转方式7**
```dart
// 当前路由能弹出就弹出，不能弹出则返回false
Navigator.maybePop(context);
```


## 路由传参与获取


```dart
// 路由传递参数
Navigator.of(context).pushNamed("new_page", arguments: "hi");
// 路由组件获取参数
class EchoRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    //获取路由参数  
    var args = ModalRoute.of(context).settings.arguments;
  }
}
```

::: info
This is an info box.
:::


## 动态路由 <Badge type="tip">路由钩子</Badge>
::: info
MaterialApp有一个onGenerateRoute属性，它在打开命名路由时可能会被调用，之所以说可能，
是因为当调用Navigator.pushNamed(...)打开命名路由时，如果指定的路由名在路由表(routes配置的map)中已注册，
则会调用路由表中的builder函数来生成路由组件；如果路由表中没有注册，
才会调用onGenerateRoute来生成路由:pilot:
:::
```dart{10}
MaterialApp(
  onGenerateRoute:(RouteSettings settings){
	  return MaterialPageRoute(builder: (context){
        String routeName = settings.name;
        // 如果访问的路由页需要登录，但当前未登录，则直接返回登录页路由，
        // 引导用户登录；其他情况则正常打开路由。
        // 此处可以根据不同的name返回不同的页面

        //获取路由参数  
        var args = ModalRoute.of(context).settings.arguments;

        // 获取 /product/:id 这种路径中带有参数的
        final uri = Uri.parse(srrting.name);

        if (uri.pathSegments.length == 2 && uri.pathSegments.first == 'product') {
          return Product()
        }
      };
    );
  }
);
```
::: tip
注意，onGenerateRoute 只会对命名路由生效。:pilot:
:::



## 注册路由表
```dart
MaterialApp(
  title: 'Flutter Demo',
  initialRoute:"/", //名为"/"的路由作为应用的home(首页)
  theme: ThemeData(
    primarySwatch: Colors.blue,
  ),
  //注册路由表
  routes:{
   "new_page":(context) => NewRoute(),
   "/":(context) => MyHomePage(title: 'Flutter Demo Home Page'), //注册首页路由
  } ,
  home: MyHomePage(title: 'Flutter Demo Home Page'),
);
```
::: tip
其中home对应的路由为'/'根路由<br>
如果不设置后home属性的话则需要指定根路由和配置根路由的路由表
:::


## 路由跳转动画 :rose:
::: tip
路由的动画切换需要用到PageRouteBuilder这个类<br>
MaterialPageRoute就是集成自[PageRoute]
:::
```dart
// 为每个路由都配置动画
onGenerateRoute: (settings) {
  return PageRouteBuilder(
    transitionDuration: Duration(milliseconds: 500),
    reverseTransitionDuration: Duration(milliseconds: 500),
    pageBuilder: (ctx, an1, an2) {
      return routes[settings.name]!(ctx);
    },
    transitionsBuilder:
        (context, animation, secondaryAnimation, child) {
      // 左侧滑入动画
      const begin = Offset(1.0, 0.0);  // 从右侧进入
      const end = Offset(0.0, 0.0);
      const curve = Curves.ease;
      final tween =
          Tween(begin: begin, end: end).chain(CurveTween(curve: curve));
      final offsetAnimation = animation.drive(tween);

      return SlideTransition(
        position: offsetAnimation,
        child: child,
      );
    },
  );
},
```
```dart
// 例如我们想以渐隐渐入动画来实现路由过渡，实现代码如下：
Navigator.push(
  context,
  PageRouteBuilder(
    transitionDuration: Duration(milliseconds: 500), //动画时间为500毫秒
    pageBuilder: (BuildContext context, Animation animation,
        Animation secondaryAnimation) {
      return FadeTransition(
        //使用渐隐渐入过渡,
        opacity: animation,
        child: PageB(), //路由B
      );
    },
  ),
);

```

## More

[查看更多关于路由的信息](https://book.flutterchina.club/chapter2/flutter_router.html#_2-4-1-%E4%B8%80%E4%B8%AA%E7%AE%80%E5%8D%95%E7%A4%BA%E4%BE%8B).
