// Config file for js uglify grunt task

module.exports = function(grunt)
{
	grunt.config('imagemin',
	{
		dynamic:
		{
			files: [
			{
				expand: true, // Enable dynamic expansion
				cwd: '_site/css/img/', // SRC matches are relative to this path
				src: ['**/*.{png,jpg,gif}'], // Actual patterns to match
				dest: '_site/css/img/' // Destination path prefix
			}],
			options:
			{
				pngquant: false, // Make sure optimization is lossless
				optimizationLevel: 7,
				progressive: false,
				interlaced: false
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-imagemin');
};