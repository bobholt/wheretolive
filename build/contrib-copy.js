module.exports = function(grunt) {

  grunt.config.set('copy', {
    prod: {
      expand: true,
      src: ['src/img/**/*','bower_components/Leaflet/dist/images/**/*'],
      dest: 'prod/img',
      filter: 'isFile',
      flatten: true
    },
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

};