# 64位安装包和32位安装互相覆盖后卸载面板出现重复项的问题


## 出现的原因
::: info 
出现这个问题原因：<br>
64位的安装包卸载项在注册表这个路径下：<br>
计算机\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\{应用的GUID}<br>
32位的安装包卸载项在注册表这个路径下：<br>
计算机\HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\{应用的GUID}


互相覆盖安装后，卸载选件的注册表路径没有删除上一个安装包的，所以会出现两个
:::





## 解决方案
:::  info
可以自定义nsis脚本在一个安装包安装时删除另一个位数的注册表卸载项

1. 新建一个nsh文件

2. 在package.json配置<br>
build: {<br>
  &nbsp;&nbsp;"nsis": {<br>
    &nbsp;&nbsp;"include": "build/clean-builder.nsh"<br>
  &nbsp;&nbsp;}<br>
}<br>

:::


``` txt
!include "x64.nsh"
!macro customInstall
  ${If} ${RunningX64}
    MessageBox MB_OK "❌ 当前是64位Windows操作系统"
    ; 删除 64 位系统上可能残留的 32 位卸载项（WOW64 重定向）
    DeleteRegKey HKLM "SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\${APP_GUID}"
  ${Else}
    MessageBox MB_OK "❌ 当前是32位Windows操作系统"
    ; 删除 32 位系统上可能残留的 64 位卸载项（反向兼容）
    DeleteRegKey HKLM "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\${APP_GUID}"
  ${EndIf}
!macroend

!macro customUninstall
  ; 卸载时清理所有可能的残留键（避免残留）
  DeleteRegKey HKLM "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\${APP_GUID}"
  DeleteRegKey HKLM "SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\${APP_GUID}"
!macroend

```