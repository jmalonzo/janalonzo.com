module.exports = {
    title: 'b-log',
    description: 'undefined',
    dest: 'dist',
    ga: 'UA-594998-17',
    markdown: {
        lineNumbers: true,
        toc: {
            includeLevel: [1, 2]
        }
    },
    theme: 'yuu',
    themeConfig: {
        navbar: true,
        lastUpdated: true,
        sidebar: 'auto',
        smoothScroll: true,
    },
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-152x152.png' }],
        ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
        ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
      ],
      plugins: [
        [
          '@vuepress/pwa',
          {
            serviceWorker: true,
            updatePopup: {
                message: "New content is available.",
                buttonText: "Refresh"
            }
          }
        ]
      ],
}