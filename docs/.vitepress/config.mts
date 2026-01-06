import { defineConfig } from 'vitepress'
const htmlCss = [
  { text: 'HTML', link: 'www.baidu.com' },
  { text: 'CSS', link: 'www.baidu.com' },
  { text: 'SCSS', link: 'www.baidu.com' }
]

const flutters = [
  { text: '布局组件', link: 'www.baidu.com' },
  { text: '特效组件', link: '/flutter/special-effects-component' },
  { text: '动画组件', link: '/flutter/animation-component' },
  { text: '路由', link: 'www.baidu.com' }
]
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端知识库",
  description: "前端各种技术的文档和疑难杂症重难点",
  base: '/docs-frontend/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    outline: [1, 6],
    outlineTitle: '文章目录',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'HTML、CSS', items: htmlCss },
      { text: 'JavaScript', items: htmlCss },
      { text: 'Webpack', items: htmlCss },
      { text: 'Electron', items: htmlCss },
      { text: 'Flutter', items: flutters },
      { text: 'Dart', items: htmlCss },
      { text: '前端框架', items: htmlCss },
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
