# 非矩形窗口击穿透透明区域方案

## 描述
::: info 
不规则窗口点击透明区域可以穿透到下方的软件

可以使用下面API来解决<br>
mainWindow.setIgnoreMouseEvents(false) // 不可以穿透<br>
mainWindow.setIgnoreMouseEvents(true, { forward: true }) // 点击可以穿透，移动事件不可以

:::

## 代码
``` css
html, body {
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.app {
    width: 100%;
    height: 100%;
    background-color: red;
    border-radius: 50%;
    pointer-events: auto;
    display: flex;
    overflow: hidden;
}

```
``` js
// 渲染进程
import React from 'react'
import './App.css'
function App(): JSX.Element {
  const [circle, setCircle] = React.useState(false)
  React.useEffect(() => {
    window.addEventListener('mousemove', (event) => {
      // 为false为在圆外，在透明区域内，需要点击穿透透明区域
      // 为true为在圆内，不在透明区域内
      const flag = event.target !== document.documentElement
      setCircle(flag)
      if (flag) {
        // 设置点击事件正常 setIgnoreMouseEvents(false)
        window.api.setIgnoreMouseEvents(false)
      } else {
        // 在圆外的话则穿透 setIgnoreMouseEvents(true, { forward: true })
        window.api.setIgnoreMouseEvents(true, { forward: true })
      }
    })
  }, [])
  return (
    <div className="app">
      <div className="drag">{circle ? '在圆内' : '在圆外'}</div>
    </div>
  )
}

export default App

```

``` js 
// 主进程
ipcMain.on('set-ignore-mouse-events', (_event, ...args: [boolean, { forward: boolean }?]) => {
  mainWindow.setIgnoreMouseEvents(...args)
})


```