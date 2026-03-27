# 增量更新-整体替换asar的方式

## 整体思路和遇到的问题
::: info 
整体思路：
1. 下载最新版本的asar到本地
2. 替换本地老版本的asar

遇到的问题：
1. 通过流无法下载asar的问题<br>
  解决：asar是一种归档文件，fs模块读取会有一定问题建议更改成其他后缀的文件然后再改名
2. 压缩文件文件中包含asar解压后文件夹为空的问题<br>
  解决：改成其他后缀的文件然后再压缩
3. windiows端正在运行时无法替换asar的问题和主进程退出后无法替换asar的问题<br>
  解决：点击有更新内容是时，下载最新的asar文件到本地<br>
  使用bat文件生成exe脚本，退出程序时（app.quit事件）创建子进程<br>
  子进程与父进程分离然后用子进程执行exe文件完成替换<br>
4. 程序安装到C盘，替换asar会遇到UAC权限问题<br>
  解决：使用sudo-prompt库来进行提权执行exe


:::



::: tip 
使用Bat_To_Exe_Converter可以将bat脚本转化为exe


cnpm i sudo-prompt -S 下载提权库
注意：注意：sudo-prompt这个包很久没维护了，现在最新的还有一些问题，主要是带有中文路径会出错
可以使用这个fork分支来进行构建 https://github.com/xuxingeren/sudo-prompt
:::

## 主进程代码
``` js 
// 新建提权执行exe的函数
var sudo = require('sudo-prompt')
var options = {
  name: 'Electron' // 提权弹框展示的名称
}

export const updateApp = (shell) => {
  return new Promise((resolve, reject) => {
    sudo.exec(shell, options, function (error, stdout) {
      if (error) {
        reject(error)
        console.log('error:' + error)
        return
      }
      resolve(stdout)
      console.log('stdout: ' + stdout)
    })
  })
}


```

``` js 
// 使用上方的updateApp
// 此代码为伪代码，需要等待下载好最新版本的asar和exe
// 找到下载好的exe和asar再去执行这个文件
ipcMain.on('exceExe', () => {
  // 省略下载文件的代码

  // 这里可以添加判断，如果软件是安装在c盘使用sudoPrompt进行提权执行update.exe，不是的话可以直接执行update.exe
  // 临时提权运行exe，exe中关闭主进程，替换安装c盘中的asar
  // （提权是为了处理c盘，如果安装其他盘，可以直接用node.exec运行exe替换）
  // 由于提权后的exe打开electron，导致其启动后也会是管理员权限，故需降权进行启动，explorer.exe。
  const p3 = process.resourcesPath
  const p6 = path.join(process.resourcesPath, '../')
  updateApp(`"${path.join(p6, '/update.exe')}" "${p3}" "test-update.exe" "${app.getPath('exe')}"`)
})


```


## bat脚本
``` bat 
<!-- bat脚本 -->
@echo off
taskkill /f /im %3
timeout /T 1 /NOBREAK
del /f /q /a %1\app.asar
move %2\update.asar %1
ren %1\update.asar app.asar
explorer.exe %4

```

::: info 
%1和%2为运行脚本传入的参数，比如update.bat aaa bbb，那么%1为aaa，%2为bbb，
上面我们执行exe时传入的，
也就是%1为resourcesPath（也就是我们的app.asar所在目录），%2为下载更新的update.asar所在目录，
%3为软件的进程名称(可在任务管理器中查看)，%4为软件的启动exe。
这里的逻辑是Electron应用，暂停1秒钟，然后删除app.asar，将update.asar移动到app.asar目录下，
重命名为app.asar，启动Electron应用。
下载Bat To Exe Converter这个软件，将update.bat转换为update.exe，
详细操作请看前面两期的详细说明。
对比上一期的我们发现启动时没用start命令了，而是用的explorer.exe，它是Windows系统自带的程序管理器，
这里的处理是打包的Electron应用不带有管理员权限，但是如果我们提权后执行此exe启动Electron应用，
我们会发现此时Electron应用也具有了管理员权限，故需要使用explorer.exe降权启动。

参考：https://juejin.cn/post/7043594389670592548
:::



