// Config file for js uglify grunt task

module.exports = function(grunt)
{
	grunt.config('uglify',
	{
		dev:
		{
			options:
			{
				mangle: false,
				compress: false,
				beautify: true
			},
			files: [
			{
				expand: true,
				cwd: 'js',
				src: ['**/*.js', '!**/*.min.js'],
				dest: 'js',
				ext: '.min.js'
			}]
		},
		build:
		{
			options:
			{
				mangle: false,
				compress: false
			},
			files: [
			{
				expand: true,
				cwd: 'js',
				src: ['**/*.js', '!**/*.min.js'],
				dest: 'js',
				ext: '.min.js'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
};