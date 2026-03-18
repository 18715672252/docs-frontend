# 1.20新增组件InteractiveViewer
::: tip 
主要对移动、缩放的手势交互进行封装，简化使用。

:::
## 拖拽缩放移动组件-InteractiveViewer
``` dart 
body: Center(
  child: Row(
    children: [
      // ColoredBox(child: Image.asset('assets/images/64.png', width: 300, height: 300,), color: Colors.red,),
      Container(
        width: 150,
        height: 150,
        color: Colors.grey,
        child: InteractiveViewer(
          boundaryMargin: EdgeInsets.all(100),
          child: Image.asset('assets/images/64.png', width: 200, height: 200, fit: BoxFit.cover,),
        ),
      ),
    ],
  ),
),


```
::: info 
关于constrained属性，源码中给了一个小demo。这里的表格可以上下滚动，
左右滑动。constrained默认为true,当子组件比InteractiveViewer区域大时，
将constrained设为false, 子组件将被赋予无限的约束。


详细信息：https://juejin.cn/post/6859185139402932238#heading-1

:::


### 列表再视口内滚动
``` dart 
class InteractiveViewerDemo2 extends StatelessWidget {

  Widget build(BuildContext context) {
    const int _rowCount = 20;
    const int _columnCount = 4;

    return Container(
      width: 300,
      height: 200,
      child: InteractiveViewer(
        constrained: false,
        scaleEnabled: false,
        child: Table(
          columnWidths: <int, TableColumnWidth>{
            for (int column = 0; column < _columnCount; column += 1)
              column: const FixedColumnWidth(150.0),
          },
          children: buildRows(_rowCount, _columnCount),
        ),
      ),
    );
  }

  List<TableRow> buildRows(int rowCount, int columnCount) {
    return <TableRow>[
          for (int row = 0; row < rowCount; row += 1)
            TableRow(
              children: <Widget>[
                for (int column = 0; column < columnCount; column += 1)
                  Container(
                    margin: EdgeInsets.all(2),
                    height: 50,
                    alignment: Alignment.center,
                    color: _colorful(row,column),
                    child: Text('($row,$column)',style: TextStyle(fontSize: 20,color: Colors.white),),
                  ),
              ],
            ),
        ];
  }

  final colors = [Colors.red,Colors.yellow,Colors.blue,Colors.green];
  final colors2 = [Colors.yellow,Colors.blue,Colors.green,Colors.red];

  _colorful(int row, int column ) => row % 2==0?colors[column]:colors2[column];
}



```