module.exports = function(grunt) {

  grunt.config('mocha', {
    all: [ 'test/*.html' ],
    options: {
      // Bail means if a test fails, grunt will abort. False by default.
      bail: true,

      // Pipe output console.log from your JS to grunt. False by default.
      log: true,

      // Select a Mocha reporter
      // http://visionmedia.github.com/mocha/#reporters
      reporter: "Spec"
    }
  });

  grunt.loadNpmTasks('grunt-mocha');

};
