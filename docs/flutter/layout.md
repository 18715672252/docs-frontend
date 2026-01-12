---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

features:
  - title: PreferredSize
    details: 自定义AppBar的高度(点击查看详情)
    link: /flutter/preferred-size
  - title: LayoutBuilder组件
    details: 通过 LayoutBuilder，我们可以在布局过程中拿到父组件传递的约束信息，然后我们可以根据约束信息动态的构建不同的布局
  - title: Bulder组件
    details: 可以获取context
  - title: Flow组件
    details: Flow是一个对子组件尺寸以及位置调整非常高效的控件
    link: /flutter/flow
  - title: FractionallySizedBox
    details: 相对与父组件最大约束的百分比设置子组件宽度，对子组件是紧约束
  - title: LimitedBox
    details: 点击查看详情  
    link: /flutter/simple-components-gather#LimitedBox
  - title: Spacer
    details: 弹性留白
  - title: Expanded
    details: 自适应沾满Row和Column的剩余空间，紧约束
  - title: Flexible
    details: 自适应沾满Row和Column的剩余空间，可以通过配置fit设置约束
  - title: Offstage
    details: 让组件隐藏，使用GlobalKey仍然获取
  - title: Visibility
    details: 让组件隐藏，从组件树移除
  - title: IndexedStack
    details: 自适应沾满Row和Column的剩余空间，可以通过配置fit设置约束
  - title: RepaintBoundary
    details: 开启新图层绘制组件防止发生回流。可用于组件截图
    link:
  - title: Column和Row
    details: 如果Row里面嵌套Row，或者Column里面再嵌套Column，那么只有最外面的Row或Column会占用尽可能大的空间，里面Row或Column所占用的空间为实际大小
    link:
---