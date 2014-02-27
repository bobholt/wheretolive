define(function(require) {

  require('node_modules/sinon/pkg/sinon');

  var chai = require('node_modules/chai/chai');
  var sinonChai = require('node_modules/sinon-chai/lib/sinon-chai');

  chai.use(sinonChai);

  return chai.expect;

});