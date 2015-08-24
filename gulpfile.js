var gulp            = require('gulp');
var browserSync     = require('browser-sync');
var sass            = require('gulp-sass');
var compass         = require('gulp-compass');
var prefix          = require('gulp-autoprefixer');
var cp              = require('child_process');

var uglify          = require('gulp-uglify');
var notify          = require("gulp-notify");
var rename          = require('gulp-rename');
var concat          = require('gulp-concat');
var svgmin          = require('gulp-svgmin');
var svgstore        = require('gulp-svgstore');
var htmlmin         = require('gulp-htmlmin');
var imagemin        = require('gulp-imagemin');
var advpng          = require('imagemin-advpng');
var pngcrush        = require('imagemin-pngcrush');
var mozjpeg         = require('imagemin-mozjpeg');
var responsive      = require('gulp-responsive');
var image_resize    = require('gulp-image-resize');
var rjs             = require('requirejs');

require('gulp-run-seq');

// Show messages
var messages    = {jekyllBuild: '<div style="color: grey;left:0;right:auto;position:fixes;width:100%;">Running:</div> $ jekyll build'};

// Handle any compass compiling errors
function handleError(err)
{
    console.log(err.toString());
    this.emit('end');
}


/**
 * Build the Jekyll Site
 */
 gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'}).on('error', handleError).on('close', done);
 });


/**
 * Rebuild Jekyll & do page reload
 */
 gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
 });


/**
 * Wait for jekyll-build, then launch the Server
 */
 gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
 });


/**
 * Compile files from /sass into both _site/css (for live injecting) and site (for future jekyll builds)
 */
 gulp.task('sass', function ()
 {
    gulp.src('sass/**/*.scss')
    .pipe(compass({
        config_file: './config.rb',
        bundle_exec: true,
        onError: browserSync.notify
    }))
    .on('error', handleError)
    .pipe(prefix(
    'last 6 Chrome versions',
    'last 6 Firefox versions',
    'last 4 iOS versions',
    'last 4 Safari versions',
    'Explorer >= 9',
    'last 5 Opera versions',
    'Android >= 4',
    // 'last 4 ChromeAndroid',
    // 'last 4 FirefoxAndroid',
    // 'ExplorerMobile >= 10',
    {
        cascade: false
    }))
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('_site/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(notify({
        onLast: true,
        title: 'Compass',
        message: 'Sass has finished compiling.'
    }));
 });

/**
 * Losslessly compress images
 */
 gulp.task('javascript', [[['requirejs'], ['js']]], function()
 {
    // .pipe(notify({
 //         onLast: true,
 //         title: 'Images',
 //         message: 'Images have finished minifying.'
 //     }));
 console.log('JS Minifying Done');
 });


/**
 * Compress js files and concatenate them.
 */
 gulp.task('requirejs', function (cb)
 {
    rjs.optimize({
        baseUrl: './js/src',
        mainConfigFile: './js/src/main.js',
        dir: './js/build',
        removeCombined: true,
        findNestedDependencies: true,
        optimize: 'uglify2',
        skipDirOptimize: true,
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
        ]
    },
    function(buildResponse)
    {
        console.log('build response', buildResponse);
        cb();
    }, cb);
});


/**
 * Compress js files and concatenate them.
 */
 gulp.task('js', function()
 {
    gulp.src('./js/build/require-lightbox.js')
    .pipe(rename('lightbox.js'))
    .pipe(gulp.dest('./js'));
    gulp.src('./js/build/require-form.js')
    .pipe(rename('forms.js'))
    .pipe(gulp.dest('./js'));
    gulp.src(['./js/build/main.js', './js/src/require.min.js'])
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(notify({
         onLast: true,
         title: 'JavaScript',
         message: 'JS has finished compiling.'
    }));
    // return gulp.src('./js/main.js')
    // .pipe(requirejsOptimize(function(file) {
    //  return {
       //      mainConfigFile: './js/main.js',
       //      optimize: 'none',
       //      removeCombined: true,
       //      modules:[
       //      {
       //          name: 'main',
       //      },
       //      {
       //          name: 'parsley',
       //          exclude:
       //          [
       //              'main',
       //          ]
       //      }
       //      ],
    //     };
    // }))
    // .pipe(rename('scripts.js'))
    // .pipe(gulp.dest('./js'));
    // return gulp.src('./js/lightbox.js')
    // .pipe(requirejsOptimize(function(file) {
    //  return {
       //      mainConfigFile: './js/lightbox.js',
       //      optimize: 'none',
       //      removeCombined: true,
       //      modules:[
       //      {
       //          name: 'lightbox',
       //          exclude:
       //          [
       //              'jquery',
       //          ]
       //      }
       //      ],
    //     };
    // }))
    // .pipe(rename('lightboxes.js'))
    // .pipe(gulp.dest('./js'));
  //   gulp.src([
    // './js/scripts.js',
    // './js/picturefill.min.js',
    // ])
    // .pipe(concat('scripts.js'))
    // .pipe(gulp.dest('./js'))
 });
 // gulp.task('js', function()
 // {
 //     gulp.src(['./js/*.js', '!./js/*.min.js'])
 //     .pipe(rename({
 //         suffix: '.min'
 //     }))
 //     .pipe(uglify({
 //         mangle: false
 //     }))
 //     .pipe(gulp.dest('./js/'));
 //     gulp.src([
 //     './js/modernizr.min.js',
 //     './js/picturefill.min.js',
 //     './js/jquery.magnific-popup.min.js',
 //     './js/webapplinks.min.js',
 //     './js/xpull.min.js',
 //     './js/init.min.js',
 //     ])
 //     .pipe(concat('scripts.min.js'))
 //     .pipe(uglify({
 //         mangle: true
 //     }))
 //     .pipe(gulp.dest('./js/'))
 //     .pipe(gulp.dest('./_site/js/'))
 //     .pipe(browserSync.reload({stream:true}))
 //     .pipe(notify({
 //         onLast: true,
 //         title: 'JavaScript',
 //         message: 'JS has finished compiling.'
 //     }));
 // });


 function transformSvg (svg, cb)
 {
    svg.find('//*[@fill').forEach(function (child) {
        child.attr('fill').remove();
    });
    cb(null);
 }


