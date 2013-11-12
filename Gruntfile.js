/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            'denkmap': ['app/**/*.js', 'Grunfile.js', 'package.json', 'packager.json', 'bower.json', '.jshintrc', 'app.js*'],
            options: {
                jshintrc: '.jshintrc'
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task.
    grunt.registerTask('default', 'jshint:denkmap');

    // Linting task.
    grunt.registerTask('lint', 'jshint:denkmap');

    // Travis CI task.
    grunt.registerTask('travis', 'jshint:denkmap qunit:denkmap');
};
