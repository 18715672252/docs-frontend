# ListView滚动列表保活方案


## 方案一
::: info
使用addAutomaticKeepAlives结合minix-AutomaticKeepAliveClientMixin方式
:::
```dart
ListView.builder(
  itemExtent: 100,
  itemCount: 200,
  addAutomaticKeepAlives: true, // 开启保活
  itemBuilder: (ctx, index) {
    return DemoItem(
      index: index,
    );
  },
)




class DemoItem extends StatefulWidget {
  const DemoItem({super.key, required this.index});

  final int index;
  @override
  State<DemoItem> createState() => _DemoItemState();
}

class _DemoItemState extends State<DemoItem> with AutomaticKeepAliveClientMixin<DemoItem> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    super.build(context);
    return Container(
      color: Colors.primaries[widget.index % 17],
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            '${widget.index}',
            style: TextStyle(fontSize: 20, color: Colors.white),
          ),
          OutlinedButton(
            onPressed: () {
              setState(() {
                count++;
              });
            },
            child: Text('当前点击次数：$count', style: TextStyle(fontSize: 25, color: Colors.white),),
          ),
        ],
      ),
    );
  }
  
  @override
  bool get wantKeepAlive => true;
}

```



## 方案二
::: info
将列表显示的数据提取出来
当列表卸载的时候通过卸载函数反向赋值给提取出来的数据
:::
```dart
class DataModel {
  DataModel({required this.count, required this.text});
  int count = 0;

  String text = '123';
}

class Demo extends StatefulWidget {
  const Demo({super.key});

  @override
  State<Demo> createState() => _DemoState();
}

class _DemoState extends State<Demo> with SingleTickerProviderStateMixin {

  @override
  Widget build(BuildContext context) {
    List<DataModel> list = List.generate(100, (index) => DataModel(count: 0, text: '123'));
    return SafeArea(
      child: SizedBox(
        width: double.infinity,
        height: double.infinity,
        child: ListView.builder(
          itemExtent: 100,
          itemCount: list.length,
          itemBuilder: (ctx, index) {
            return DemoItem(
              index: index,
              dataModel: list[index],
            );
          },
        ),
      ),
    );
  }
}

class DemoItem extends StatefulWidget {
  const DemoItem({super.key, required this.index, required this.dataModel});

  final int index;

  final DataModel dataModel;
  @override
  State<DemoItem> createState() => _DemoItemState();
}

class _DemoItemState extends State<DemoItem> {
  late int aa;

  late TextEditingController _input;
  @override
  void initState() {
    super.initState();
    aa = widget.dataModel.count;

    _input = TextEditingController(text: widget.dataModel.text);
  }

  @override
  void dispose() {
    super.dispose();
    widget.dataModel.count = aa;
  }
  
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.primaries[widget.index % 17],
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            '${widget.index}',
            style: TextStyle(fontSize: 20, color: Colors.white),
          ),
          OutlinedButton(
            onPressed: () {
              setState(() {
                aa++;
              });
            },
            child: Text(
              '当前点击次数：$aa',
              style: TextStyle(fontSize: 20, color: Colors.white),
            ),
          ),
          Expanded(child: TextField(
            controller: _input,
            onChanged: (value) {
              widget.dataModel.text = value;
            },
          ))
          
        ],
      ),
    );
  }
}


```