// Generate SVG sprite.
gulp.task('svg-sprite', function ()
{
    gulp.src(['./_source/assets/svg-sprite-icons/base/*.svg', './_source/assets/svg-sprite-icons/about/*.svg'])
    .pipe(svgmin())
    .pipe(svgstore(
    {
        fileName: 'svg-sprite--about.svg',
        prefix: '',
        transformSvg: function (svg, cb) {
            svg.attr({ style: 'display:none' });
            svg.find('//*[@fill="none"]').forEach(function (child) {
                child.attr('fill').remove();
            });
            cb(null);
        }
    }))
    .pipe(gulp.dest('./_includes/'));
    gulp.src(['./_source/assets/svg-sprite-icons/base/*.svg', './_source/assets/svg-sprite-icons/work/*.svg'])
    .pipe(svgmin())
    .pipe(svgstore(
    {
        fileName: 'svg-sprite--work.svg',
        prefix: '',
        transformSvg: function (svg, cb) {
            svg.attr({ style: 'display:none' });
            svg.find('//*[@fill="none"]').forEach(function (child) {
                child.attr('fill').remove();
            });
            cb(null);
        }
    }))
    .pipe(gulp.dest('./_includes/'));
    gulp.src(['./_source/assets/svg-sprite-icons/base/*.svg', './_source/assets/svg-sprite-icons/contact/*.svg'])
    .pipe(svgmin())
    .pipe(svgstore(
    {
        fileName: 'svg-sprite--contact.svg',
        prefix: '',
        transformSvg: function (svg, cb) {
            svg.attr({ style: 'display:none' });
            svg.find('//*[@fill="none"]').forEach(function (child) {
                child.attr('fill').remove();
            });
            cb(null);
        }
    }))
    .pipe(gulp.dest('./_includes/'));
});


/**
 * Minify HTML
 */
 gulp.task('htmlmin', function()
 {
    gulp.src('_site/**/*.html')
    .pipe(htmlmin({
        collapseWhitespace: true,
        conservativeCollapse: false,
        removeComments: true,
        preserveLineBreaks: true,
        caseSensitive: true,
        keepClosingSlash: true,
    }))
    .pipe(gulp.dest('_site'));
 });


/**
 * Generate HTML5 Cache Manifest
 */
// gulp.task('manifest', function(){
//     gulp.src([
//     // '_site/index.html',
//     // '_site/**/work/*.html',
//     // '_site/**/contact/*.html',
//     // '_site/**/css/*.css',
//     // '_site/**/js/*.js',
//     '_site/**/css/font/*.woff',
//     '_site/**/css/font/*.woff2',
//     // '_site/**/css/img/bg/*.*',
//     // '_site/**/*',
//     // '_site/contact/**/index.html'
//     ])
//     .pipe(manifest({
//         hash: true,
//         preferOnline: true,
//         network: ['http://*', 'https://*', '*'],
//         filename: 'app.manifest',
//         exclude: 'app.manifest'
//     }))
//     .pipe(gulp.dest('./'));
// });


