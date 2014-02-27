module.exports = function(grunt) {

  grunt.config('watch', {
    livereload: {
      options: {
        livereload: true,
      },
      files: [
        'src/**/*.{js,html}',
        'prod/**/*',
        '<%= watch.tests.files %>',
      ],
      tasks: [],
    },
    jshintrc: {
      files: ['**/.jshintrc'],
      tasks: ['jshint'],
    },
    build: {
      files: ['<%= jshint.build.src %>'],
      tasks: ['jshint:build'],
    },
    scripts: {
      files: ['<%= jshint.app.src %>'],
      tasks: ['jshint:app', 'mocha'],
    },
    styles: {
      files: ['src/**/*.styl'],
      tasks: ['stylus:dev'],
    },
    pages: {
      files: ['src/pages/*.jade'],
      tasks: ['jade:dev'],
    },
    tests: {
      files: ['test/{specs,lib}/**/*', 'test/*.html'],
      tasks: ['jshint:test', 'mocha'],
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

};
