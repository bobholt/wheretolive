module.exports = function(grunt) {

  // Initialize config.
  grunt.initConfig({
    pkg: require('./package.json'),
  });

  // Load per-task config from separate files.
  grunt.loadTasks('build');

  // Register alias tasks.
  grunt.registerTask('build',
    'Build site files for testing or deployment.',
    ['jshint', 'mocha', 'clean', 'jade:prod', 'requirejs:prod', 'stylus:prod', 'copy:prod', 'buildGhPages:prod']);

  grunt.registerTask('dev',
    'Start a live-reloading dev webserver on localhost.',
    ['jshint', 'mocha', 'clean', 'jade:dev', 'stylus:dev', 'connect:dev', 'watch']);

  grunt.registerTask('prod',
    'Publish to prod and start a webserver on localhost.',
    ['build', 'connect:prod:keepalive']);

  grunt.registerTask('default', ['dev']);

};
