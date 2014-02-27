module.exports = function(grunt) {

  grunt.config('jshint', {
    build: {
      options: {jshintrc: '.jshintrc'},
      src: ['Gruntfile.js', 'build/**/*.js'],
    },
    app: {
      options: {jshintrc: 'src/.jshintrc'},
      src: ['src/**/*.js'],
      ignores: ['src/modules/TOWNSSURVEY_POLYM.js'],
    },
    test: {
      options: {jshintrc: 'test/.jshintrc'},
      src: ['test/**/*.js'],
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

};
