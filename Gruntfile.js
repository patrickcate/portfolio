'use strict';

module.exports = function(grunt)
{
	// Initialize config.
	grunt.initConfig(
	{
		pkg: require('./package.json'),
	});

	// Load per-task config from separate files.
	grunt.loadTasks('grunt');

	// // Register alias tasks.
	grunt.registerTask('dev',
		'Start a live-reloading dev webserver on localhost.',
    ['compass:dev', 'jshint', 'uglify:build', 'watch']);

	grunt.registerTask('build',
		'Build site files for testing or deployment.',
    ['compass:build', 'uglify:build', 'shell:jekyll_build']);

	// Default task(s).
	grunt.registerTask('default', 'uglify:build');

};