import { defineConfig } from 'vitepress'
const htmlCss = [
  { text: 'HTML', link: 'www.baidu.com' },
  { text: 'CSS', link: 'www.baidu.com' },
  { text: 'SCSS', link: 'www.baidu.com' }
]

const flutters = [
  { text: '布局组件', link: '/flutter/layout' },
  { text: '特效组件', link: '/flutter/special-effects-component' },
  { text: '动画组件', link: '/flutter/animation-component' },
  { text: '路由', link: '/flutter/router' },
  { text: '弹框', link: '/flutter/dialog' },
  { text: '效果制作', link: '/flutter/effect-production' },
  { text: 'Flutter API', link: '/flutter/flutter-api' }
]

const electrons = [
  { text: 'builder打包配置', link: 'www.baidu.com' },
  { text: '软件更新-全量更新', link: '/flutter/special-effects-component' },
  { text: '软件更新-增量更新', link: '/flutter/special-effects-component' },
  { text: '防脱壳', link: '/flutter/animation-component' },
  { text: '疑难杂症', link: '/flutter/animation-component' },
  { text: 'win和mac兼容性问题', link: '/flutter/animation-component' },
  { text: '各种方案', link: 'www.baidu.com' }
]

const vueReact = [
  { text: 'Vue2.0', link: 'www.baidu.com' },
  { text: 'Vue3.0', link: '/flutter/special-effects-component' },
  { text: 'React', link: '/flutter/special-effects-component' },
]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端知识库",
  description: "前端各种技术的文档和疑难杂症重难点",
  base: '/docs-frontend/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    outline: [2, 6],
    outlineTitle: '文章目录',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'HTML、CSS', items: htmlCss },
      { text: 'JavaScript', items: htmlCss },
      { text: 'Webpack', items: htmlCss },
      { text: 'Electron', items: electrons },
      { text: 'Flutter', items: flutters },
      { text: 'Dart', items: htmlCss },
      { text: '前端框架', items: vueReact },
    ],

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples1', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],
    // sidebar: {
    //   '/flutter': {

    //     items: [
    //       { text: 'Markdown Examples1', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
  
    //   }
    // },

    aside: 'left',


    

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],


    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    },
    
    footer: {
      copyright: 'Copyright © 2026-present 孙'
    }
  }
})
