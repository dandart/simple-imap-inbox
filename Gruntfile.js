'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        watch: {
            test: {
                files: ['lib/**/*.js', 'test/**/*.js'],
                tasks: ['shell:test']
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                'src/**/*.js'
            ]
        },
        shell: {
            test: {
                command: 'mocha --reporter spec --colors test/*.js',
                options: {
                    stdout: true,
                    stderr: true
                }
            }
        }
    });

    grunt.registerTask('test', function(target) {
        var tasks = ['jshint', 'shell:test'];

        if (target === 'live') {
            tasks.push('watch:test');
        }

        grunt.task.run(tasks);
    });

    grunt.registerTask('default', ['test']);
};
