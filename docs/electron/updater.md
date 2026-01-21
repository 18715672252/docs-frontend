# 全量更新


## 代码实现(例子)
```js{105}
const {
  app,
  dialog,
  BrowserWindow
} = require('electron')

const log = require('electron-log')
const { join } = require("path");
if (app.isPackaged) {
  // log.transports.file.resolvePathFn = () => app.getPath('desktop') + '/logs/log.txt'
  log.transports.file.resolvePathFn = () => process.resourcesPath + '/logs/log.txt'
} else {
  log.transports.file.resolvePathFn = () => app.getPath('desktop') + '/logs/log.txt'
}


function setupAutoUpdate(web, { url, mode }) {
  // 更改isPackaged，设置成安装包环境, 测试下载更新
  // Object.defineProperty(app, 'isPackaged' , {
  //   get() {
  //     return true
  //   }
  // })
  const { delDir, getDatailsDevicesType } = require('./tools')
  if (getDatailsDevicesType() == 'x64') {
    url = url + 'x64/'
  }
  
  let r = null;
  // let reject = null;
  const p = new Promise((re, rj) => {
    r = re
  })
  const { autoUpdater } = require('electron-updater')
  
  function clearCache() {
    let updaterCacheDirName = 'elink_app-updater';
    const updatePendingPath = join(autoUpdater.app.baseCachePath, updaterCacheDirName);
    delDir(updatePendingPath);
  }
  clearCache()
  autoUpdater.logger = log
  autoUpdater.logger.transports.file.level = 'info'
  // 自动更新
  autoUpdater.autoDownload = false
  // 应用退出后自动安装新本（安装已经下载好的新版本）
  autoUpdater.autoInstallOnAppQuit = true
  // 禁用web安装器
  autoUpdater.disableWebInstaller = true
  // 禁用增量更新
  autoUpdater.disableDifferentialDownload = true
  autoUpdater.setFeedURL(url)
  log.info('当前更新的URL:' + url);
  autoUpdater.checkForUpdates()
  // 检查更新
  // autoUpdater.checkForUpdatesAndNotify()

  // 更新事件
  autoUpdater.on('checking-for-update', () => { })
  //当没有可用更新的时候触发。
  // autoUpdater.on('update-not-available', (info) => {})

  autoUpdater.on('error', (err) => {
    // sendStatusToWindow('更新错误: ' + err)
    log.error(err.toString())
  })

  // 更新下载进度事件
  autoUpdater.on('download-progress', progressObj => {
    log.info(progressObj.percent)
    if (web) web.send('update:progress:force', progressObj);
  });
  // 当有可用更新的时候触发。 更新将自动下载
  autoUpdater.on('update-available', async () => {
    clearCache()
    const local = await web.executeJavaScript('localStorage.getItem("locale")')
    
    if (mode == 1) {
      const texts = local === 'zh' ? [ '否', '是'] : ['No', 'Yes']
      const res = await dialog.showMessageBox(BrowserWindow.fromWebContents(web), {
        type: 'info',
        title: local === 'zh' ? '更新信息' : 'Update information',
        modal: true,
        message: local === 'zh' ?
          '有新的版本更新，是否立刻更新？' :
          'Is there a new version update? Do you want to update it immediately',
        buttons:texts
      })
      if (res.response == 1) {
        autoUpdater.downloadUpdate()
        r(1)
      } else {
        app.quit()
      }
    } else {
      autoUpdater.downloadUpdate()
      r(1)
    }


  })
  autoUpdater.on('update-downloaded', async (info) => {
    // 可以在这里提示用户安装
    autoUpdater.quitAndInstall();
    app.quit() // [!code error]
  })
  return p;
}


module.exports = setupAutoUpdate


```

## 遇到的问题
::: info
这个版本的（"electron-updater": "^6.6.2"）<br>
下载完毕后调用autoUpdater.quitAndInstall()后<br>
程序自动退出了
但是没有自动安装下载下来的安装包
需要手动退出程序-app.quit()
:::