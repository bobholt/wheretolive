module.exports = function(grunt) {

  grunt.config('requirejs', {
    prod: {
      options: {
        baseUrl: '.',
        mainConfigFile: 'src/requirejs/config.js',
        include: ['src/requirejs/config'],
        insertRequire: ['src/requirejs/config'],
        name: 'bower_components/almond/almond',
        out: 'prod/app.js',
        optimize: 'uglify2',
        generateSourceMaps: true,
        preserveLicenseComments: false,
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');

};
