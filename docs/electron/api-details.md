# 各种API（简单代码）

## 设置应用菜单
``` js 
// 设置应用菜单需要在app.ready监听的函数中
const temp = [
  { label: '管理中心' },
  { label: '人员管理' },
  { label: '权限管理' },
  { type: 'separator' },
  { 
      label: '系统管理',
      submenu: [
          {
              label: '切换主题',
              submenu: [
                  { 
                      label: '深色主题', 
                      type: 'radio', 
                      checked: nativeTheme.shouldUseDarkColors 
                  },
                  { 
                      label: '浅色主题', 
                      type: 'radio', 
                      checked: !nativeTheme.shouldUseDarkColors 
                  }
              ]
          }
          
      ]
  }

]

const menu = Menu.buildFromTemplate(temp)
Menu.setApplicationMenu(menu)

```

## seesion监听下载事件

``` js 
 // 监听所有窗口的下载事件
let ses = session.defaultSession
ses.on('will-download', (e, downLoadItem, webContents) => {
  console.log(downLoadItem.getFilename())
  downLoadItem.on('updated', (state) => { // 下载进度
    
  })
})
// 监听单个窗口的下载文件事件
win.webContents.session.on('will-download', (event, item, webContents) => {})

```