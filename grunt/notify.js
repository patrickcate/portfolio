// Config file for notify grunt task

module.exports = function(grunt)
{
	grunt.config('notify',
	{
		sass:
		{
			options:
			{
				title: 'SASS Task Complete',
				message: 'SASS finished compiling',
			}
		},
		jekyll:
		{
			options:
			{
				title: 'Jekyll Task Complete',
				message: 'Jekyll finished compiling',
			}
		},
	});

	grunt.loadNpmTasks('grunt-notify');
};