/**
 * Losslessly compress images
 */
 gulp.task('imagemin', [[['imagemin-1'], ['imagemin-2'], ['imagemin-3'], ['imagemin-4']]], function()
 {
    // .pipe(notify({
 //         onLast: true,
 //         title: 'Images',
 //         message: 'Images have finished minifying.'
 //     }));
 console.log('Image Minifying Done');
 });

 gulp.task('imagemin-1', function(end)
 {
    gulp.src([
    '_site/css/img/**/*.{png,jpg,gif}',
    ])
    .pipe(imagemin({
        optimizationLevel: 7,
        progressive: false,
        interlaced: false,
    }))
    .pipe(gulp.dest('_site/css/img/'))
    .on('end', end);
 });

 gulp.task('imagemin-2', function(end)
 {
    gulp.src([
    '_site/css/img/**/*.png',
    ])
    .pipe(advpng({ optimizationLevel: 4 })())
    .pipe(pngcrush({ reduce: false })())
    .pipe(gulp.dest('_site/css/img/'))
    .on('end', end);
 });

 gulp.task('imagemin-3', function(end)
 {
    gulp.src([
    '_site/images/**/*.{png,jpg,gif}',
    ])
    .pipe(imagemin({
        optimizationLevel: 7,
        progressive: false,
        interlaced: false,
    }))
    .pipe(gulp.dest('_site/images/'))
    .on('end', end);
 });

 gulp.task('imagemin-4', function(end)
 {
    gulp.src([
    '_site/images/**/*.png',
    ])
    .pipe(advpng({ optimizationLevel: 4 })())
    .pipe(pngcrush({ reduce: false })())
    .pipe(gulp.dest('_site/images/'))
    .on('end', end);
 });


/**
 * Generate responsive image sizes
 */
 gulp.task('responsive-images', function()
 {
     gulp.src(['_source/assets/portfolio-pieces/_site/**/*'])
     .pipe(responsive(
     {
        '**/*':
        [
        {
            width: 160,
            height: 160,
            rename:
            {
                suffix: '--mini'
            },
            max: true
        },
        {
            width: 240,
            height: 240,
            rename:
            {
              suffix: '--tiny'
            },
            max: true
        },
        ]
     },
     {
        strictMatchImages: false,
        strictMatchConfig: true,
     }
     ))
         // '*.jpg':
         // [{
         //  width: 160,
         //  rename:
         //  {
         //      suffix: '--mini'
         //  }
         // },
         // {
         //  width: 240,
         //  rename:
         //  {
         //      suffix: '--tiny'
         //  }
         // },
         // {
         //  width: 320,
         //  rename:
         //  {
         //      suffix: '--small'
         //  }
         // },
         // {
         //  width: 480,
         //  rename:
         //  {
         //      suffix: '--medium'
         //  }
         // },
         // {
         //  width: 640,
         //  rename:
         //  {
         //      suffix: '--large'
         //  }
         // },
         // {
         //  width: 1280,
         //  rename:
         //  {
         //      suffix: '--huge'
         //  }
         // }]
     // }]))
 .pipe(gulp.dest('images/test'));
});

/**
 * Generate responsive image sizes
 */
 gulp.task('image-sizes', function()
 {
    var img_src = '_source/assets/portfolio-pieces/_site/**/*.{png,jpg,gif}';
    var img_dest = 'images';

    gulp.src([img_src])
    .pipe(image_resize({
        width : 160,
        filter: 'lanczos',
        quality: 0.8,
    }))
    .pipe(rename({
        suffix: '--mini'
    }))
    .pipe(gulp.dest(img_dest));

    gulp.src([img_src])
    .pipe(image_resize({
        width : 240,
        filter: 'lanczos',
        quality: 0.8,
    }))
    .pipe(rename({
        suffix: '--tiny'
    }))
    .pipe(gulp.dest(img_dest));

    gulp.src([img_src])
    .pipe(image_resize({
        width : 320,
        filter: 'lanczos',
        quality: 0.8,
    }))
    .pipe(rename({
        suffix: '--small'
    }))
    .pipe(gulp.dest(img_dest));

    gulp.src([img_src])
    .pipe(image_resize({
        width : 480,
        filter: 'lanczos',
        quality: 0.8,
    }))
    .pipe(rename({
        suffix: '--medium'
    }))
    .pipe(gulp.dest(img_dest));

    gulp.src([img_src])
    .pipe(image_resize({
        width : 640,
        filter: 'lanczos',
        quality: 0.8,
    }))
    .pipe(rename({
        suffix: '--large'
    }))
    .pipe(gulp.dest(img_dest));

    gulp.src([img_src])
    .pipe(image_resize({
        width : 1280,
        filter: 'lanczos',
        quality: 0.8,
    }))
    .pipe(rename({
        suffix: '--huge'
    }))
    .pipe(gulp.dest(img_dest));
 });


/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
 gulp.task('watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./js/src/*.js', ['requirejs']);
    gulp.watch('./js/build/*.js', ['js']);
    gulp.watch(['index.html', '_data/*.*', 'work/*.*', 'contact/*.*', '_layouts/*.*', '_includes/*.*', '_project/*', './css/**/*.css', './js/*.js', '!./js/build/*.js'], ['jekyll-rebuild']);
    gulp.watch(['_site/index.html', '_site/work/*.html', '_site/contact/*.html'], ['htmlmin']);
 });



/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
 gulp.task('default', ['browser-sync', 'watch']);
