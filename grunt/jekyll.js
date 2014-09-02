// Config file for jekyll grunt task

module.exports = function(grunt)
{
	grunt.config('jekyll',
	{
		jekyll:
		{
			options:
			{
				bundleExec: true,
				src : '.'
			},
			build:
			{
				options:
				{
					dest: '<%= dist %>',
					config: '_config.yml,_config.build.yml'
				}
			},
			serve:
			{
				options:
				{
					dest: '<%= dist %>',
					// config: '_config.yml',
					// bundleExec: true,
					drafts: true,
					serve: true,
					watch: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-jekyll');
};