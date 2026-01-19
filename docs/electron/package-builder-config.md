# package.json

## 打包配置
::: info 
files 是配置那些文件需要打包进归档文件（app.asar）中的配置
files 是一个字符串数组，写在项目根目录的 package.json 中，和 scripts 同级，核心遵循「白名单（包含）+ 黑名单（排除）」的规则

:::
::: info 
extraResources 是打包时将某些文件复制到resources文件夹下的配置
process.resourcesPath可以获取生产环境下resources文件夹的绝对路径<br>
extraFiles 是打包时某些文件复制到自己指定目录的配置
:::
```js
{
  "name": "elink_app",
  "version": "2.0.1",
  "main": "./src/main/main.js",
  "scripts": {
    "dev": "electron .",
    "build:win": "electron-builder --win",
    "build:mac": "electron-builder --mac",
    "build:linux": "electron-builder --linux"
  },
  "repository": {
    "type": "git",
    "url": ""
  },
  "keywords": [],
  "author": "中债e联",
  "license": "ISC",
  "productName": "中债e联",
  "description": "中债e联",
  "devDependencies": {
    "electron": "^37.3.0",
    "electron-builder": "^26.0.12"
  },
  "build": {
    "appId": "com.chinabond.boom",
    "productName": "中债e联",
    // 压缩级别
    "compression": "maximum",
    "asar": true,
    "publish": {
      "provider": "generic",
      "url": ""
    },
    // 带感叹号该文件将不打包进app.asar中
    "files": [
      "!SDK",
      "!RTCSDK",
      "!html",
      "!.npmrc",
      // 排除node_modules中的安装依赖
      "!node_modules/@electron-toolkit/**/*"
    ],
    "extraFiles": [
      {
        "from": "html",
        "to": "./resources/html"
      },
      {
        "from": "SDK",
        "to": "./resources/SDK",
        "filter": [
          "index.js",
          "plugin/${os}_${arch}/**/*",
          "!**/log/*"
        ]
      },
      {
        "from": "RTCSDK",
        "to": "./resources/RTCSDK",
        "filter": [
          "index.js",
          "plugin/${os}_${arch}/**/*"
        ]
      }
    ],
    "directories": {
      "output": "dist",
      "buildResources": "resources"
    },
    "win": {
      "executableName": "中债e联",
      "icon": "build/icon512.png",
      "artifactName": "中债e联.${ext}",
      "target": [
        {
          "target": "nsis",
          "arch": [
            "x64",
            "ia32"
          ]
        }
      ]
    },
    "mac": {
      "target": [
        "dmg",
        "zip"
      ],
      "icon": "build/icon512.png",
      "artifactName": "中债e联.${ext}",
      "category": "public.app-category.video",
      "darkModeSupport": true,
      "gatekeeperAssess": false,
      "identity": "Jinan Huiyunliangzi Technology Co., Ltd. (MJ4MV3883N)",
      "entitlements": "build/entitlements.mac.plist",
      "entitlementsInherit": "build/entitlements.mac.plist",
      "extendInfo": {
        "NSMicrophoneUsageDescription": "请允许本程序访问您的麦克风",
        "NSCameraUsageDescription": "请允许本程序访问您的摄像头",
        "CFBundleURLSchemes": [
          "chinabondmeeting"
        ]
      }
    },
    "dmg": {
      "artifactName": "${name}-${version}.${ext}"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true,
      "perMachine": true,
      "createDesktopShortcut": true,
      "createStartMenuShortcut": true,
      "artifactName": "${productName}-${version}-${os}-${arch}-setup.${ext}",
      "uninstallDisplayName": "${productName}",
      "deleteAppDataOnUninstall": true
    }
  },
  "dependencies": {
    "@electron-toolkit/utils": "^4.0.0",
    "electron-log": "^5.4.2",
    "electron-updater": "^6.6.2"
  }
}
```


