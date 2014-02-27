/*global mocha:true, navigator:true */


define(function(require) {

  return function(specs) {

    // Require in Mocha absolutely first
    require(['../../node_modules/grunt-mocha/node_modules/mocha/mocha'], function() {

      // Load our application's require config
      var deps = ['../../src/requirejs/config'];

      // If this is PhantomJS, take it to the bridge
      if (navigator.userAgent.indexOf('PhantomJS') >= 0) {
        deps.push('../../node_modules/grunt-mocha/phantomjs/bridge');
      }

      // Load our dependencies, setup and start mocha
      require(deps, function() {

        // Set up mocha after the bridge loads (if necessary)
        mocha.setup('bdd');

        // Load our tests
        require(specs, function() {

          // Kick off Mocha
          mocha.run();

        });

      });

    });

  };

});
