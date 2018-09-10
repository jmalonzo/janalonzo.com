module.exports = {
    title: 'b-log',
    description: 'undefined',
    dest: 'dist',
    ga: 'UA-594998-17',
    serviceWorker: true,
    markdown: {
        lineNumbers: true,
        toc: {
            includeLevel: [1, 2]
        }
    },
    themeConfig: {
        navbar: true,
        lastUpdated: true,
        serviceWorker: {
            updatedPopup: true,
        }
    }
}