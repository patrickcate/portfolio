var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var compass     = require('gulp-compass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');

var uglify 		= require('gulp-uglify');
var notify 		= require("gulp-notify");
var rename 		= require('gulp-rename');
var concat 		= require('gulp-concat');
var svgmin 		= require('gulp-svgmin');
var svgstore 	= require('gulp-svgstore');
var htmlmin 	= require('gulp-htmlmin');
var imagemin 	= require('gulp-imagemin');
var advpng 		= require('imagemin-advpng');
var pngcrush 	= require('imagemin-pngcrush');
var mozjpeg 	= require('imagemin-mozjpeg');
var responsive  = require('gulp-responsive');
var image_resize = require('gulp-image-resize');

// Show messages
var messages 	= {jekyllBuild: '<div style="color: grey;left:0;right:auto;position:fixes;width:100%;">Running:</div> $ jekyll build'};

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
 * Compress js files and concatenate them.
 */
 gulp.task('js', function()
 {
 	gulp.src(['./js/*.js', '!./js/*.min.js'])
 	.pipe(rename({
 		suffix: '.min'
 	}))
 	.pipe(uglify({
 		mangle: false
 	}))
 	.pipe(gulp.dest('./js/'));
 	gulp.src([
 	'./js/modernizr.min.js',
 	'./js/picturefill.min.js',
 	'./js/webapplinks.min.js',
 	'./js/xpull.min.js',
 	'./js/magnific-popup.min.js',
 	'./js/init.min.js',
 	])
 	.pipe(concat('scripts.min.js'))
 	.pipe(uglify({
 		mangle: true
 	}))
 	.pipe(gulp.dest('./js/'))
 	.pipe(gulp.dest('./_site/js/'))
 	.pipe(browserSync.reload({stream:true}))
 	.pipe(notify({
 		onLast: true,
 		title: 'JavaScript',
 		message: 'JS has finished compiling.'
 	}));
 });


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
 	.pipe(gulp.dest('_site'))
 });


/**
 * Losslessly compress images
 */
 gulp.task('imagemin', function()
 {
 	gulp.src([
 	'_site/css/img/**/*.{png,jpg,gif}',
 	])
 	.pipe(imagemin({
 		optimizationLevel: 7,
 		progressive: false,
 		interlaced: false,
 	}))
 	.pipe(gulp.dest('_site/css/img/'));

 	gulp.src([
 	'_site/css/img/**/*.png',
 	])
 	.pipe(advpng({ optimizationLevel: 4 })())
 	.pipe(pngcrush({ reduce: false })())
 	.pipe(gulp.dest('_site/css/img/'));

 	gulp.src([
 	'_site/images/**/*.{png,jpg,gif}',
 	])
 	.pipe(imagemin({
 		optimizationLevel: 7,
 		progressive: false,
 		interlaced: false,
 	}))
 	.pipe(gulp.dest('_site/images/'));

 	gulp.src([
 	'_site/images/**/*.png',
 	])
 	.pipe(advpng({ optimizationLevel: 4 })())
 	.pipe(pngcrush({ reduce: false })())
 	.pipe(gulp.dest('_site/images/'));

 	gulp.src([
 	'_site/images/**/*.jpg',
 	])
 	.pipe(mozjpeg({ fastcrush: false })())
 	.pipe(gulp.dest('_site/images/'));
 });


/**
 * Generate responsive image sizes
 */
//  gulp.task('image-sizes', function()
//  {
//  	gulp.src(['_source/assets/portfolio-pieces/_site/**/*.jpg'])
//  	.pipe(responsive(
//  	{
//  		'*.jpg':
//  		[{
//  			width: 160,
//  			rename:
//  			{
//  				suffix: '--mini'
//  			}
//  		}]
//  	},
//  	{
//  		strictMatchImages: false,
//  		strictMatchConfig: true
//  	}
//  	))
//  		// '*.jpg':
//  		// [{
//  		// 	width: 160,
//  		// 	rename:
//  		// 	{
//  		// 		suffix: '--mini'
//  		// 	}
//  		// },
//  		// {
//  		// 	width: 240,
//  		// 	rename:
//  		// 	{
//  		// 		suffix: '--tiny'
//  		// 	}
//  		// },
//  		// {
//  		// 	width: 320,
//  		// 	rename:
//  		// 	{
//  		// 		suffix: '--small'
//  		// 	}
//  		// },
//  		// {
//  		// 	width: 480,
//  		// 	rename:
//  		// 	{
//  		// 		suffix: '--medium'
//  		// 	}
//  		// },
//  		// {
//  		// 	width: 640,
//  		// 	rename:
//  		// 	{
//  		// 		suffix: '--large'
//  		// 	}
//  		// },
//  		// {
//  		// 	width: 1280,
//  		// 	rename:
//  		// 	{
//  		// 		suffix: '--huge'
//  		// 	}
//  		// }]
//  	// }]))
//  .pipe(gulp.dest('images/test'));
// });

/**
 * Generate responsive image sizes
 */
 gulp.task('image-sizes', function()
 {
 	var img_src = '_source/assets/portfolio-pieces/_site/**/*.{png,jpg,gif}';
 	var img_dest = 'images/test';

 	gulp.src([img_src])
 	.pipe(image_resize({
 		width : 160,
 		filter: 'lanczos',
 		quality: 1,
 	}))
 	.pipe(rename({
 		suffix: '--mini'
 	}))
 	.pipe(gulp.dest(img_dest));

	gulp.src([img_src])
 	.pipe(image_resize({
 		width : 240,
 		filter: 'lanczos',
 		quality: 1,
 	}))
 	.pipe(rename({
 		suffix: '--tiny'
 	}))
 	.pipe(gulp.dest(img_dest));

	gulp.src([img_src])
 	.pipe(image_resize({
 		width : 320,
 		filter: 'lanczos',
 		quality: 1,
 	}))
 	.pipe(rename({
 		suffix: '--small'
 	}))
 	.pipe(gulp.dest(img_dest));

	gulp.src([img_src])
 	.pipe(image_resize({
 		width : 480,
 		filter: 'lanczos',
 		quality: 1,
 	}))
 	.pipe(rename({
 		suffix: '--medium'
 	}))
 	.pipe(gulp.dest(img_dest));

	gulp.src([img_src])
 	.pipe(image_resize({
 		width : 640,
 		filter: 'lanczos',
 		quality: 1,
 	}))
 	.pipe(rename({
 		suffix: '--large'
 	}))
 	.pipe(gulp.dest(img_dest));

	gulp.src([img_src])
 	.pipe(image_resize({
 		width : 1280,
 		filter: 'lanczos',
 		quality: 1,
 	}))
 	.pipe(rename({
 		suffix: '--large@2x'
 	}))
 	.pipe(gulp.dest(img_dest));
 });


/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
 gulp.task('watch', function () {
 	gulp.watch('./sass/**/*.scss', ['sass']);
 	gulp.watch(['./js/*.js', '!./js/*.min.js', '!./js/scripts.js'], ['js']);
 	gulp.watch(['index.html', 'work/*.html', 'contact/*.html', '_layouts/*.html', '_includes/*', '_project/*'], ['jekyll-rebuild']);
 	gulp.watch(['_site/index.html', '_site/work/*.html', '_site/contact/*.html'], ['htmlmin']);
 });



/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
 gulp.task('default', ['browser-sync', 'watch']);
