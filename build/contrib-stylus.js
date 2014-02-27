module.exports = function(grunt) {

  grunt.config('stylus', {
    options: {
      'include css': true,
      'resolve url': true,
      paths: ['src/styles'],
      import: ['nib'],
    },
    dev: {
      options: {
        compress: false,
      },
      src: [
        'src/styles/app.styl'
      ],
      dest: 'prod/app.css',
    },
    prod: {
      src: '<%= stylus.dev.src %>',
      dest: '<%= stylus.dev.dest %>',
    },
  });

  grunt.loadNpmTasks('grunt-contrib-stylus');

};
