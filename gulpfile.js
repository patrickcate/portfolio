const gulp = require('gulp');
const browserSync = require('browser-sync');
const ruby_sass = require('gulp-ruby-sass');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const cp = require('child_process');
const uglify = require('gulp-uglify');
const notify = require("gulp-notify");
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const advpng = require('imagemin-advpng');
const pngcrush = require('imagemin-pngcrush');
const mozjpeg = require('imagemin-mozjpeg');
const image_resize = require('gulp-image-resize');
const rjs = require('requirejs');
const cache = require('gulp-cache');
const changed = require('gulp-changed');
const remember = require('gulp-remember');
const cheerio = require('gulp-cheerio');

require('gulp-run-seq');

// Show messages
const messages = {
  jekyllBuild: '<div style="color: grey;left:0;right:auto;position:fixes;width:100%;">Running:</div> $ jekyll build'
};

// Handle any compass compiling errors
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}


/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {
    stdio: 'inherit'
  }).on('error', handleError).on('close', done);
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
gulp.task('browser-sync', ['sass', 'jekyll-build'], function () {
  browserSync({
    server: {
      baseDir: '_site',
    }
  });
});


/**
 * Compile files from /sass into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
  return sass('sass/**/*.scss', {
      sourcemap: false,
      style: 'compressed',
      precision: 10,
      stopOnError: true,
    })
    .pipe(prefix({
      browsers: [
        'last 6 Chrome versions',
        'last 6 Firefox versions',
        'last 4 iOS versions',
        'last 4 Safari versions',
        'Explorer >= 9',
        'last 5 Opera versions',
        'Android >= 4',
      ],
      cascade: false
    }))
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('_site/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(notify({
      onLast: true,
      title: 'SASS',
      message: 'Sass has finished compiling.'
    }));
});


/**
 * Compress js files and concatenate them.
 */
gulp.task('requirejs', function (cb) {
  rjs.optimize({
      baseUrl: './js/src',
      mainConfigFile: './js/src/main.js',
      dir: './js/build',
      removeCombined: true,
      findNestedDependencies: true,
      optimize: 'uglify2',
      skipDirOptimize: false,
      modules: [{
          name: 'main'
        },
        {
          name: 'require-lightbox',
          exclude: ['main'],
        },
        {
          name: 'require-form',
          exclude: ['main'],
        }
      ]
    },
    function (buildResponse) {
      console.log('build response', buildResponse);
      cb();
    }, cb);
});


/**
 * Compress js files and concatenate them.
 */
gulp.task('js', function () {
  gulp.src('./js/build/require-lightbox.js')
    .pipe(rename('lightbox.js'))
    .pipe(gulp.dest('./js'));
  gulp.src('./js/build/require-form.js')
    .pipe(rename('forms.js'))
    .pipe(gulp.dest('./js'));
  gulp.src(['./js/build/main.js', './js/src/require.min.js'])
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(notify({
      onLast: true,
      title: 'JavaScript',
      message: 'JS has finished compiling.'
    }));
});


// Generate SVG sprite.
gulp.task('svg-sprite', function () {
  gulp.src(['./_source/assets/svg-sprite-icons/base/*.svg', './_source/assets/svg-sprite-icons/about/*.svg'])
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: false
    }))
    .pipe(cheerio({
      run: function ($) {
        $('svg').attr('style', 'display:none');
        $('[fill="none"]').removeAttr('fill');
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(rename('svg-sprite--about.svg'))
    .pipe(gulp.dest('./_includes/'));
  gulp.src(['./_source/assets/svg-sprite-icons/base/*.svg', './_source/assets/svg-sprite-icons/work/*.svg'])
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: false
    }))
    .pipe(cheerio({
      run: function ($) {
        $('svg').attr('style', 'display:none');
        $('[fill="none"]').removeAttr('fill');
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(rename('svg-sprite--work.svg'))
    .pipe(gulp.dest('./_includes/'));
  gulp.src(['./_source/assets/svg-sprite-icons/base/*.svg', './_source/assets/svg-sprite-icons/contact/*.svg'])
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: false
    }))
    .pipe(cheerio({
      run: function ($) {
        $('[fill="none"]').removeAttr('fill');
        $('svg').attr('style', 'display:none');
      },
      parserOptions: {
        xmlMode: true
      }
    }))

    .pipe(rename('svg-sprite--contact.svg'))
    .pipe(gulp.dest('./_includes/'));
});


/**
 * Minify HTML
 */
gulp.task('htmlmin', function () {
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
 * Losslessly compress images
 */
gulp.task('imagemin', [
  [
    ['imagemin-1'],
    ['imagemin-2'],
    ['imagemin-3'],
    ['imagemin-4']
  ]
], function () {
  console.log('Image Minifying Done');
});

gulp.task('imagemin-1', function (end) {
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

gulp.task('imagemin-2', function (end) {
  gulp.src([
      '_site/css/img/**/*.png',
    ])
    .pipe(advpng({
      optimizationLevel: 4
    })())
    .pipe(pngcrush({
      reduce: false
    })())
    .pipe(gulp.dest('_site/css/img/'))
    .on('end', end);
});

gulp.task('imagemin-3', function (end) {
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

gulp.task('imagemin-4', function (end) {
  gulp.src([
      '_site/images/**/*.png',
    ])
    .pipe(advpng({
      optimizationLevel: 4
    })())
    .pipe(pngcrush({
      reduce: false
    })())
    .pipe(gulp.dest('_site/images/'))
    .on('end', end);
});


/**
 * Generate responsive image sizes
 */
gulp.task('image-sizes', function () {
  var img_src = '_source/assets/portfolio-pieces/site-masters/**/*.{png,jpg,gif}';
  var img_dest = 'images';

  gulp.src([img_src])
    .pipe(image_resize({
      width: 160,
      filter: 'lanczos',
      quality: 0.8,
    }))
    .pipe(rename({
      suffix: '--mini'
    }))
    .pipe(gulp.dest(img_dest));

  gulp.src([img_src])
    .pipe(image_resize({
      width: 240,
      filter: 'lanczos',
      quality: 0.8,
    }))
    .pipe(rename({
      suffix: '--tiny'
    }))
    .pipe(gulp.dest(img_dest));

  gulp.src([img_src])
    .pipe(image_resize({
      width: 320,
      filter: 'lanczos',
      quality: 0.8,
    }))
    .pipe(rename({
      suffix: '--small'
    }))
    .pipe(gulp.dest(img_dest));

  gulp.src([img_src])
    .pipe(image_resize({
      width: 480,
      filter: 'lanczos',
      quality: 0.8,
    }))
    .pipe(rename({
      suffix: '--medium'
    }))
    .pipe(gulp.dest(img_dest));

  gulp.src([img_src])
    .pipe(image_resize({
      width: 640,
      filter: 'lanczos',
      quality: 0.8,
    }))
    .pipe(rename({
      suffix: '--large'
    }))
    .pipe(gulp.dest(img_dest));

  gulp.src([img_src])
    .pipe(image_resize({
      width: 1280,
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
  gulp.watch(['_data/*.*', '_pages/*.*', '_layouts/*.*', '_includes/*.*', '_project/*', './css/**/*.css', './js/*.js', '!./js/build/*.js'], ['jekyll-rebuild']);
  gulp.watch(['_site/index.html', '_site/work/*.html', '_site/contact/*.html'], ['htmlmin']);
});


/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
