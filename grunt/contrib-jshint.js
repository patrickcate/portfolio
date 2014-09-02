// Config file for jshint grunt task

module.exports = function(grunt)
{
	grunt.config('jshint',
	{
		config:
		{
			options:
			{
				jshintrc: '.jshintrc'
			},
			all: ['js/{,**/}*.js', '!js/{,**/}*.min.js'],
		},
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
};