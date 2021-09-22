const { description } = require('../../package');
const moment = require('moment');

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
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: 'Last Updated',
    nav: [
      {
        text: 'React',
        link: '/react/',
      },
      {
        text: 'JS&TS',
        link: '/js/',
      },
      {
        text: 'CS',
        link: '/cs/',
      },
      {
        text: 'etc',
        link: '/etc/',
      },
      {
        text: 'Blog',
        link: 'https://positiveko.netlify.app',
      },
      {
        text: 'GitHub',
        link: 'https://github.com/positiveko',
      },
    ],
    sidebar: {
      '/react/': [
        {
          title: 'React',
          collapsable: true,
          children: ['', 'using-vue'],
        },
      ],
      '/js/': [
        {
          title: 'JavaScript & TypeScript',
          collapsable: true,
          children: [''],
        },
      ],
      '/cs/': [
        {
          title: 'Computer Science',
          collapsable: true,
          children: ['', 'using-vue'],
        },
      ],
      '/etc/': [
        {
          title: 'etc',
          collapsable: true,
          children: ['', 'using-vue'],
        },
      ],
      '/review/': [
        {
          title: 'Review',
          collapsable: true,
          children: [''],
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
      {
        transformer: (timestamp, lang) => {
          const moment = require('moment');
          moment.locale(lang);
          return moment(timestamp).fromNow();
        },
      },
    ],
  ],
};
