# Dialog内无法选中复选框修复方案


::: info
出现原因：
setState方法只会针对当前context的子树重新build，但是我们的对话框并不是在_DialogRouteState的build 方法中构建的，而是通过showDialog单独构建的，所以在_DialogRouteState的context中调用setState是无法影响通过showDialog构建的UI的。另外，我们可以从另外一个角度来理解这个现象，前面说过对话框也是通过路由的方式来实现的，那么上面的代码实际上就等同于企图在父路由中调用setState来让子路由更新，这显然是不行的！

:::

## 方案一   使用标脏的方式
```dart
class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  bool withTree = false; // 复选框选中状态


  int a = 100;


  @override
  Widget build(BuildContext context) {
    print('123');
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Color(0xff123456),
      ),
      body: Column(
        children: <Widget>[
          ElevatedButton(onPressed: () {
            a++;
          
          }, child: Text('$a')),
          ElevatedButton(onPressed: () {
            (context as Element).markNeedsBuild();
          }, child: Text('标脏')),
          ElevatedButton(
            child: Text("对话框2"),
            onPressed: () async {
              bool? delete = await showDeleteConfirmDialog2();
              if (delete == null) {
                print("取消删除");
              } else {
                print("同时删除子目录: $delete");
              }
            },
          ),
        ],
      ),
    );
  }

  Future<bool?> showDeleteConfirmDialog2() {
    // bool withTree = false; // 默认复选框不选中
    return showDialog<bool>(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text("提示"),
          content: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              Text("您确定要删除当前文件吗?"),
              Row(
                children: <Widget>[
                  Text("同时删除子目录？"),
                  Builder(
                    builder: (ctx) {
                      return Checkbox(
                        value: withTree,
                        onChanged: (bool? value) {
                          //复选框选中状态发生变化时重新构建UI
                          setState(
                            () {
                              //更新复选框状态
                              (context as Element).markNeedsBuild();
                              withTree = !withTree;
                            },
                          );
                        },
                      );
                    },
                  ),
                ],
              ),
            ],
          ),
          actions: <Widget>[
            TextButton(
              child: Text("取消"),
              onPressed: () => Navigator.of(context).pop(),
            ),
            TextButton(
              child: Text("删除"),
              onPressed: () {
                //执行删除操作
                Navigator.of(context).pop(withTree);
              },
            ),
          ],
        );
      },
    );
  }
}

```
::: tip 
Flutter是一个响应式框架，要更新UI只需改变状态后通知框架页面需要重构即可，
而Element的markNeedsBuild()方法正是来实现这个功能的！
markNeedsBuild()方法会将当前的Element对象标记为“dirty”（脏的），
在每一个Frame(帧)，Flutter都会重新构建被标记为“dirty”Element对象

:::

## 方案二   StatefulBuilder
```dart
class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  bool withTree = false; // 复选框选中状态

  bool withTree1 = false; // 复选框选中状态
  @override
  Widget build(BuildContext context) {
    print('123');
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Color(0xff123456),
      ),
      body: Column(
        children: <Widget>[
          ElevatedButton(
            child: Text("对话框1"),
            onPressed: () async {
              bool? delete = await showDeleteConfirmDialog2();
              if (delete == null) {
                print("取消删除");
              } else {
                print("同时删除子目录: $delete");
              }
            },
          ),
          ElevatedButton(
            child: Text("对话框2"),
            onPressed: () async {
              bool? delete = await showDeleteConfirmDialog2();
              if (delete == null) {
                print("取消删除");
              } else {
                print("同时删除子目录: $delete");
              }
            },
          ),
        ],
      ),
    );
  }

  Future<bool?> showDeleteConfirmDialog1() {
    // bool withTree = false; // 默认复选框不选中
    return showDialog<bool>(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text("提示"),
          content: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              Text("您确定要删除当前文件吗?"),
              Row(
                children: <Widget>[
                  Text("同时删除子目录？"),
                  StatefulBuilder(builder: (ctx, csetState) {
                    return Checkbox(
                      value: withTree1,
                      onChanged: (bool? value) {
                        //复选框选中状态发生变化时重新构建UI
                        csetState(
                          () {
                            withTree1 = !withTree1;
                          },
                        );
                      },
                    );
                  }),
                ],
              ),
            ],
          ),
          actions: <Widget>[
            TextButton(
              child: Text("取消"),
              onPressed: () => Navigator.of(context).pop(),
            ),
            TextButton(
              child: Text("删除"),
              onPressed: () {
                //执行删除操作
                Navigator.of(context).pop(withTree);
              },
            ),
          ],
        );
      },
    );
  }

}
```

::: info 

执行StatefulBuilder的builder函数中参数的第二个参数则<br>
会重新builder函数
:::