({
    // appDir: '/',
    baseUrl: './',
    mainConfigFile: 'main.js',
    dir: '../build',
    removeCombined: true,
    findNestedDependencies: true,
    optimize: 'uglify2',
    skipDirOptimize: true,
    // optimizeCSS: true,

    modules: [
    {
        name: 'main'
    },
    {
        name: 'require-lightbox',
        exclude: ['main'],
    },
    {
        name: 'require-form',
        exclude: ['main'],
    },
    ],
})
