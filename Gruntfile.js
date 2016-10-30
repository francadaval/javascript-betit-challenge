/**
 * Created by fran on 27/07/16.
 */

module.exports = function(grunt) {
	var css_source_files = [{
		expand: true,
		src: ['styles/*.css'],
		dest: 'static/styles/',
		flatten: true
	}];

	var angular_release_files = [{
		src: 'bower_components/angular/angular.min.js',
		dest: 'static/scripts/ext/angular.js',
	},{
		src: 'bower_components/angular-material/angular-material.min.js',
		dest: 'static/scripts/ext/angular-material.js',
	},{
		src: 'bower_components/angular-material/angular-material.min.css',
		dest: 'static/styles/ext/angular-material.css',
	},{
		src: 'bower_components/angular-animate/angular-animate.min.js',
		dest: 'static/scripts/ext/angular-animate.js',
	},{
		src: 'bower_components/angular-aria/angular-aria.min.js',
		dest: 'static/scripts/ext/angular-aria.js',
	},{
		src: 'bower_components/angular-messages/angular-messages.min.js',
		dest: 'static/scripts/ext/angular-messages.js',
	}];

	var angular_debug_files = [{
		src: 'bower_components/angular/angular.js',
		dest: 'static/scripts/ext/angular.js',
	},{
		src: 'bower_components/angular-material/angular-material.js',
		dest: 'static/scripts/ext/angular-material.js',
	},{
		src: 'bower_components/angular-material/angular-material.css',
		dest: 'static/styles/ext/angular-material.css',
	},{
		src: 'bower_components/angular-animate/angular-animate.js',
		dest: 'static/scripts/ext/angular-animate.js',
	},{
		src: 'bower_components/angular-aria/angular-aria.js',
		dest: 'static/scripts/ext/angular-aria.js',
	},{
		src: 'bower_components/angular-messages/angular-messages.js',
		dest: 'static/scripts/ext/angular-messages.js',
	}];

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		clean: {
			init: ['static/styles', 'static/scripts'],
			uglify_tmp: ['scripts/tmp']
		},

		sass: {
			all: {
				files: [{
					expand: true,
					src: ['styles/*.scss'],
					dest: 'static/styles/',
					ext: '.css',
					flatten: true
				}]
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			release: {
				mangle: true,
				compress: true,
				files: [{
					expand: true,
					cwd: 'scripts/',
					dest: 'scripts/tmp',
					src: ['**/*.js','*.js'],
					ext: '.min.js'
				}]
			}
		},

//		listfiles: {
//			debug: {
//				src: ['scripts/main.js','scripts/*.js','scripts/**/*.js'],
//				dest: 'static/scripts/betit-chalenge.js',
//			}
//		},

		concat: {
			release: {
				src: ['scripts/tmp/main.min.js','scripts/tmp/*.min.js','scripts/tmp/**/*.min.js'],
				dest: 'static/scripts/betit-chalenge.js',
			},
			debug: {
				src: ['scripts/main.js','scripts/*.js','scripts/**/*.js'],
				dest: 'static/scripts/betit-chalenge.js',
			}
		},

		copy: {
			css_all: {
				files: css_source_files
			},
			angular_release: {
				files: angular_release_files
			},
			angular_debug: {
				files: angular_debug_files
			},
			debug: {
				src: ['scripts/main.js','scripts/*.js','scripts/**/*.js'],
				dest: 'static/'
			}
		},
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');

//	grunt.registerMultiTask('listfiles', 'Concatenate files.', function() {
//		// Iterate over all src-dest file pairs.
//		this.files.forEach(function(f) {
//
//			var src = f.src.filter(function(filepath) {
//				if (!grunt.file.exists(filepath)) {
//					grunt.log.warn('Source file "' + filepath + '" not found.');
//					return false;
//				}
//				
//				return true;
//			});
//
//			src = src.map(function(filepath){
//				return "import '/" + filepath + "';\n";
//			});
//
//			output = src.join('');
//
//			grunt.file.write(f.dest, output);
//			grunt.log.ok('Created file: ' + f.dest);
//		});
//	});

	grunt.registerTask( 'scripts_release', [
		'uglify',
		'concat:release',
		'clean:uglify_tmp',
		'copy:angular_release'
	] );

	grunt.registerTask( 'scripts_debug', [
//		'listfiles:debug',
//		'copy:debug',
		'concat:debug',
		'copy:angular_debug'
	]);

	grunt.registerTask( 'sass_all', ['sass', 'copy:css_all'] );

	// Tasks.
	grunt.registerTask('release', [
		'clean:init',
		'scripts_release',
		'sass_all'
	]);

	grunt.registerTask('debug', [
		'clean:init',
		'scripts_debug',
		'sass_all'
	]);
};