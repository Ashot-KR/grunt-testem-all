/*
 * grunt-testem-all
 * https://github.com/Ashot/grunt-testem-all
 *
 * Copyright (c) 2015 Poluektov Dmitriy
 * Licensed under the MIT license.
 */

'use strict';

var Testem = require('testem');
var Config = require('testem/lib/config');

module.exports = function (grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	var testem = new Testem();

	grunt.registerMultiTask('testem', 'The best Grunt plugin ever.', function () {
		// Merge task-specific and/or target-specific options with these defaults.

		var options = this.options();
		var mode;
		var config;

		if (this.files.length) {
			grunt.log.subhead('All you need is `options` field to configure your task. Pass all files you need through testem options'['yellow']);
		}

		if (!grunt.option('ci') && !grunt.option('launchers') && !grunt.option('server') && grunt.util.kindOf(grunt.option('dev')) === 'undefined') {
			grunt.option('dev', true);
		}

		if (grunt.option('ci')) {
			mode = 'ci';
		} else if (grunt.option('launchers')) {
			mode = 'launchers';
		} else if (grunt.option('server')) {
			mode = 'server';
		} else if (grunt.option('dev')) {
			mode = 'dev';
		}

		this.async();

		config = new Config(mode, options);

		switch (mode) {
			case 'ci':
				testem.startCI(options);
				break;
			case 'launchers':
				config.printLauncherInfo();
				break;
			case 'server':
				testem.startServer();
				break;
			default:
				testem.startDev(options);
		}


	});

};
