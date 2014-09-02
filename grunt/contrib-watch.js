// Config file for js uglify grunt task

module.exports = function(grunt)
{
	grunt.config('watch',
	{
		sass:
		{
			files: 'sass/{,**/}*.scss',
			tasks: ['compass:dev'],
			options:
			{
				// interrupt: true,
				livereload: true
			},
		},
		images:
		{
			files: 'css/img/generated/**',
			tasks: ['imagemin'],
		},
		css:
		{
			files: ['css/**/*.css'],
			tasks: ['shell:jekyll_build', 'notify:sass'],
			options:
			{
				// interrupt: true,
				livereload: true
			},
		},
		js:
		{
			files: ['js/{,**/}*.js', '!js/{,**/}*.min.js'],
			tasks: ['jshint', 'uglify:dev'],
		},
		jekyll:
		{
			files: [
			'_includes/*.html',
			'_layouts/*.html',
			'_includes/*.html',
			'_posts/*.markdown',
			'_config.yml',
			'index.html'
			],
			tasks: ['shell:jekyll_build', 'shell:jekyll_serve', 'notify:jekyll'],
			options:
			{
				interrupt: true,
				atBegin: true,
				livereload: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
};