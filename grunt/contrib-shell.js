// Config file for shell grunt task

module.exports = function(grunt) {

	grunt.config('shell', {
		all: {
			// command: 'drush cache-clear theme-registry'
		},
		jekyll_build: {
			command: 'jekyll build'
		},
		jekyll_serve: {
			command: 'jekyll serve'
		}
	});

	grunt.loadNpmTasks('grunt-shell');
};