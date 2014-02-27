module.exports = function(grunt) {

  grunt.config('clean', {
    prod: ['prod'],
  });

  grunt.loadNpmTasks('grunt-contrib-clean');

};
