module.exports = function(grunt) {

  grunt.config('buildGhPages', {
    prod: {
      options: {
        dist: 'prod'
      }
    },
  });

  grunt.loadNpmTasks('grunt-build-gh-pages');

};
