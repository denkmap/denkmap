/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            'denkmap': ['app/**/*.js', 'Grunfile.js', 'package.json', 'packager.json', 'app.js*'],
            options: {
                jquery: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: false,
                onevar: true,
                boss: true,
                eqnull: true,
                browser: true,
                devel: true,
                trailing: true,
                white:  false,
                maxcomplexity: 4,
                globals: {
                    Ext: true,
                }
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
    grunt.registerTask('travis', 'jshint:denkmap qunit:kort');
};
