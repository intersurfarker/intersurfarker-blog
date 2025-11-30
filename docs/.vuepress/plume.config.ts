/**
 * 查看以下文档了解主题配置
 * - @see https://theme-plume.vuejs.press/config/intro/ 配置说明
 * - @see https://theme-plume.vuejs.press/config/theme/ 主题配置项
 *
 * 请注意，对此文件的修改不会重启 vuepress 服务，而是通过热更新的方式生效
 * 但同时部分配置项不支持热更新，请查看文档说明
 * 对于不支持热更新的配置项，请在 `.vuepress/config.ts` 文件中配置
 *
 * 特别的，请不要在两个配置文件中重复配置相同的项，当前文件的配置项会覆盖 `.vuepress/config.ts` 文件中的配置
 */

import { defineThemeConfig } from 'vuepress-theme-plume'
import navbar from './navbar'
import collections from './collections'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: '/head.jpg',

  appearance: true,  // 配置 深色模式

  social: [
    { icon: 'github', link: 'https://space.bilibili.com/352596422' },
  ],
  // navbarSocialInclude: ['github'], // 允许显示在导航栏的 social 社交链接
  // aside: true, // 页内侧边栏， 默认显示在右侧
  // outline: [2, 3], // 页内大纲， 默认显示 h2, h3

  /**
   * 文章版权信息
   * @see https://theme-plume.vuejs.press/guide/features/copyright/
   */
  // copyright: true,

  // prevPage: true,   // 是否启用上一页链接
  // nextPage: true,   // 是否启用下一页链接
  // createTime: true, // 是否显示文章创建时间

  /* 站点页脚 */
  // footer: {
  //   message: 'Power by <a target="_blank" href="https://v2.vuepress.vuejs.org/">VuePress</a> & <a target="_blank" href="https://theme-plume.vuejs.press">vuepress-theme-plume</a>',
  //   copyright: '',
  // },

  /**
   * @see https://theme-plume.vuejs.press/config/basic/#profile
   */
  profile: {
    avatar: '/head.jpg',
    name: 'InterSurfArker',
    description: 'Be modest.',
    circle: true,
    location: 'Beijing, China',
    organization: 'Peking University',
  },

  navbar: [
      // 类型 A: 普通链接
      { text: '首页', link: '/', icon: 'material-symbols:home-outline' },
      { text: '博客', link: '/blog/', icon: 'material-symbols:article-outline' },

      // 类型 B: 下拉菜单 (使用 items)
      {
        text: '笔记',
        icon: 'material-symbols:code-blocks-outline',
        items: [
          // 子菜单项
          {
            text: '物理相关',
            items: [ // 支持多级嵌套（分组）
               { text: '理论物理基础', link: '/notes/fundamental-theoretical-physics/' },
               { text: '普通物理实验', link: '/notes/experiment/' }
            ]
          },
          {
            text: '数学相关',
            items: [ // 支持多级嵌套（分组）
               { text: '线性代数', link: '/notes/linear-algebra/' },
               { text: '数学物理方法', link: '/notes/mathematical-physics/' }
            ]
          },
          {
            text: '其它',
            items: [ // 支持多级嵌套（分组）
               { text: '计算概论', link: '/notes/cs101/' },
            ]
          }
        ]
      },

      {
        text: 'Call Guide',
        icon: 'material-symbols:folder-open-outline',
        items: [
          {
            text: '偶像大师',
            items: [ // 支持多级嵌套（分组）
               { text: '本家/765AS', link: '/call/765as/' },
               { text: '百万现场', link: '/call/765ms/' },
               { text: '学园偶像大师', link: '/call/gakumaster/' }
            ]
          },
          {
            text: 'BanG Dream!',
            items: [ // 支持多级嵌套（分组）
               { text: 'Poppin\' Party', link: '/call/poppinparty/' },
            ]
          },
        ]
      },

      // 类型 D: 友情链接 (Dropdown 示例)
      {
        text: '友情链接',
        icon: 'material-symbols:more-horiz',
        link: '/friend/'
      },
    ],
    collections: [
    {
      type: 'post',
      dir: 'blog',
      title: '博客',
    },
    {
        type: 'doc',
        dir: '/notes/fundamental-theoretical-physics/',
        title: '理论物理基础',
        sidebar: 'auto', // 自动生成导航结构
        sidebarCollapsed: false, // 折叠状态：true-折叠 false-展开
    }
  ],

  /**
   * 公告板
   * @see https://theme-plume.vuejs.press/guide/features/bulletin/
   */
  // bulletin: {
  //   layout: 'top-right',
  //   contentType: 'markdown',
  //   title: '公告板标题',
  //   content: '公告板内容',
  // },

  /* 过渡动画 @see https://theme-plume.vuejs.press/config/basic/#transition */
  // transition: {
  //   page: true,        // 启用 页面间跳转过渡动画
  //   postList: true,    // 启用 博客文章列表过渡动画
  //   appearance: 'fade',  // 启用 深色模式切换过渡动画, 或配置过渡动画类型
  // },

})
