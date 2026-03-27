---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

# navbar: false

outline: 3

lastUpdated: true


footer: true

prev:
  text: 'Markdown'
  link: '/guide/markdown'


features:
  - title: 卸载面板重复问题
    details: 64位和32位覆盖安装后，卸载面板出现两个甚至多个卸载想问题
    link: /electron/control-panel-repeat
  - title: 更新软件后无法自动安装的问题（全量）
    details: 全量更新新的安装包下载下来后，程序自动退出了但没有自动安装
    link: /electron/updater
  - title: Electron无边框模式下禁止双击最大化窗口
    link: /electron/ques-gather
  - title: 获取高清屏幕
    link: /electron/ques-gather
  - title: win.hide()再使用win.show()会引起窗口闪烁问题
    link: /electron/ques-gather
  - title: 主进程打印乱码
    details: 命令行执行：chcp 65001
  - title: 新建窗口加载hash路由
    link: /electron/ques-gather
  - title: 多窗口通信方案
    link: /electron/ques-gather
  - title: 非矩形窗口击穿透透明区域方案
    link: /electron/irregular-win-click
  - title: 阻止窗口关闭
    link: /electron/ques-gather
  - title: fs.copyFile无法赋值asar内部文件的问题
    link: /electron/ques-gather
  - title: 增量更新
    details: 整体替换asar的方式
    link: /electron/incremental-update
