# 疑难杂症集合（简单代码）

## Electron无边框模式下禁止双击最大化窗口


::: info 
问题描述：
Electron无边框模式下，同时启用了：frame:false，transparent:true；这时候窗口是不可以拖动的。但是您想拖动的话，这时候您要在网页中给某个元素声明一个：-webkit-app-region: drag;
但是声明了又衍生了一个新的问题，你双击之后drag区域会把窗口最大化要么就是贴在左边，背景色变成黑色的（如果你使用了box-shadow的话)。不知道您的问题是否和我一样。坐了N多次梯子都没有找到漂亮的方案，什么ipc发送鼠标偏移，什么嵌套div都试过了效果都不理想。研究了下官方文档总算是看到一丝曙光

:::

``` js 
// 设置窗口是否可以由用户手动最大化。
mainWindow.setMaximizable(false)
// 设置用户是否可以调节窗口尺寸
mainWindow.setResizable(false)


```

## 获取屏幕的高清截图
``` js 
const screenSize = screen.getPrimaryDisplay().bounds
  const scaleFactor = screen.getPrimaryDisplay().scaleFactor
  console.log(screenSize)
  desktopCapturerSize = {
    width: screenSize.width * scaleFactor,
    height: screenSize.height * scaleFactor
  }
const sources = await desktopCapturer.getSources({
  types: ['screen'],
  thumbnailSize: desktopCapturerSize
})
  // const imgUrl = sources[0].thumbnail.resize({ width: 1536, height: 864 }).toDataURL()
const imgUrl = sources[0].thumbnail.toDataURL()

```

## win.hide()再使用win.show()会引起窗口闪烁问题
``` js
app.commandLine.appendSwitch('wm-window-animations-disabled');

 ```

## 进程通信无法传入blob数据
``` js 
blob.arrayBuffer().then((bf) => {
  // 发送数据到主进程
  window.api.sendIpcMain('desktopCapturerWin', { blob: bf, ...bounds })
  window.api.sendIpcMain('ClearDesktopCapturer')
})
// 主进程接受数据
const aa = Buffer.from(blob)
const url = nativeImage.createFromBuffer(aa).toDataURL()

```


## 新建窗口加载hash路由

``` js 
// 使用loadFile的话，后面的hash路径写在第二个参数的hash属性里面
/*
假如新窗口加载的是localhost:3000/#/login路由
要这样写
this.win.loadFile(join(__dirname, '../renderer/index.html'), {
  hash:  login
})


**/

this.win.loadFile(join(__dirname, '../renderer/index.html'), {
  hash: winUrl
})

```

## 多窗口通信方案1

``` js 
// 1. 让某个页面执行执行Promise.resolve(window.message)
// 2. mainWindow.webContents.executeJavaScript返回promise
// 3. mainWindow.webContents.executeJavaScript('Promise.resolve(message)').then(data => {
//     data就是字符串'Promise.resolve(message)'中的massage的值
//     此处message读取的是window.message的值
// })


ipcMain.handle('getPageAMsg', () => {
    return mainWindow.webContents.executeJavaScript('Promise.resolve(message)')
})

ipcMain.handle('getPageData', async () => {
    const a = await mainWindow.webContents.executeJavaScript('Promise.resolve(msg1)')
    if (!mainWindow1) return
    mainWindow1.webContents.send('getPageData1', a)
})

```

## 阻止窗口关闭
``` js 
mainWindow.on('close', async (ev) => {
    ev.preventDefault()
    const { response } = await dialog.showMessageBox(mainWindow, {
      message: '确定要关闭窗口吗？',
      buttons: ['确定', '取消'],
      title: '提示'
    })
    if (!response) {
      mainWindow.destroy()
    }
  })

```