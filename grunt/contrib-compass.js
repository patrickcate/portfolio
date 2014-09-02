// Config file for compass grunt task

module.exports = function(grunt)
{
	grunt.config('compass',
	{
		options:
		{
			config: 'config.rb'
		},
		dev:
		{
			options:
			{
				environment: 'development',
				force: true
			}
		},
		build:
		{
			options:
			{
				environment: 'production',
				force: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compass');
};