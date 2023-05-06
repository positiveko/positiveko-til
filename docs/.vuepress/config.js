const { description } = require('../../package');
const moment = require('moment');
const CONST = require('./const');

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Positiveko TIL',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,
  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#FF9076' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/assets/favicons/apple-touch-icon.png',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/assets/favicons/favicon-32x32.png',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/assets/favicons/favicon-16x16.png',
      },
    ],
    ['link', { rel: 'manifest', href: '/assets/favicons/site.webmanifest' }],
    ['link', { rel: 'shortcut icon', href: '/assets/favicons/favicon.ico' }],
    ['meta', { name: 'msapplication-TileColor', content: '#FF9076' }],
    [
      'meta',
      {
        name: 'msapplication-config',
        content: '/assets/favicons/browserconfig.xml',
      },
    ],
    [
      'meta',
      {
        name: 'google-site-verification',
        content: 'aixQJUSBaI6cn-DWfREP36rIT4LW_ZIVvMZ4ZO6fKTI',
      },
    ],
    [
      'script',
      {
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-JEKX2ZEJDL',
      },
    ],
    [
      'script',
      {},
      [
        "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-JEKX2ZEJDL');",
      ],
    ],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    editLinks: false,
    docsDir: '',
    lastUpdated: 'Last Updated',
    logo: '/assets/favicons/ms-icon-70x70.png',
    nav: [
      {
        text: 'TIL',
        link: '/til/2023/202305',
      },
      {
        text: 'About Me',
        link: '/aboutme/',
      },
      {
        text: 'Blog',
        link: 'https://velog.io/@edie_ko',
      },
      {
        text: 'GitHub',
        link: 'https://github.com/positiveko',
      },
    ],
    sidebar: {
      '/til/': [
        {
          title: '2023',
          collapsable: true,
          children: CONST['2023List'],
        },
        {
          title: '2022',
          collapsable: true,
          children: CONST['2022List'],
        },
        {
          title: 'React',
          collapsable: true,
          children: CONST.ReactList,
        },
        {
          title: 'React Native',
          collapsable: true,
          children: CONST.ReactNativeList,
        },
        {
          title: 'JavaScript & TypeScript',
          collapsable: true,
          children: CONST.JsTsList,
        },
        {
          title: 'Computer Science',
          collapsable: true,
          children: CONST.CsList,
        },
        {
          title: 'Etc.',
          collapsable: true,
          children: CONST.EtcList,
        },
      ],
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    [
      '@vuepress/last-updated',
      { transformer: (timestamp) => new Date(timestamp).toISOString() },
    ],
    ['sitemap', { hostname: 'https://positiveko-til.vercel.app/' }],
  ],
};
